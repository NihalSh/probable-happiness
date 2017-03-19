const passport = require('passport')

module.exports = (app) => {
	app.get('/dashboard', passport.authenticationMiddleware(), (req, res) => {
		res.render('dashboard/dashboard',
			{
				name: req.user.name,
				registrationNumber: req.user.registrationNumber,
				program: req.user.program,
				department: req.user.department,
				semester: req.user.semester,
				evarsity: req.user.evarsity,
				image: req.user.image
			}
		)
	})
}