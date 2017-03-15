module.exports = (app) => {
	app.get('/', passport.authenticationMiddleware(), (req, res) => {
		res.render('dashboard-academics/dashboard-academics')
	})
}