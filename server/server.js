const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { dbConnect } = require('./Config/dbUtils');
require('dotenv').config();

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(200);
});

app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

// Custom middleware to log requests
const requestDetect = (req, res, next) => {
  console.log('User request received');
  next();
};
app.use(requestDetect);

// Routes
const userRoute = require('./Routes/Users.routes');
const stationRoutes = require('./Routes/Stations.routes');

// Define routes
app.use(userRoute);
app.use(stationRoutes);

app.get('/', (req, res) => {
  res.status(200).send({ message: 'node server' });
});

// Start the server
const PORT = process.env.PORT || 7000;
dbConnect();
try {
  app.listen(PORT, () => {
    console.log(`Server is running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgMagenta.black);
  });
} catch (error) {
  console.log(error);
  console.log('Failed to listen');
}
