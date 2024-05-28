const StationModel = require("../Models/Station.model")

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