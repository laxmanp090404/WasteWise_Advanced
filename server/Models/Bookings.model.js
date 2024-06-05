const mongoose = require('mongoose');

const BookingSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    stationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stations',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});

const Booking = mongoose.model('Bookings', BookingSchema);
module.exports = Booking;
