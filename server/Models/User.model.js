const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Firstname is required"]
    },
    lastname: {
        type: String,
        required: [true, "Lastname is required"],
        
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "User already exists"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    mobile: {
        type: String,
        required: [true, "Mobile number is required"]
    },
    location: {
        type: String,
        required: [true, "Location is required"]
    },
    roles: {
        type: [String],
        enum: ['user', 'admin'],
        default: ['user']
    },
}, {
    timestamps: true
});

const User = mongoose.model("Users", UserSchema);
module.exports = User;
