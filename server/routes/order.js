const router = require('express').Router()
const ctrls = require('../controller/order')
const { verifiAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/', verifiAccessToken, ctrls.createOrder)
router.put('/status/:orderId', [verifiAccessToken, isAdmin], ctrls.updateStatus)
router.get('/', verifiAccessToken, ctrls.getOrderUser)
router.get('/admin', verifiAccessToken, isAdmin, ctrls.getOrders)
// router.delete('/delete/:blogId', [verifiAccessToken, isAdmin], ctrls.deleteBlog)
// router.put('/update/:blogId', [verifiAccessToken, isAdmin], ctrls.updateBlog)
// router.put('/upload/:blogId', [verifiAccessToken, isAdmin], ctrls.uploadImageBlog)
// router.get('/detail/:blogId', [verifiAccessToken, isAdmin], ctrls.getBlog)

module.exports = router
