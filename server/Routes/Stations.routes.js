const express = require('express')
const router = express.Router()
const StationController = require('../Controllers/Stations.controller')

router.post("/stations/create",StationController.createStation);
module.exports = router;