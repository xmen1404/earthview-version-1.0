const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: false,
        unique: false,
        trim: false
    },
    email: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    accountType: {
        type: String,
        enum: ['earthview', 'facebook', 'google'],
        default: 'earthview'
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    profilePicture: {
        type: String,
        required: true,
        default: process.env.URL + "defaultProfilePicture.png"
    },
    wallImage: {
        type: String,
        required: true,
        default: process.env.URL + "defaultWallImage.png"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        enum: ['admin', 'contributor', 'user'],
        default: 'user'
    }
});

module.exports = mongoose.model('users', userSchema); // users là tên collection