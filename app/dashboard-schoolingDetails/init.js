module.exports = (app) => {
	app.get('/', passport.authenticationMiddleware(), (req, res) => {
		res.render('dashboard-schoolingDetails/dashboard-schoolingDetails')
	})
}