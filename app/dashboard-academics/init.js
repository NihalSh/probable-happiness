module.exports = (app) => {
	app.get('/dashboard/academics', passport.authenticationMiddleware(), (req, res) => {
		res.render('dashboard-academics/dashboard-academics')
	})
}