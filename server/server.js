const app = require("./app");
const mongoose = require("mongoose");

mongoose
	.connect("mongodb://127.0.0.1:27017/admin")
	.then(() => console.log("DB connected!"));

app.listen(3000, () => {
	console.log("Port is running on port:", 3000);
});
