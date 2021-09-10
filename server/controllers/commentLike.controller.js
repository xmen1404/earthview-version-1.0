const CommentLikeModel = require("../models/commentLike.model");

module.exports.likeComment = async (req, res) => {
    try{
        const newLike = new CommentLikeModel({
            comment: req.params.id,
            user: req.userId
        })

        await newLike.save();

        res.json({success: true, message: "like successfully", like: newLike});


    }catch(err){
        console.log(err);
        res.status(500).json({success: false, message: "Internal server error"});
    }
}

module.exports.getCommentLike = async (req, res) => {
    try{
        const condition = {comment: req.params.id};
        const likes = await CommentLikeModel.find(condition)
                                        .populate('user', ['name', 'profilePicture'])
                                       
        res.json({success: true, likes: likes});

    }catch(err){
        console.log(err);
        res.status(500).json({"success": false, "message": "Internal server error"});
    }
}

module.exports.checkCommentLike = async (req, res) => {
    try{
        const condition = {comment: req.params.id, user: req.userId};
        const likes = await CommentLikeModel.find(condition);

        // console.log("chính là mày", req.params.id, likes);
        
        if(likes.length === 0){
            res.json({success: true, isLike: false});
        }
        else{
            res.json({success: true, isLike: true});
        }

    }catch(err){
        console.log(err);
        res.status(500).json({"success": false, "message": "Internal server error"});
    }
}

module.exports.unlikeComment = async (req,res) => {
    try{
        const condition = {comment: req.params.id, user: req.userId};
        const deletedLike = await CommentLikeModel.findOneAndDelete(condition);

        if(!deletedLike){
            res.status(401).json({"success": false, "message": "Like not found or user is not autherized"})
        }

        res.json({"success": true, like: deletedLike})

    }catch(err){
        console.log(err);
        res.status(500).json({"success": false, "message": "Internal server error"});
    }
}