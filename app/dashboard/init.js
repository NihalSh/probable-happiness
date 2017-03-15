const passport = require('passport')

module.exports = (app) => {
	app.get('/dashboard', passport.authenticationMiddleware(), (req, res) => {
		res.render('dashboard/dashboard')
	})
}