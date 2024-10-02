const { StatusCodes } = require('http-status-codes');
const { UnauthenticatedError, BadRequest } = require('../errors')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    const user = await User.create({ ...req.body })
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequest('Provide email and password')
    }
    const user = await User.findOne({ email });
    if (!user) {
        throw new UnauthenticatedError('invalid credentials')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid credentials')
    }
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({ name: { name: user.name }, token })
}

module.exports = {
    register,
    login
}