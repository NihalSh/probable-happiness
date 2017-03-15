module.exports = (app) => {
	app.get('/', passport.authenticationMiddleware(), (req, res) => {
		res.render('dashboard-contactDetails/dashboard-contactDetails')
	})
}