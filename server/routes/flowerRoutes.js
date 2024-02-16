const route = require("express").Router();
const flowerModel = require("../models/flowers.schema.js");
route.get("/", async (req, res) => {
	const { type } = req.query;
	return res.status(200).json({
		message: "success",
		data: await flowerModel.find({ type }),
	});
});
route.post("/", async (req, res) => {
	const { image, title, description, type } = req.body;

	return flowerModel
		.create({ image, title, description, type })
		.then((response) => {
			res.status(200).json({
				message: "success",
			});
		})
		.catch((err) => {
			res.status(400).json({
				message: "fail",
			});
		});
});
route.put("/:id", async (req, res) => {
	const { id } = req.params;
	const { image, title, description, type } = req.body;
	return flowerModel
		.updateOne(
			{ _id: id },
			{ $set: { image, title, description, type } },
			{ new: true }
		)
		.then((response) => {
			console.log(response);
			res.status(200).json({
				message: "success",
			});
		})
		.catch((err) => {
			res.status(400).json({
				message: "fail",
			});
		});
});
route.delete("/:id", async (req, res) => {
	console.log("delete flower/:id");

	const { id } = req.params;

	return flowerModel
		.findByIdAndDelete(id)
		.then((response) => {
			res.status(200).json({
				message: "success",
			});
		})
		.catch((err) => {
			res.status(400).json({
				message: "fail",
			});
		});
});
module.exports = route;
