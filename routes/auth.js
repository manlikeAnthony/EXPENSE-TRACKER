const express = require('express');
const router = express.Router()
const jwt = require('jsonwebtoken')

const {
    register, 
    login
} = require('../controllers/user');
const { METHOD_FAILURE } = require('http-status-codes');

router.post('/register' , register)
router.post('/login' , login)

module.exports = router