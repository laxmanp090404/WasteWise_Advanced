const express = require("express");
const router = express.Router();
const StationController = require("../Controllers/Stations.controller");
const verifyToken = require("../Middlewares/auth");

router.post("/stations/create", verifyToken, StationController.createStation);
router.get("/stations/getall", StationController.getStations);
router.delete("/stations/delete/:id",StationController.removeStation);
module.exports = router;
