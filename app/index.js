"use strict";

const bodyParser = require('body-parser')
const express = require('express')
const helmet = require('helmet')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

const config = require('../config')

const app = express()

const opts = {
	server: {
		socketOptions: { keepAlive: 1 }
	}
}
mongoose.connect(config.mongo.connectionString, opts)

switch(app.get('env')) {
case 'development':
	app.use(require('express-bunyan-logger')({
		name: 'logger',
		streams: [{
			level: 'trace',
			stream: process.stdout
		}]
	}))
	break
case 'production':
	app.use(require('express-bunyan-logger')())
	/*add file rotation*/
	break
}

app.use(helmet())

app.use(session({
	store: new RedisStore({
		url: config.redisStore.url
	}),
	secret: config.redisStore.secret,
	resave: false,
	saveUninitialized: false
}))

app.use(bodyParser.urlencoded({ extended: false }))

app.use(passport.initialize())
app.use(passport.session())

require('./authentication').init(app)

app.use((req, res) => {
	res.sendStatus(404)
})

app.use((err, req, res, next) => {
	req.log.error(err)
	res.sendStatus(500)
})

module.exports = app
