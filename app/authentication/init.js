const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

const authenticationMiddleware = require('./middleware')
const config = require('../../config')
const User = require('../user').model

passport.serializeUser((user, done) => {
	done(null, { email: user})
})
passport.deserializeUser((user, done) => {
	let promise = User.findOne({'email': user.email}).exec()
	promise.then((json) => {
		if (json) {
			done(null, json)
		} else {
			done(null, user)
		}
	}).catch((err) => {
			console.log(err);
	})
})

passport.use(new GoogleStrategy({
		clientID: config.oauth.clientId,
		clientSecret: config.oauth.client_secret,
		callbackURL: config.oauth.callback
	},
	(accessToken, refreshToken, profile, done) => {
		let regex = /.*\@srmuniv\.edu\.in/
		if (profile.emails[0].value.search(regex) != -1) {
			return done(null, profile.emails[0].value)
		} else {
			return done(null, false)
		}
	}
))

function initPassport (app) {

	app.get('/login', passport.authenticate('google', { scope: ['email'] }))
	app.get('/login/callback', passport.authenticate('google', { failureRedirect: '/' }),
		(req, res) => {
			let promise = User.findOne({'email': req.user.email}).exec()
			
			promise.then((user) => {
				if (user) {
					req.log.trace(user);
					res.redirect('/dashboard')
				} else {
					req.log.info("no user found, redirecting to academia")
					res.redirect('/academia')
				}
			}).catch((err) => {
				req.log.error(err)
				res.sendStatus('500')
			})
		}
	)
	
	passport.authenticationMiddleware = authenticationMiddleware
}

module.exports = initPassport
