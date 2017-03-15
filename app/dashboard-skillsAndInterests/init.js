module.exports = (app) => {
	app.get('/dashboard/skillsAndInterests', passport.authenticationMiddleware(), (req, res) => {
		res.render('dashboard-skillsAndInterests/dashboard-skillsAndInterests')
	})
}