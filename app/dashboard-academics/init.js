const passport = require('passport')

module.exports = (app) => {
	app.get('/dashboard/academics', passport.authenticationMiddleware(), (req, res) => {
		res.render('dashboard-academics/dashboard-academics',
			{
				name: "John Doe",
				'10pc': 80,
				'10board': 'CBSE',
				'12pc': 90,
				'12board': 'ICSE',
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