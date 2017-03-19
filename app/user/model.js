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

	evarsity: {
		type: Boolean,
		default: null
	},
	evarsitySession: {
		type: String,
		default: null
	},
	image: {
		type: String,
		default: null
	},
	sgpa1: {
		type: Number,
		default: null
	},
	sgpa2: {
		type: Number,
		default: null
	},
	sgpa3: {
		type: Number,
		default: null
	},
	sgpa4: {
		type: Number,
		default: null
	},
	sgpa5: {
		type: Number,
		default: null
	},
	cgpa: {
		type: Number,
		default: null
	},
	sem1: {
		type: Array,
		default: null
	},
	sem2: {
		type: Array,
		default: null
	},
	sem3: {
		type: Array,
		default: null
	},
	sem4: {
		type: Array,
		default: null
	},
	sem5: {
		type: Array,
		default: null
	},
	historyArrears: {
		type: Boolean,
		default: null
	},
	standingArrears: {
		type: Number,
		default: null
	},
	bloodGroup: {
		type: String,
		default: null
	},
	dateOfBirth: {
		type: Date,
		default: null
	},
	gender: {
		type: String,
		default: null
	},
	fatherName: {
		type: String,
		default: null
	},
	permanentAddress: {
		type: String,
		default: null
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
	},

	currentAddress: {
		type: String,
		default: null
	},
	personalEmail: {
		type: String,
		default: null
	},
	parentsNumber: {
		type: String,
		default: null
	},
	personalNumber: {
		type: String,
		default: null
	},

	boarding: {
		type: Boolean,
		default: null
	},
	height: {
		type: Number,
		default: null
	},
	weight: {
		type: Number,
		default: null
	},
	motherName: {
		type: String,
		default: null
	},

	programmingLanguages: {
		type: Array,
		default: null
	},
	languages: {
		type: Array,
		default: null
	},
	cocurricular: {
		type: Array,
		default: null
	},
	extracurricular: {
		type: Array,
		default: null
	}
})

let user = mongoose.model('user', schema)

module.exports = user
