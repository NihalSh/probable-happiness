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
							captcha: captcha
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
					console.log(grades)
					console.log(profile)
					return User.findOneAndUpdate({ email: req.user.email },
						{
							$set: {
								sgpa1: grades.sgpa1,
								sgpa2: grades.sgpa2,
								sgpa3: grades.sgpa3,
								sgpa4: grades.sgpa4,
								sgpa5: grades.sgpa5,
								cgpa: grades.cgpa,
								bloodGroup: profile["Blood Group"],
								gender: profile["Sex"],
								dateOfBirth: new Date(profile["Date of Birth"]),
								fatherName: profile["Father Name"],
								permanentAddress: profile["Address"]
							}
						}).exec()
				})
				.then(() => {
					res.send("information updated")
				})
				.catch((err) => {
					req.log.error(err)
					res.sendStatus(401)
				})
		} else {
			req.log.info("user already updated evarsity value or chose not to")
			next()
		}
	})
}