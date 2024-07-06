const router = require('express').Router()
const ctrls = require('../controller/product')
const { verifiAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/create', [verifiAccessToken, isAdmin], ctrls.createProduct)
router.get('/', ctrls.getProducts)

router.delete('/delete/:productId', [verifiAccessToken, isAdmin], ctrls.deleteProduct)
router.put('/update/:productId', [verifiAccessToken, isAdmin], ctrls.updateProduct)
router.get('/detail/:productId', [verifiAccessToken, isAdmin], ctrls.getProduct)
router.put('/ratings', [verifiAccessToken], ctrls.ratings)
module.exports = router
