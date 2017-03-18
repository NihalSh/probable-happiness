const passport = require('passport')

module.exports = (app) => {
	app.get('/dashboard/personalDetails', passport.authenticationMiddleware(), (req, res) => {
		res.render('dashboard-personalDetails/dashboard-personalDetails',
			{
				name: req.user.name,
				regno: req.user.registrationNumber,
				boarding: req.user.boarding,
				bloodGroup: 'A+',
				dob: '18-Mar-1990',
				gender: 'Male',
				height: req.user.height,
				weight: req.user.weight,
				fName: 'father',
				mName: req.user.motherName
			}
		)
	})
	app.post('/dashboard/personalDetails', passport.authenticationMiddleware(), (req, res) => {
		res.send(req.body)
	})
}