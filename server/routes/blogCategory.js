const router = require('express').Router()
const ctrls = require('../controller/blogCategory')
const { verifiAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/create', [verifiAccessToken, isAdmin], ctrls.createBlogCategory)
router.get('/', [verifiAccessToken, isAdmin], ctrls.getBlogCategories)

router.delete('/delete/:bcid', [verifiAccessToken, isAdmin], ctrls.deleteBlogCategory)
router.put('/update/:bcid', [verifiAccessToken, isAdmin], ctrls.updateBlogCategory)
module.exports = router
