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
				sgpa1: 5,
				sgpa2: 6,
				sgpa3: 7,
				sgpa4: 8,
				sgpa5: 9,
				cgpa: 10,
				historyArrears: false,
				standingArrears: 3
			}
		)
	})
	app.post('/dashboard/academics', passport.authenticationMiddleware(), (req, res) => {
		res.send(req.body)
	})
}