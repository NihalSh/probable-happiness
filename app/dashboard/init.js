const passport = require('passport')

module.exports = (app) => {
	app.get('/dashboard', passport.authenticationMiddleware(), (req, res) => {
		res.render('dashboard/dashboard',
			{
				name: 'Nihal Shriwastawa',
				registrationNumber: 'RA1411003010564',
				program: "B.Tech",
				department: "CSE",
				semester: "6"
			}
		)
	})
}