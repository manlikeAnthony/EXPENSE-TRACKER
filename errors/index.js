const CustomAPIError = require('./custom-error')
const BadRequest = require('./bad-request')
const NotFoundError = require('./not-found-err')
const UnauthenticatedError = require('./unauthenticated-error')

module.exports = {
    CustomAPIError,
    BadRequest,
    NotFoundError,
    UnauthenticatedError
}