const passport = require('passport')

module.exports = (app) => {
	app.get('/dashboard/contactDetails', passport.authenticationMiddleware(), (req, res) => {
		res.render('dashboard-contactDetails/dashboard-contactDetails',
			{
				name: req.user.name,
				pAddress: req.user.permanentAddress,
				cAddress: req.user.currentAddress,
				email: req.user.email,
				pEmail: req.user.personalEmail,
				parentsTel: req.user.parentsNumber,
				personalTel: req.user.personalNumber
			}
		)
	})
	app.post('/dashboard/contactDetails', passport.authenticationMiddleware(), (req, res) => {
		res.send(req.body)
	})
}