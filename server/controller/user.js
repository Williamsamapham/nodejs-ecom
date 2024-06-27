const User = require('../model/user');
const asyncHandler = require('express-async-handler');

const register = asyncHandler(async (req, res) => {
    const { email, password, firstname, lastname } = req.body;
    if (!email || !password || !firstname || !lastname) {
        return res.status(400).json({
            success: false,
            message: 'Missing inputs'
        });
    }

    const response = await User.create(req.body);
    return res.status(200).json({
        success: response ? true : false,
        message: 'User created successfully',
        response
    });
});

module.exports = {
    register
};
