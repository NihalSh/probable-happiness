const mongoSanitize = require('express-mongo-sanitize')
const passport = require('passport')

const User = require('../user').model

module.exports = (app) => {
	app.get('/dashboard/personalDetails', passport.authenticationMiddleware(), getHandler)
	app.post('/dashboard/personalDetails', passport.authenticationMiddleware(), (req, res) => {
		mongoSanitize.sanitize(req.body, {
		  replaceWith: '_'
		})
		let boarding = null
		if (req.body.boarding === "true") {
			boarding = true
		} else if (req.body.boarding === "false") {
			boarding = false
		}
		User.findOneAndUpdate({ email: req.user.email },
			{
				$set: {
					'boarding': boarding,
					'height': req.body['height'],
					'weight': req.body['weight'],
					'motherName': req.body['mName']
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
	let date = null
	if (req.user.dateOfBirth) {
		date = req.user.dateOfBirth.toDateString()
	}
	res.render('dashboard-personalDetails/dashboard-personalDetails',
		{
			name: req.user.name,
			regno: req.user.registrationNumber,
			boarding: req.user.boarding,
			bloodGroup: req.user.bloodGroup,
			dob: date,
			gender: req.user.gender,
			height: req.user.height,
			weight: req.user.weight,
			fName: req.user.fatherName,
			mName: req.user.motherName,
			evarsity: req.user.evarsity,
			image: req.user.image,
			script: req.script
		}
	)
}