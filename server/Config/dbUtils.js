const mongoose = require('mongoose')
const colors = require('colors')
require('dotenv').config();

// console.log(process.env) 
const dbConnect   = async()=>{
    
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Successfully Connected to DB of address ${mongoose.connection.host}`.bgGreen.black )
        
    } catch (error) {
        console.log(error);
        console.log("Failed to connect to DB".bgRed.white);
    }
}
module.exports = {dbConnect}