const mongoSanitize = require('express-mongo-sanitize')
const passport = require('passport')

const User = require('../user').model

module.exports = (app) => {
	app.get('/dashboard/skillsAndInterests', passport.authenticationMiddleware(), getHandler)
	app.post('/dashboard/skillsAndInterests', passport.authenticationMiddleware(), (req, res) => {
		mongoSanitize.sanitize(req.body, {
		  replaceWith: '_'
		})
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
			evarsity: req.user.evarsity,
			image: req.user.image,
			script: req.script
		}
	)
}