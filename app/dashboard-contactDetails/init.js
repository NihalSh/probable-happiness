const mongoSanitize = require('express-mongo-sanitize')
const passport = require('passport')

const User = require('../user').model

module.exports = (app) => {
	app.get('/dashboard/contactDetails', passport.authenticationMiddleware(), getHandler)
	app.post('/dashboard/contactDetails', passport.authenticationMiddleware(), (req, res) => {
		mongoSanitize.sanitize(req.body, {
		  replaceWith: '_'
		})
		User.findOneAndUpdate({ email: req.user.email },
			{
				$set: {
					'currentAddress': req.body['cAddress'],
					'personalEmail': req.body['pEmail'],
					'parentsNumber': req.body['parentsTel'],
					'personalNumber': req.body['personalTel']
				}
			},
			{
				new: true
			}
			)
			.exec()
			.then((doc) => {
				req.user = doc
				req.script = `notie.alert({ type: 'success', text: 'Response recorded', time: 3});`
				getHandler(req, res)
			})
			.catch((err) => {
				req.log.error(err)
				req.script = `notie.alert({ type: 'error', text: 'Check the data and try again', time: 3});`
				getHandler(req, res)
			})
	})
}

function getHandler(req, res) {
	res.render('dashboard-contactDetails/dashboard-contactDetails',
		{
			name: req.user.name,
			pAddress: req.user.permanentAddress,
			cAddress: req.user.currentAddress,
			email: req.user.email,
			pEmail: req.user.personalEmail,
			parentsTel: req.user.parentsNumber,
			personalTel: req.user.personalNumber,
			evarsity: req.user.evarsity,
			image: req.user.image,
			script: req.script
		}
	)
}