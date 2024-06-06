const Booking = require('../Models/Bookings.model');
const Station = require('../Models/Station.model');
const User = require('../Models/User.model')
exports.createBooking = async (req, res) => {
    try {
        const { stationId, quantity } = req.body;
        const userId = req.userId;

        const station = await Station.findById(stationId);
        if (!station) {
            return res.status(404).json({ message: 'Station not found' });
        }

        if (station.binlevel < quantity) {
            return res.status(400).json({ message: 'Not enough capacity' });
        }

        station.binlevel -= quantity;
        await station.save();

        const booking = new Booking({ userId, stationId, quantity });
        await booking.save();

        res.status(201).json({ booking, message: 'Booking successful' });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ message: 'Error creating booking' });
    }
};


exports.getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate({
                path: 'userId',
                select: 'firstname email'
            })
            .populate({
                path: 'stationId',
                select: 'name location'
            }).sort({createdAt:-1});

        const response = bookings.map(booking => ({
            firstName: booking.userId ? booking.userId.firstname : 'Unknown User',
            email:booking.userId?booking.userId.email:"Unknown email",
            stationName: booking.stationId ? booking.stationId.name : 'Unknown Station',
            quantityBooked: booking.quantity,
            location: booking.stationId ? booking.stationId.location : 'Unknown Location',
            createdAt:booking.createdAt
        }));

        res.status(200).json({response,message:"Fetched Bookings Successfully"});
    } catch (error) {
        console.error('Error getting bookings:', error);
        res.status(500).json({ message: 'Error getting bookings' });
    }
};

exports.getUserBookings = async(req,res)=>{
  try {
     const userId = req.userId;
     const bookings = await Booking.find({userId})
                                                  .populate({
                                                    path:"stationId",
                                                    select:"name location"
                                                  }).sort({updatedAt:-1})
    const response =  bookings.map((booking)=>(
        {
            stationName:booking.stationId?booking.stationId.name:"Unknown Station",
            location:booking.stationId?booking.stationId.location:"Unknown location",
            quantityBooked:booking.quantity,
            createdAt:booking.updatedAt
        }
    ))
    res.status(200).json({message:"Fetched Your bookings successfully",response})

  } catch (error) {
    console.error('Error getting booking:', error);
        res.status(500).json({ message: 'Error getting bookings' });
  }
}