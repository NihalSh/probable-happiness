module.exports = (app) => {
	app.get('/howto', (req, res) => {
		res.render('howto/webpage')
	})
}