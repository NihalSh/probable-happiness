const mongoose = require('mongoose')

let schema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		index: true
	},
	name: {
		type: String,
		required: true
	}
})

let user = mongoose.model('user', schema)

module.exports = user
