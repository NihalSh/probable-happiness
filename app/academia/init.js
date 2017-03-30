"use strict"
const passport = require('passport')
const request = require('request-promise-native')

const config = require('../../config')
const User = require('../user').model



module.exports = (app) => {

	app.get('/academia', passport.authenticationMiddleware(), (req, res, next) => {
		if (req.user.name) {
			req.log.info('existing user')
			res.redirect('/dashboard')
		} else {
			res.render('academia/academia-login', { 
				email: req.user.email,
			})
		}
	})

	app.post('/academia', passport.authenticationMiddleware(), (req, res, next) => {
		if (req.user.name) {
			req.log.info('existing user')
			next()
		} else {
			if (req.body && req.body.password) {
				let message = 'Login failed'
				let basicAuth = new Buffer(`${req.user.email}:${req.body.password}`).toString('base64')
				let loginOption = {
					uri: `${config.academia.url}`,
					headers: {
						Authorization: `Basic ${basicAuth}`
					},
					json: true
				}
				request(loginOption)
					.then((response) => {
						let detailsOption = {
							uri: `${config.academia.url}/details/${response}`,
							json: true
						}
						return request(detailsOption)
					}).then((response) => {
						let mapped = mapper(response)
						if (mapped !== null) {
							console.log(mapped)
							if ((mapped['Department'] === 'Computer Science and Engineering') &&  (+mapped['Semester'] === 6)) {
								return new User({
									email: req.user.email,
									name: mapped['Name'],
									registrationNumber: mapped['Registration Number'],
									program: mapped['Program'],
									department: mapped['Department'],
									semester: +mapped['Semester']
								}).save();
							} else {
								message = 'This portal is only for semester 6 CSE students'
								throw new Error('non CSE student')
							}
						} else {
							throw new Error('academia response parsing error')
						}
					}).then((user) => {
						req.log.info('user data entered in the database')
						res.redirect('/dashboard')
					}).catch((err) => {
						req.log.error(err)
						res.status(401).render('academia/academia-login',
							{
								email: req.user.email,
								script: `
									notie.alert({ type: 'error', text: '${message}', time: 3});
									history.replaceState(null, null, "/academia");

									`
							}
						)
					})
			} else {
				next()
			}
		}
	})
}

function mapper(array) {
	if (array.length === 2 && (array[0].length === array[1].length)) {
		let map = {}
		for (let i in array[0]) {
			map[array[0][i]] = array[1][i]
		}
		return map
	} else {
		return null
	}
}
