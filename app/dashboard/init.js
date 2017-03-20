const passport = require('passport')

const handler = require('./handler')

module.exports = (app) => {
	app.get('/dashboard', passport.authenticationMiddleware(), handler)
}