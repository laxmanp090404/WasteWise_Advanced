# WasteWise - Sustainable Waste Management Solution

WasteWise is a comprehensive web application designed to help communities efficiently manage waste collection and disposal. The platform connects users with waste collection stations, allowing them to book services, report improper waste disposal, and track waste management activities.

<p align="center">
  <img src="https://res.cloudinary.com/dtbwylcjb/image/upload/v1749789934/Wastewise_Bins_data/mapbinmarker_h6lrqq.png" width="100" alt="WasteWise Logo">
</p>

## Tech Stack

### Backend
- **Node.js** & **Express.js** - Server framework
- **MongoDB** - Database with Mongoose ODM
- **JWT** - Authentication
- **bcrypt** - Password encryption
- **cors**, **cookie-parser**, **morgan** - Middleware utilities

### Frontend
- **React** with **Vite** - UI library and build tool
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Axios** - API requests
- **Tailwind CSS** - Styling
- **Leaflet** - Interactive maps
- **Cloudinary** - Image upload and storage
- **react-hot-toast** - Notification system

## Features

### User Features
- **Account Management**
  - Create user and admin accounts
  - Profile customization
  
- **Waste Station Locator**
  - Interactive map showing all waste collection points
  - Real-time bin capacity information
  
- **Booking System**
  - Reserve waste collection services
  - Specify quantity of waste for disposal
  - View booking history
  
- **Waste Reporting**
  - Report improper waste dumping with location data
  - Upload images of waste
  - Categorize waste (biodegradable/non-biodegradable)
  
- **Notifications**
  - Real-time system notifications
  - Updates about station changes and bookings

### Admin Features
- **Station Management**
  - Add new waste collection stations
  - Delete existing stations
  - Refill station capacity
  
- **Booking Management**
  - View all user bookings
  - Track waste collection activities
  
- **System Monitoring**
  - Overview of system usage
  - User activity tracking

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/laxmanp090404/WasteWise_Advanced.git
   cd WasteWise_Advanced
   ```

2. **Install dependencies for both client and server**
   ```bash
   # Install root dependencies
   npm install
   
   # Install server dependencies
   cd server
   npm install
   
   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Set up environment variables**

   Create `.env` file in server directory with:
   ```
   MONGO_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_TIME=1
   COOKIE_EXPIRES_TIME=1
   CLIENT_URL=http://localhost:5173
   DEV_MODE=development
   PORT=7000
   ```

   Create `.env` file in client directory with:
   ```
   VITE_SERVER=http://localhost:7000
   VITE_REDIRECT_URL=http://localhost:7000
   VITE_PORT=5173
   VITE_HERE_MAPS_API_KEY=your_here_maps_api_key
   VITE_CLOUD_NAME=your_cloudinary_cloud_name
   VITE_CLOUD_PRESET=your_cloudinary_upload_preset
   ```

4. **Run the application**
   ```bash
   # From the root directory
   npm run app
   ```

   This will start both the client and server concurrently.

## Usage

1. **Registration and Login**
   - Create an account (user or admin)
   - Login with your credentials

2. **Finding Waste Stations**
   - Navigate to the map section
   - View all available waste stations
   - Check waste capacity levels

3. **Booking Waste Collection**
   - Select a station on the map
   - Choose waste quantity for disposal
   - Confirm booking

4. **Reporting Improper Waste**
   - Navigate to "Report to Us" section
   - Take or upload a photo of the waste
   - Allow location access or enter location manually
   - Select waste category and submit

5. **Admin Station Management**
   - Add new waste stations with name, location, and capacity
   - Monitor station usage
   - Delete or refill stations as needed

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.

---

Built with 💚 by the WasteWise Team