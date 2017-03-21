const mongoSanitize = require('express-mongo-sanitize')
const passport = require('passport')

const User = require('../user').model

module.exports = (app) => {
	app.get('/dashboard/academics', passport.authenticationMiddleware(), getHandler)
	app.post('/dashboard/academics', passport.authenticationMiddleware(), (req, res) => {
		mongoSanitize.sanitize(req.body, {
		  replaceWith: '_'
		})
		User.findOneAndUpdate({ email: req.user.email },
			{
				$set: {
					'10pc': req.body['10pc'],
					'10board': req.body['10board'],
					'12pc': req.body['12pc'],
					'12board': req.body['12board']
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
	res.render('dashboard-academics/dashboard-academics',
		{
			name: req.user.name,
			'10pc': req.user["10pc"],
			'10board': req.user["10board"],
			'12pc': req.user["12pc"],
			'12board': req.user["12board"],
			sgpa1: req.user.sgpa1,
			sgpa2: req.user.sgpa2,
			sgpa3: req.user.sgpa3,
			sgpa4: req.user.sgpa4,
			sgpa5: req.user.sgpa5,
			cgpa: req.user.cgpa,
			historyArrears: req.user.historyArrears,
			standingArrears: req.user.standingArrears,
			evarsity: req.user.evarsity,
			image: req.user.image,
			script: req.script
		}
	)
}