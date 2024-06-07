const express = require("express");
const router = express.Router();
const StationController = require("../Controllers/Stations.controller");
const verifyToken = require("../Middlewares/auth");

router.post("/stations/create", verifyToken, StationController.createStation);
router.get("/stations/getall", StationController.getStations);
router.delete("/stations/delete/:id",verifyToken,StationController.removeStation);
router.post("/stations/refill/:id", verifyToken, StationController.refillStation);
module.exports = router;
