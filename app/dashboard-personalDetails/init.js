const passport = require('passport')

module.exports = (app) => {
	app.get('/dashboard/personalDetails', passport.authenticationMiddleware(), (req, res) => {
		let date = null
		if (req.user.dateOfBirth) {
			date = req.user.dateOfBirth.toDateString()
		}
		res.render('dashboard-personalDetails/dashboard-personalDetails',
			{
				name: req.user.name,
				regno: req.user.registrationNumber,
				boarding: req.user.boarding,
				bloodGroup: req.user.bloodGroup,
				dob: date,
				gender: req.user.gender,
				height: req.user.height,
				weight: req.user.weight,
				fName: req.user.fatherName,
				mName: req.user.motherName
			}
		)
	})
	app.post('/dashboard/personalDetails', passport.authenticationMiddleware(), (req, res) => {
		res.send(req.body)
	})
}