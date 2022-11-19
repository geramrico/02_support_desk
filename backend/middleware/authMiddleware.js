const asyncHandler = require('../utils/asyncHandler')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const ExpressError = require('../utils/ExpressError')

const protect = asyncHandler(async (req, res, next) => {
    let token
    const headers = req.headers.authorization

    if (headers && headers.startsWith('Bearer')) {
        try {
            // Get token from header
            token = headers.split(' ')[1]

            //Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //Get user from token
            req.user = await User.findById(decoded.id).select('-password')
            next()

        } catch (error) {
            throw new ExpressError(401, 'A000', 'Unauthorized')
        }
    }
    if (!token) {
        throw new ExpressError(401, 'A000', 'Unauthorized')
    }
})

module.exports = protect