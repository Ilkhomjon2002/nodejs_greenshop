const { Router } = require("express");
const route = Router();
const flowerRoutes = require("./flowerRoutes");

route.use("/flower", flowerRoutes);

module.exports = route;
