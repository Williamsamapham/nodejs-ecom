const router = require('express').Router()
const ctrls = require('../controller/coupon')
const { verifiAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/create', [verifiAccessToken, isAdmin], ctrls.createCoupon)
router.get('/', ctrls.getCoupons)
router.delete('/delete/:couponId', [verifiAccessToken, isAdmin], ctrls.deleteCoupon)
router.put('/update/:couponId', [verifiAccessToken, isAdmin], ctrls.updateCoupon)
// router.get('/detail/:blogId', [verifiAccessToken, isAdmin], ctrls.getBlog)

module.exports = router
