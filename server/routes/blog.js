const router = require('express').Router()
const ctrls = require('../controller/blog')
const { verifiAccessToken, isAdmin } = require('../middlewares/verifyToken')
const uploader = require('../config/cloudinary.config')

router.post('/create', [verifiAccessToken, isAdmin], ctrls.createBlog)
router.get('/', ctrls.getBlogs)
router.delete('/delete/:blogId', [verifiAccessToken, isAdmin], ctrls.deleteBlog)
router.put('/update/:blogId', [verifiAccessToken, isAdmin], ctrls.updateBlog)
router.put('/upload/:blogId', [verifiAccessToken, isAdmin], uploader.single('image'), ctrls.uploadImageBlog)
router.get('/detail/:blogId', [verifiAccessToken, isAdmin], ctrls.getBlog)

module.exports = router
