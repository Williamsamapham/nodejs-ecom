const router = require('express').Router()
const ctrls = require('../controller/user')
const { verifiAccessToken } = require('../middlewares/verifyToken')

router.post('/register', ctrls.register)
router.post('/login', ctrls.login)
router.get('/current', verifiAccessToken, ctrls.getCurrent)
router.post('/refreshtoken', ctrls.refreshAccessToken)
router.get('/logout', ctrls.logout)
router.get('/forgotpassword', ctrls.forgotPassword)
router.put('/resetpassword', ctrls.resetPassword)

module.exports = router


// CRUD | Create - Read - Update - Delete | POST - GET - PUT - DELETE
//  Create (POST) + PUT - body (API gửi đi bị giấu đi ko hiển thị trên trình duyệt (Ko bị lộ))
//  Read (GET) + DELETE - query (API gửi đi sẽ bị lộ ra)