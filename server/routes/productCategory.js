const router = require('express').Router()
const ctrls = require('../controller/productCategory')
const { verifiAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/create', [verifiAccessToken, isAdmin], ctrls.createProductCategory)
router.get('/', [verifiAccessToken, isAdmin], ctrls.getProductCategories)

router.delete('/delete/:pcid', [verifiAccessToken, isAdmin], ctrls.deleteProductCategory)
router.put('/update/:pcid', [verifiAccessToken, isAdmin], ctrls.updateProductCategory)
module.exports = router
