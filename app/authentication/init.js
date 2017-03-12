const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

const authenticationMiddleware = require('./middleware')
const config = require('../../config')

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

passport.use(new GoogleStrategy({
		clientID: config.oauth.clientId,
		clientSecret: config.oauth.client_secret,
		callbackURL: config.oauth.callback
	},
	(accessToken, refreshToken, profile, done) => {
		console.log(profile.emails[0].value)//change here
		return done(null, profile.emails[0].value)
	}
))

function initPassport (app) {

	app.use(passport.initialize())
	app.use(passport.session())
	
	app.get('/login', passport.authenticate('google', { scope: ['email'] }))
	app.get('/login/callback', passport.authenticate('google', { failureRedirect: '/' }),
		function(req, res) {
		  res.redirect('/dashboard')
		}
	)
	
	passport.authenticationMiddleware = authenticationMiddleware
}

module.exports = initPassport
