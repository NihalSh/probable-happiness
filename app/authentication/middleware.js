module.exports = function authenticationMiddleware () {  
	return function (req, res, next) {
		req.log.trace(`User authenticated: ${req.isAuthenticated()} ${req.user}`)
		if (req.isAuthenticated()) {
			return next()
		}
		res.redirect('/')
	}
}
