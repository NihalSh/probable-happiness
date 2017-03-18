const passport = require('passport')

const User = require('../user').model

module.exports = (app) => {
	app.get('/dashboard/skillsAndInterests', passport.authenticationMiddleware(), (req, res) => {
		let programmingLanguages = null
		let languages = null
		let cocurricular = null
		let extracurricular = null
		if (req.user.programmingLanguages) {
			programmingLanguages = req.user.programmingLanguages.join(', ')
		}
		if (req.user.languages) {
			languages = req.user.languages.join(', ')
		}
		if (req.user.cocurricular) {
			cocurricular = req.user.cocurricular.join(', ')
		}
		if (req.user.extracurricular) {
			extracurricular = req.user.extracurricular.join(', ')
		}
		res.render('dashboard-skillsAndInterests/dashboard-skillsAndInterests',
			{
				name: req.user.name,
				programmingLanguages: programmingLanguages,
				languages: languages,
				cocurricular: cocurricular,
				extracurricular: extracurricular,
				evarsity: req.user.evarsity
			}
		)
	})
	app.post('/dashboard/skillsAndInterests', passport.authenticationMiddleware(), (req, res) => {
		let programmingLanguages = req.body.programmingLanguages.split(',').map(Function.prototype.call, String.prototype.trim)
		let languages = req.body.languages.split(',').map(Function.prototype.call, String.prototype.trim)
		let cocurricular = req.body.cocurricular.split(',').map(Function.prototype.call, String.prototype.trim)
		let extracurricular = req.body.extracurricular.split(',').map(Function.prototype.call, String.prototype.trim)
		User.findOneAndUpdate({ email: req.user.email },
			{
				$set: {
					'programmingLanguages': programmingLanguages,
					'languages': languages,
					'cocurricular': cocurricular,
					'extracurricular': extracurricular
				}
			})
			.exec()
			.then(() => {
				res.redirect('/dashboard/skillsAndInterests')
			})
			.catch((err) => {
				next(err)
			})
	})
}