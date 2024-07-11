const User = require('../model/user');
const asyncHandler = require('express-async-handler');
const { generateAccessToken, generateRefeshToken } = require('../middlewares/jwt');
const jwt = require('jsonwebtoken')
const { JsonWebTokenError } = require('jsonwebtoken');
const sendMail = require('../ultils/sendMail')
const crypto = require("crypto");

const register = asyncHandler(async (req, res) => {
    const { email, password, firstname, lastname, mobile } = req.body;
    if (!email || !password || !firstname || !lastname || !mobile) {
        return res.status(400).json({
            success: false,
            message: 'Missing inputs'
        });
    }
    const user = await User.findOne({ email })
    if (user) throw new Error('Người dùng này đã tồn tại')
    else {
        const newUser = await User.create(req.body)
        return res.status(200).json({
            success: newUser ? true : false,
            message: newUser ? 'Đăng ký thành công, Vui lòng đăng nhập' : 'Đăng ký thất bại',
            newUser
        })
    }

})

// Refesh token => Cấp mới access token
// Access token => Xác thực người dùng, phân quyền người dùng

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Missing inputs'
        });
    }
    const response = await User.findOne({ email });
    if (response && await response.isCorrectPassword(password)) {
        const { password, role, refreshToken, ...userData } = response.toObject()
        //Tạo Asccess Token
        const accessToken = generateAccessToken(response._id, role);
        //Tạo Refresh Token
        const newRefreshToken = generateRefeshToken(response._id)
        // Lưu refresh token vào database
        await User.findByIdAndUpdate(response._id, { refreshToken: newRefreshToken }, { new: true })
        // Lưu refresh token vào cookie
        res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 })
        return res.status(200).json({
            success: true,
            accessToken,
            userData
        });
    } else {
        throw new Error('Vui lòng xem lại Mật khẩu');
    }
});

const getCurrent = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const user = await User.findById(_id).select('-refreshToken -password -role')
    return res.status(200).json({
        success: user ? true : false,
        rs: user ? user : 'Không tìm thấy người dùng'
    });
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    // Lấy token từ cookie 
    const cookie = req.cookies
    // const { _id } =
    // Check xem có token trong cookie hay không
    if (!cookie || !cookie.refreshToken) throw new Error('No refresh token in cookie')
    // Check token có hợp lệ hay không
    const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET)
    const response = await User.findOne({ _id: rs._id, refreshToken: cookie.refreshToken })
    return res.status(200).json({
        success: response ? true : false,
        newAccessToken: response ? generateAccessToken(response._id, response.role) : 'refresh token not matched'
    })
})

const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies
    if (!cookie || !cookie.refreshToken) throw new Error('No refresh token in cookies')
    // Xóa refresh Token ở db
    await User.findOneAndUpdate({ refreshToken: cookie.refreshToken }, { refreshToken: '' }, { new: true })
    // Xóa refresh Token ở cookie trình duyệt
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true
    })
    return res.status(200).json({
        success: true,
        message: 'Đăng xuất thành công'
    })
})
// Client gửi email
// Server check mail có hợp lệ hay ko => Gửi email + Link (password change token)
// User check mail -> Click link
// User gửi api kèm token
// Server check token có hợp lệ hay ko
// Server đổi mật khẩu

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body
    if (!email) throw new Error('Missing email')
    const user = await User.findOne({ email })
    if (!user) throw new Error('User not found')
    const resetToken = user.createPasswordChangedToken()
    await user.save()

    const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn.Link này sẽ hết hạn sau 15 phút kể từ bây giờ. <a href=${process.env.URL_SERVER}/api/user/reset-password/${resetToken}>Click here</a>`

    const data = {
        email,
        html
    }

    const rs = await sendMail(data)
    return res.status(200).json({
        success: true,
        rs
    })
})

const resetPassword = asyncHandler(async (req, res) => {
    const { token, password } = req.body;

    const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({ passwordResetToken, passwordResetExpires: { $gt: Date.now() } });
    if (!user) throw new Error('Invalid Reset Token');

    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordChangedAt = Date.now();
    user.passwordResetExpires = undefined;
    await user.save();

    return res.status(200).json({
        success: true,
        message: 'Password updated successfully',
        user
    });
});

const getUsers = asyncHandler(async (req, res) => {
    const response = await User.find().select('-refreshToken -password -role')
    return res.status(200).json({
        success: response ? true : false,
        users: response
    });
});
const deleteUser = asyncHandler(async (req, res) => {
    const { _id } = req.query
    if (!_id) throw new Error('Missing id')
    const response = await User.findByIdAndDelete(_id)
    return res.status(200).json({
        success: response ? true : false,
        deletedUser: response ? `User with email ${response.email} Deleted` : 'Not found'

    });
});
const updateUserProfile = asyncHandler(async (req, res) => {
    const { _id } = req.user
    if (!_id || Object.keys(req.body).length === 0) throw new Error('Missing input')
    const response = await User.findByIdAndUpdate(_id, req.body, { new: true }).select('-password -role')
    return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response : 'Someting Wrong'

    });
});
const updateUserByAdmin = asyncHandler(async (req, res) => {
    try {
        const { uid } = req.params;
        const updateData = req.body;

        // Check if the request body is empty
        if (!uid || Object.keys(updateData).length === 0) {
            return res.status(400).json({ success: false, message: 'Missing input' });
        }

        // Update the user and exclude the password and role from the response
        const response = await User.findByIdAndUpdate(uid, updateData, { new: true }).select('-password -role -refreshToken');

        if (!response) {
            return res.status(404).json({ success: false, message: 'User not found or update failed' });
        }

        // Return the updated user
        return res.status(200).json({
            success: true,
            updatedUser: response,
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ success: false, message: 'Something went wrong', error: error.message });
    }
});
const updateAddressUser = asyncHandler(async (req, res) => {
    const { _id } = req.user
    if (!req.body.address) throw new Error('Missing input')
    const response = await User.findByIdAndUpdate(_id, { $push: { address: req.body.address } }, { new: true }).select('-password -role -refreshToken');
    return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response : 'Something Went Wrong',
    });
})
const addToCart = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { pid, quantity, color } = req.body
    if (!pid || !quantity || !color) throw new Error('Missing input')
    const user = await User.findById(_id).select('cart')
    const alreadyProduct = user?.cart?.find(el => el.product.toString() === pid)
    if (alreadyProduct) {
        if (alreadyProduct.color === color) {
            const response = await User.updateOne({ cart: { $elemMatch: alreadyProduct } }, { $set: { "cart.$.quantity": quantity } }, { new: true })
            return res.status(200).json({
                success: response ? true : false,
                updatedUser: response ? response : 'Something Went Wrong',
            });
        } else {
            const response = await User.findByIdAndUpdate(_id, { $push: { cart: { product: pid, quantity, color } } }, { new: true })
            return res.status(200).json({
                success: response ? true : false,
                updatedUser: response ? response : 'Something Went Wrong',
            });
        }

    } else {
        const response = await User.findByIdAndUpdate(_id, { $push: { cart: { product: pid, quantity, color } } }, { new: true })
        return res.status(200).json({
            success: response ? true : false,
            updatedUser: response ? response : 'Something Went Wrong',
        });
    }

})
module.exports = {
    register,
    login,
    getCurrent,
    refreshAccessToken,
    logout,
    forgotPassword,
    resetPassword,
    getUsers,
    deleteUser,
    updateUserProfile,
    updateUserByAdmin,
    updateAddressUser,
    addToCart
};
