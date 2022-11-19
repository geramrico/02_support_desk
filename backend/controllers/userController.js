const asyncHandler = require('../utils/asyncHandler')
const bcrypt = require('bcrypt')
const ExpressError = require('../utils/ExpressError')
const jwt = require('jsonwebtoken')

const User = require('../models/userModel')

//@desc    Register a new user
//@route    /api/users
//@access   Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    // Check for missing fields
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('A field is missing')
    }

    //Find if user exists
    const userExists = await User.findOne({ email })
    if (userExists) {
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create User
    const user = await User.create({ name, email, password: hashedPassword })
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

//@desc    Login a new user
//@route    /api/users/login
//@access   Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    // Check user exists & password matches hash
    if (user && await bcrypt.compare(password, user.password)) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        throw new ExpressError(401, 'A001', 'Invalid Credentials')
    }

})


//@desc     Get user info
//@route    /api/users/me
//@access   Private
const getMe = asyncHandler(async (req, res) => {
    const user =
    {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
    }
    res.status(200).json(user)

})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: 1800
    })
}


module.exports = {
    registerUser,
    loginUser,
    getMe
}