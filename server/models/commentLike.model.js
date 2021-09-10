const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentLikeSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId, // nối database
        ref: 'users'
    },
    comment:{
        type: Schema.Types.ObjectId,
        ref: 'postcomments'
    }
})


module.exports = mongoose.model('commentlikes', commentLikeSchema);