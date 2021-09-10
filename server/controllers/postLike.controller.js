const PostLikeModel = require("../models/postLike.model");

module.exports.likePost = async (req, res) => {
    try{
        const newLike = new PostLikeModel({
            post: req.params.id,
            user: req.userId
        })

        await newLike.save();

        res.json({success: true, message: "like successfully", like: newLike});


    }catch(err){
        console.log(err);
        res.status(500).json({success: false, message: "Internal server error"});
    }
}

module.exports.getPostLike = async (req, res) => {
    try{
        const condition = {post: req.params.id};
        const likes = await PostLikeModel.find(condition)
                                        .populate('user', ['name', 'profilePicture'])
                                       
        res.json({success: true, likes: likes});

    }catch(err){
        console.log(err);
        res.status(500).json({"success": false, "message": "Internal server error"});
    }
}

module.exports.checkPostLike = async (req, res) => {
    try{
        const condition = {post: req.params.id, user: req.userId};
        const likes = await PostLikeModel.find(condition);
        
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

module.exports.unlikePost = async (req,res) => {
    try{
        const condition = {post: req.params.id, user: req.userId};
        const deletedLike = await PostLikeModel.findOneAndDelete(condition);

        if(!deletedLike){
            res.status(401).json({"success": false, "message": "Like not found or user is not autherized"})
        }

        res.json({"success": true, like: deletedLike})

    }catch(err){
        console.log(err);
        res.status(500).json({"success": false, "message": "Internal server error"});
    }
}