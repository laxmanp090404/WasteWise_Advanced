const Notification = require('../Models/Notifications.model')


exports.getNotif = async(req,res)=>{
 try {
    const {userId} = req;
    const notifs = await Notification.find({userId});
    if(notifs){
        res.status(200).json({notifs,message:"Got notifications successfully"})
    }
    else{
        res.status(304).json({message:"No notifications to show"})
    }
 } catch (error) {
    console.log(error," at getting notifications")
    res.status(500).json({message:"Server unavailable at getting notifications"})
 }
}