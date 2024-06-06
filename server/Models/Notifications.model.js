const mongoose = require('mongoose');

const NotificationSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['read', 'unread'],
        default: 'unread',
    },
}, {
    timestamps: true,
});

const Notification = mongoose.model("Notification", NotificationSchema);
module.exports = Notification;
