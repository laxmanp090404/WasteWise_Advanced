const express = require('express');
const router = express.Router();
const BookingController = require('../Controllers/Bookings.controller');
const verifyToken = require('../Middlewares/auth');

router.post('/bookings/create', verifyToken, BookingController.createBooking);
router.get('/bookings/get',BookingController.getBookings)
module.exports = router;
