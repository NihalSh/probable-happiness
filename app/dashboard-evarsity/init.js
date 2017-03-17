const passport = require('passport')

module.exports = (app) => {
	app.get('/dashboard/evarsity', passport.authenticationMiddleware(), (req, res) => {
		res.render('dashboard-evarsity/evarsity',
			{
				regno: req.user.registrationNumber
			}
		)
	})
	app.post('/dashboard/evarsity', passport.authenticationMiddleware(), (req, res) => {
		res.send(req.body)
	})
}