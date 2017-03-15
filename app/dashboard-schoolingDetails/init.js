const passport = require('passport')

module.exports = (app) => {
	app.get('/dashboard/schoolingDetails', passport.authenticationMiddleware(), (req, res) => {
		res.render('dashboard-schoolingDetails/dashboard-schoolingDetails')
	})
}