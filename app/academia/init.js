"use strict"
const passport = require('passport')
const request = require('request-promise-native')

const config = require('../../config')
const User = require('../user').model

module.exports = (app) => {
	app.get('/academia', passport.authenticationMiddleware(), (req, res, next) => {
		if (req.user.name) {
			next()
		} else {
			res.send(`login page for${req.user.email} #TODO`)
		}
	})
	app.post('/academia', passport.authenticationMiddleware(), (req, res, next) => {
		if (req.user.name) {
			next()
		} else {
			if (req.body && req.body.password) {
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
						}
						res.send(`authenticated user #TODO`)
					}).catch((err) => {
						req.log.error(err)
						res.sendStatus(401)
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
