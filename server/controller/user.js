const User = require('../model/user');
const asyncHandler = require('express-async-handler');

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
            message: newUser ?  'Đăng ký thành công, Vui lòng đăng nhập' : 'Đăng ký thất bại'
        })
    }

})

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
        const {password, role, ...userData} = response.toObject()
        return res.status(200).json({
            success: true,
            userData
        });
    } else {
        throw new Error('Vui lòng xem lại Mật khẩu');
    }
});

module.exports = {
    register,
    login
};
