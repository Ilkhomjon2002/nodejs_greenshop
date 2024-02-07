const { Schema, default: mongoose } = require("mongoose");

const flowerSchema = new Schema({
	image: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
		enum: ["gardening", "homepot", "domestic"],
	},
});

module.exports = mongoose.model("flower", flowerSchema);
