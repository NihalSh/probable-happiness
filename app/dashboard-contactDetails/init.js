const passport = require('passport')

const User = require('../user').model

module.exports = (app) => {
	app.get('/dashboard/contactDetails', passport.authenticationMiddleware(), (req, res) => {
		res.render('dashboard-contactDetails/dashboard-contactDetails',
			{
				name: req.user.name,
				pAddress: req.user.permanentAddress,
				cAddress: req.user.currentAddress,
				email: req.user.email,
				pEmail: req.user.personalEmail,
				parentsTel: req.user.parentsNumber,
				personalTel: req.user.personalNumber
			}
		)
	})
	app.post('/dashboard/contactDetails', passport.authenticationMiddleware(), (req, res) => {
		User.findOneAndUpdate({ email: req.user.email },
			{
				$set: {
					'currentAddress': req.body['cAddress'],
					'personalEmail': req.body['pEmail'],
					'parentsNumber': req.body['parentsTel'],
					'personalNumber': req.body['personalTel']
				}
			})
			.exec()
			.then(() => {
				res.redirect('/dashboard/contactDetails')
			})
			.catch((err) => {
				next(err)
			})
	})
}