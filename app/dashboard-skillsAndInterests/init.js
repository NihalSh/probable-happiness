const passport = require('passport')

module.exports = (app) => {
	app.get('/dashboard/skillsAndInterests', passport.authenticationMiddleware(), (req, res) => {
		res.render('dashboard-skillsAndInterests/dashboard-skillsAndInterests',
			{
				name: req.user.name,
				programmingLanguages: req.user.programmingLanguages,
				languages: req.user.languages,
				cocurricular: req.user.cocurricular,
				extracurricular: req.user.extracurricular
			}
		)
	})
	app.post('/dashboard/skillsAndInterests', passport.authenticationMiddleware(), (req, res) => {
		res.send(req.body)
	})
}