const passport = require('passport')

module.exports = (app) => {
	app.get('/dashboard/contactus', passport.authenticationMiddleware(), (req, res) => {
		res.render("dashboard-contact-us/dashboard-contact-us", 
			{
				name: req.user.name,
				evarsity: req.user.evarsity,
				image: req.user.image
			}
		)
	})
}