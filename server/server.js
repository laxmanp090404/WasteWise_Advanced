const express = require('express');
const app = express();
const morgan = require("morgan");
const cors =  require('cors');
const cookieParser = require('cookie-parser');
const { dbConnect } = require('./Config/dbUtils');
require("dotenv").config();

// Routes
const userRoute = require("./Routes/Users.routes");
const stationRoutes = require("./Routes/Stations.routes")
// Middleware
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173","*"], 
    methods: ["GET", "POST"],
    credentials: true
}));
app.options('*', cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
}));


app.use(morgan('dev'));
app.use(cookieParser());

// Custom middleware to log requests
const requestDetect = (req, res, next) => {
    console.log("User request received");
    next();
};
app.use(requestDetect);

// Define routes
app.use(userRoute);
app.use(stationRoutes)

app.get('/', (req, res) => {
    res.status(200).send({ 'message': 'node server' });
});

// Start the server
const PORT = process.env.PORT || 8000;
dbConnect();
try {
    app.listen(PORT, () => {
        console.log(`Server is running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgMagenta.black);
    });
} catch (error) {
    console.log(error);
    console.log("Failed to listen");
}
