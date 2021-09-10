const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postLikeSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId, // nối database
        ref: 'users'
    },
    post:{
        type: Schema.Types.ObjectId,
        ref: 'posts'
    }
})


module.exports = mongoose.model('postlikes', postLikeSchema);