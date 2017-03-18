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
	},
	registrationNumber: {
		type: String,
		required: true,
		unique: true
	},
	program: {
		type: String,
		required: true
	},
	department: {
		type: String,
		required: true
	},
	semester: {
		type: Number,
		required: true
	},

	'10pc': {
		type: Number,
		default: null
	},
	'10board': {
		type: String,
		default: null
	},
	'12pc': {
		type: Number,
		default: null
	},
	'12board': {
		type: String,
		default: null
	}
})

let user = mongoose.model('user', schema)

module.exports = user
