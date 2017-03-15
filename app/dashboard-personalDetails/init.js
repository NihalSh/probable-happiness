const passport = require('passport')

module.exports = (app) => {
	app.get('/dashboard/personalDetails', passport.authenticationMiddleware(), (req, res) => {
		res.render('dashboard-personalDetails/dashboard-personalDetails')
	})
}