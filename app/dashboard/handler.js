module.exports = (req, res) => {
	res.render('dashboard/dashboard',
		{
			name: req.user.name,
			registrationNumber: req.user.registrationNumber,
			program: req.user.program,
			department: req.user.department,
			semester: req.user.semester,
			evarsity: req.user.evarsity,
			image: req.user.image,
			script: req.script
		}
	)
}