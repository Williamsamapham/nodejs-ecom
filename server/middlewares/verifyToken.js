const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const verifiAccessToken = asyncHandler(async (req, res, next) => {
    if (req?.headers?.authorization?.startsWith('Bearer')) {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    mes: 'Access token không hợp lệ'
                });
            }
            req.user = decode;
            next();
        });
    } else {
        return res.status(401).json({
            success: false,
            mes: 'Không tìm thấy access token'
        });
    }
});
module.exports = {
    verifiAccessToken
}