"use strict"
const passport = require('passport')
const request = require('request-promise-native')

const config = require('../../config')
const User = require('../user').model

module.exports = (app) => {
	app.get('/dashboard/evarsity', passport.authenticationMiddleware(), (req, res, next) => {
		if (req.user.evarsity === null) {
			let option = {
				uri: `${config.evarsity.url}`,
				json: true
			}
			let captcha = null
			request(option)
				.then((response) => {
					captcha = response[0]
					return User.findOneAndUpdate({ email: req.user.email }, {$set: { evarsitySession: `${response[1]}`}}).exec()
				})
				.then(() => {
					res.render('dashboard-evarsity/evarsity',
						{
							regno: req.user.registrationNumber,
							captcha: captcha,
							evarsity: req.user.evarsity
						}
					)
				})
				.catch((err) => {
					req.log.error(err)
					res.sendStatus(401)
				})
		} else {
			next()
		}
	})
	app.post('/dashboard/evarsity', passport.authenticationMiddleware(), (req, res) => {
		if (req.user.evarsity === null) {
			let basicAuth = new Buffer(`${req.user.registrationNumber}:${req.body.password}`).toString('base64')
			let option = {
				uri: `${config.evarsity.url}/login/${req.user.evarsitySession}/${req.body.captcha}`,
				headers: {
					Authorization: `Basic ${basicAuth}`
				}
			}
			let profile = null
			let grades = null
			request(option)
				.then((response) => {
					let option = {
						uri: `${config.evarsity.url}/profile/${req.user.evarsitySession}`
					}
					return request(option)
				})
				.then((response) => {
					profile = JSON.parse(response)
					let option = {
						uri: `${config.evarsity.url}/grades/${req.user.evarsitySession}`
					}
					return request(option)
				})
				.then((response) => {
					grades = JSON.parse(response)
					return User.findOneAndUpdate({ email: req.user.email },
						{
							$set: {
								evarsity: true,
								sgpa1: grades.sgpa1,
								sgpa2: grades.sgpa2,
								sgpa3: grades.sgpa3,
								sgpa4: grades.sgpa4,
								sgpa5: grades.sgpa5,
								cgpa: grades.cgpa,
								sem1: grades.sem1,
								sem2: grades.sem2,
								sem3: grades.sem3,
								sem4: grades.sem4,
								sem5: grades.sem5,
								historyArrears: grades.historyArrears,
								standingArrears: grades.standingArrears,
								bloodGroup: profile["Blood Group"],
								gender: profile["Sex"],
								dateOfBirth: new Date(profile["Date of Birth"]),
								fatherName: profile["Father Name"],
								permanentAddress: profile["Address"]
							},
							$unset: {
								evarsitySession: null
							}
						}).exec()
				})
				.then(() => {
					res.render('dashboard-evarsity/evarsity',
						{
							script: `
								notie.alert({ type: 'success', text: 'Login succcessful, redirecting to dashboard', time: 3});
								setTimeout( function() { window.location.href = '/dashboard';}, 4000);

								`
						})
				})
				.catch((err) => {
					req.log.error(err)
					res.status(401).render('dashboard-evarsity/evarsity',
						{
							script: `
								notie.alert({ type: 'error', text: 'Login failed', time: 3});
								setTimeout( function() { window.location.href = '/dashboard/evarsity';}, 4000);

								`
						})
				})
		} else {
			req.log.info("user already updated evarsity value or chose not to")
			next()
		}
	})
}