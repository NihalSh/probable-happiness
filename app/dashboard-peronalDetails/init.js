const passport = require('passport')

module.exports = (app) => {
	app.get('/dashboard/peronalDetails', passport.authenticationMiddleware(), (req, res) => {
		res.render('dashboard-peronalDetails/dashboard-peronalDetails')
	})
}