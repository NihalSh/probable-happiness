module.exports = (app) => {
	app.get('/dashboard/contactDetails', passport.authenticationMiddleware(), (req, res) => {
		res.render('dashboard-contactDetails/dashboard-contactDetails')
	})
}