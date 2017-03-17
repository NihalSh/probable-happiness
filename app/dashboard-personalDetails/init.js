const passport = require('passport')

module.exports = (app) => {
	app.get('/dashboard/personalDetails', passport.authenticationMiddleware(), (req, res) => {
		res.render('dashboard-personalDetails/dashboard-personalDetails',
			{
				name: "John Doe",
				regno: 'RA0123456789123',
				boarding: false,
				bloodGroup: 'A+',
				dob: '18-Mar-1990',
				gender: 'Male',
				height: '160',
				weight: '100',
				fName: 'father',
				mName: 'mother'
			}
		)
	})
}