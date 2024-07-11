const Order = require('../model/order');
const User = require('../model/user');
const Coupon = require('../model/coupon');
const asyncHandler = require('express-async-handler');

const createOrder = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.user
        const { coupon } = req.body
        const userCart = await User.findById(_id).select('cart').populate('cart.product', 'title price')
        const products = userCart?.cart?.map(el => ({
            product: el.product._id,
            quantity: el.quantity,
            color: el.color
        }))
        let total = userCart?.cart?.reduce((sum, el) => el.product.price * el.quantity + sum, 0)
        const createData = { products, total, orderBy: _id }
        if (coupon) {
            const selectedCoupon = await Coupon.findById(coupon)
            total = Math.round(total * (1 - +selectedCoupon?.discount / 100) / 1000) * 1000 || total
            createData.total = total
            createData.coupon = coupon
        }

        const rs = await Order.create(createData)
        return res.json({
            success: rs ? true : false,
            rs: rs ? rs : "Something went wrong"
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
})
const updateStatus = asyncHandler(async (req, res) => {
    try {
        const { orderId } = req.params
        const { status } = req.body
        if (!status) throw new Error('Missing Status')
        const response = await Order.findByIdAndUpdate(orderId, { status }, { new: true })
        return res.json({
            success: response ? true : false,
            response: response ? response : "Something went wrong"
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
})
const getOrderUser = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.user
        const response = await Order.find({ orderBy: _id })
        return res.json({
            success: response ? true : false,
            response: response ? response : "Something went wrong"
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
})
const getOrders = asyncHandler(async (req, res) => {
    try {
        const response = await Order.find()
        return res.json({
            success: response ? true : false,
            response: response ? response : "Something went wrong"
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
})
module.exports = {
    createOrder,
    updateStatus,
    getOrderUser,
    getOrders
}