const Order = require('../model/order');
const User = require('../model/user');
const asyncHandler = require('express-async-handler');

const createOrder = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.user
        const userCart = await User.findById(_id).select('cart')
        return res.json({
            success: userCart ? true : false,
            createdOrder: userCart ? userCart : "Order not created"
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
    createOrder
}