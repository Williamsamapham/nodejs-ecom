const { get } = require('mongoose');
const Coupon = require('../model/coupon');
const asyncHandler = require('express-async-handler');

const getCoupons = asyncHandler(async (req, res) => {
    try {
        const response = await Coupon.find().select('-createdAt -updatedAt')
        res.status(200).json({
            success: true,
            Coupon: response
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
})

const createCoupon = asyncHandler(async (req, res) => {
    try {
        const { name, discount, expiry } = req.body
        if (!name || !discount || !expiry) throw new Error('Missing Input')
        const newCoupon = await Coupon.create({
            ...req.body,
            expiry: Date.now() + +expiry * 24 * 60 * 60 * 1000
        })
        return res.json({
            success: newCoupon ? true : false,
            createdCoupon: newCoupon ? newCoupon : "Coupon not created"

        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
})

const updateCoupon = asyncHandler(async (req, res) => {
    try {
        const { couponId } = req.params;
        if (req.body.expiry) req.body.expiry = Date.now() + +req.body.expiry * 24 * 60 * 60 * 1000
        const response = await Coupon.findByIdAndUpdate(couponId, req.body, { new: true });
        res.status(200).json({
            success: true,
            updatedCoupon: response
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
})

const deleteCoupon = asyncHandler(async (req, res) => {
    try {
        const { couponId } = req.params
        const response = await Coupon.findByIdAndDelete(couponId)
        res.status(200).json({
            success: true,
            deletedCoupon: response
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
})

module.exports = {
    getCoupons,
    createCoupon,
    updateCoupon,
    deleteCoupon,

}