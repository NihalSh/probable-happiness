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

	app.get('/login/callback',
		(req, res, next) => {
			passport.authenticate('google',
				(err, user, info) => {
					if (err) {
						return next(err)
					}
					if (!user) {
						req.logout()
						return res.render('home/home',
							{
								script: `
									notie.alert({ type: 'error', text: 'Only @srmuniv.edu.in email id allowed, signing out of Google', time: 6});
									history.replaceState(null, null, "/");
									setTimeout( function() { window.location.href = "https://accounts.google.com/Logout"; }, 7000);

									`
							}
						)
					}
					req.logIn(user, (err) => {
					    	if (err) {
					      		return next(err)
					      	}
							let promise = User.findOne({'email': user.email}).exec()
							promise.then((user) => {
							  		if (err) {
							  			return next(err)
									}
									if (user) {
										req.log.trace(user);
										return res.redirect('/dashboard')
									} else {
										req.log.info("no user found, redirecting to academia")
										return res.redirect('/academia')
									}
							}).catch((err) => {
								return next(err)
							})
				    	}
				    )
				}
			)(req, res, next)
		}
	)
	
	passport.authenticationMiddleware = authenticationMiddleware
}

module.exports = initPassport
