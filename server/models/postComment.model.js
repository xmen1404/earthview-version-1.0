const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postCommentSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId, // nối database
        ref: 'users'
    },
    post:{
        type: Schema.Types.ObjectId,
        ref: 'posts'
    },
    parent:{
        type: Schema.Types.ObjectId,
        ref: 'postcomments',
        default: null
    },
    content:{
        type: String,
        required: true
    },
    images:{
        type: Array,
        required: true,
        default: []
    },
    likes_count:{
        type: Number,
        required: true,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('postcomments', postCommentSchema);