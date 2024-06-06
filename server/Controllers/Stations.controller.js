const StationModel = require("../Models/Station.model")
const BookingModel  = require('../Models/Bookings.model')
const NotificationModel = require('../Models/Notifications.model')
exports.createStation = async(req,res)=>{
    try {
        const {name,location,binlevel} = req.body;
        const existingStation = await StationModel.findOne({location});
        if(existingStation){
            res.status(302).json({existing:true,message:"Station already exists.Check Location"})
        }
        else{
            const Station = await StationModel.create({
                name,location,binlevel
            })
            
                res.status(201).json({Station,message:"Station created successfully"})
            
        }
        
    } catch (error) {
        console.error("Error creating station:", error);
        res.status(500).json({ message: "Error creating station" });
    }
}

exports.getStations=async(req,res)=>{
 try {
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, content-type");

    const Stations = await StationModel.find();
    res.json(Stations)
 } catch (error) {
    console.error("Error getting stations:", error);
        res.status(500).json({ message: "Error getting stations" });
 }
}

exports.removeStation = async (req, res) => {
    try {
        const { id } = req.params;
        const station = await StationModel.findByIdAndDelete(id);
        if (station) {
            // Find all bookings related to the station
            const bookings = await BookingModel.find({ stationId: id });

            // Delete related bookings
            await BookingModel.deleteMany({ stationId: id });

            // Prepare notifications for affected users
            const notifications = bookings.map(booking => ({
                userId: booking.userId,
                message: `The station ${station.name} has been deleted. Your booking is affected.`,
                status: 'unread'
            }));
            await NotificationModel.insertMany(notifications);

            res.status(200).json({ message: "Deleted station, related bookings, and notified affected users" });
        } else {
            res.status(304).json({ message: "Unable to delete station" });
        }
    } catch (error) {
        console.error("Error removing station:", error);
        res.status(500).json({ message: "Error removing station" });
    }
};