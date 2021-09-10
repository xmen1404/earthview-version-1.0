const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    bigCategory:{
        type: Schema.Types.ObjectId,
        ref: "bigCategories",
        default: null
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: "categories",
        default: null
    },
    backgroundUrl:{
        type: String,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId, // nối database
        ref: 'users'
    },
    likes_count:{
        type: Number,
        required: true,
        default: 0
    },
    comments_count:{
        type: Number,
        required: true,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('posts', postSchema);