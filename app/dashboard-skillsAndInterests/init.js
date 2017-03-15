module.exports = (app) => {
	app.get('/', passport.authenticationMiddleware(), (req, res) => {
		res.render('dashboard-skillsAndInterests/dashboard-skillsAndInterests')
	})
}