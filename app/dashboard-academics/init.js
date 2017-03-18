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
				standingArrears: null
			}
		)
	})
	app.post('/dashboard/academics', passport.authenticationMiddleware(), (req, res) => {
		res.send(req.body)
	})
}