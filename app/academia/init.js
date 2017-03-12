const passport = require('passport')

module.exports = (app) => {
	app.get('/academia', passport.authenticationMiddleware(), (req, res) => {
		res.send('authenticated user #TODO')
	})
	app.post('/academia', passport.authenticationMiddleware(), (req, res) => {
		res.send('authenticated user #TODO')
	})
}