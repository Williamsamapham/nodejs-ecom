const router = require('express').Router()
const ctrls = require('../controller/blog')
const { verifiAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/create', [verifiAccessToken, isAdmin], ctrls.createBlog)
router.get('/', ctrls.getBlogs)
router.delete('/delete/:blogId', [verifiAccessToken, isAdmin], ctrls.deleteBlog)
router.put('/update/:blogId', [verifiAccessToken, isAdmin], ctrls.updateBlog)
router.get('/detail/:blogId', [verifiAccessToken, isAdmin], ctrls.getBlog)

module.exports = router
