const passport = require('passport')

module.exports = (app) => {
	app.get('/logout', passport.authenticationMiddleware(), (req, res) => {
		req.logout()
		res.render('home/home',
			{
				script: `
					notie.alert({ type: 'success', text: 'Logout successful', time: 6});
					history.replaceState(null, null, "/");

					`
			}
		)
	})
}