const mongoose =  require('mongoose')

const StationSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Station name required"]
    },
    location:{
        type:String,
        required:[true,"Location of station required"]
    },
    binlevel:{
        type:Number,
        required:[true,"Station bin level is required"]
    }
},{
    timestamps:true
})

const Station = mongoose.model("Stations",StationSchema)
module.exports = Station;

