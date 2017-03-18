const passport = require('passport')

const User = require('../user').model

module.exports = (app) => {
	app.get('/dashboard/academics', passport.authenticationMiddleware(), (req, res) => {
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
				historyArrears: null,
				standingArrears: null,
				evarsity: req.user.evarsity
			}
		)
	})
	app.post('/dashboard/academics', passport.authenticationMiddleware(), (req, res) => {
		User.findOneAndUpdate({ email: req.user.email },
			{
				$set: {
					'10pc': req.body['10pc'],
					'10board': req.body['10board'],
					'12pc': req.body['12pc'],
					'12board': req.body['12board']
				}
			})
			.exec()
			.then(() => {
				res.redirect('/dashboard/academics')
			})
			.catch((err) => {
				next(err)
			})
	})
}