const passport = require('passport')

module.exports = (app) => {
	app.get('/dashboard/contactDetails', passport.authenticationMiddleware(), (req, res) => {
		res.render('dashboard-contactDetails/dashboard-contactDetails',
			{
				name: "John Doe",
				pAddress: "My parents live here",
				cAddress: null,
				email: 'a@b.c',
				pEmail: null,
				parentsTel: '987654321',
				personalTel: '123456789'
			}
		)
	})
	app.post('/dashboard/contactDetails', passport.authenticationMiddleware(), (req, res) => {
		res.send(req.body)
	})
}