"use strict";
const path = require('path')

const bodyParser = require('body-parser')
const exphbs  = require('express-handlebars')
const express = require('express')
const helmet = require('helmet')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

const config = require('../config')

const app = express()

const opts = {
	config: {
		autoIndex: false
	},
	server: {
		socketOptions: { keepAlive: 1 }
	}
}
mongoose.connect(config.mongo.connectionString, opts)
mongoose.Promise = global.Promise

app.engine('.hbs', exphbs({
  extname: '.hbs',
  layoutsDir: path.join(__dirname),
  partialsDir: path.join(__dirname)
}))

app.set('view engine', '.hbs')
app.set('views', path.join(__dirname))

app.use(express.static(path.join(__dirname, 'public')))

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

app.use((req, res, next) => {
	if (!req.session) {
		throw new Error('session store not working')
	} else {
		next()
	}
})

app.use(bodyParser.urlencoded({ extended: false }))

app.use(passport.initialize())
app.use(passport.session())

require('./home').init(app)
require('./howto').init(app)
require('./authentication').init(app)
require('./academia').init(app)
require('./dashboard').init(app)
require('./dashboard-evarsity').init(app)
require('./dashboard-academics').init(app)
require('./dashboard-contactDetails').init(app)
require('./dashboard-personalDetails').init(app)
require('./dashboard-skillsAndInterests').init(app)
require('./dashboard-contact-us').init(app)
require('./logout').init(app)

app.use((req, res) => {
	res.sendStatus(404)
})

app.use((err, req, res, next) => {
	req.log.error(err)
	res.sendStatus(500)
})

module.exports = app
