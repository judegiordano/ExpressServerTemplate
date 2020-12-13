const mongoose = require("mongoose");

const User = new mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	activated: {
		type: Boolean,
		default: false
	},
	created: {
		type: Date,
		default: Date.now()
	},
	lastUpdated: {
		type: Date,
		default: Date.now()
	}
}, {
	collection: "User"
});

module.exports = mongoose.model("User", User);