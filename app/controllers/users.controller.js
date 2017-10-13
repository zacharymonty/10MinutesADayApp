const passport = require('passport')
const responses = require('../models/responses')

module.exports = {
    register,
    login
}

function register(req, res, next) {
    // put inside user.service
    passport.authenticate('local-signup', registerDone)(req, res, next)

    function registerDone(err, user, info) {
        if (err) return next(err)

        // Generate a JSON response reflecting authentication status
        if (!user) {
            const errorResponseModel = new responses.ErrorResponse(`registration failed: ${info.reason}`)
            errorResponseModel.alert.message = `registration failed: ${info.reason}`

            return res.json(errorResponseModel)
        }

        // ***********************************************************************
        // "Note that when using a custom callback, it becomes the application's
        // responsibility to establish a session (by calling req.login()) and send
        // a response."
        // Source: http://passportjs.org/docs
        // ***********************************************************************
        req.login(user, loginErr => {
            if (loginErr) return next(loginErr)

            const responseModel = new responses.SuccessResponse()
            responseModel.alert.message = 'Registration succeeded'
            return res.json(responseModel)
        })
    }
}

function login(req, res, next) {
    passport.authenticate('local-login', loginDone)(req, res, next)

    function loginDone(err, user, info) {
        if (err) return next(err)

        // Generate a JSON response reflecting authentication status
        if (!user) {
            const errorMessage = `Authentication failed: ${info.reason}`
            const errorResponseModel = new responses.ErrorResponse(errorMessage)
            errorResponseModel.alert.message = errorMessage

            return res.json(errorResponseModel)
        }

        // ***********************************************************************
        // "Note that when using a custom callback, it becomes the application's
        // responsibility to establish a session (by calling req.login()) and send
        // a response."
        // Source: http://passportjs.org/docs
        // ***********************************************************************
        req.login(user, loginErr => {
            if (loginErr) return next(loginErr)

            const responseModel = new responses.SuccessResponse()
            responseModel.alert.message = 'Authentication succeeded'
            return res.json(responseModel)
        })
    }
}
