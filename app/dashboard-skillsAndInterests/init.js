const passport = require('passport')

module.exports = (app) => {
	app.get('/dashboard/skillsAndInterests', passport.authenticationMiddleware(), (req, res) => {
		res.render('dashboard-skillsAndInterests/dashboard-skillsAndInterests',
			{
				name: "John Doe",
				programmingLanguages: null,
				languages: null,
				cocurricular: null,
				extracurricular: null
			}
		)
	})
}