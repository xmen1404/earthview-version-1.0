const PostCommentModel = require("../models/postComment.model");

module.exports.commentPost = async (req, res) => {
    const {content} = req.body;
    // console.log("check content", content);
    
    try{
        const newComment = new PostCommentModel({
            post: req.params.id,
            user: req.userId,
            content: content
        })

        await newComment.save();

        await newComment.populate('user', ['name', 'profilePicture']).execPopulate();

        res.json({success: true, message: "comment successfully", comment: newComment});


    }catch(err){
        console.log(err);
        res.status(500).json({success: false, message: "Internal server error"});
    }
}



module.exports.replyCommentPost = async (req, res) => {
    const {content} = req.body;
    // console.log("check content", content);
    
    try{
        const newComment = new PostCommentModel({
            post: req.params.postId,
            user: req.userId,
            content: content,
            parent: req.params.commentId
        })

        await newComment.save();

        await newComment.populate('user', ['name', 'profilePicture']).execPopulate();

        res.json({success: true, message: "comment successfully", comment: newComment});


    }catch(err){
        console.log(err);
        res.status(500).json({success: false, message: "Internal server error"});
    }
}



module.exports.getPostComment = async (req, res) => {
    try{
        const condition = {post: req.params.id, parent: null};
        const comments = await PostCommentModel.find(condition).sort({ _id: -1 })
                                        .populate('user', ['name', 'profilePicture'])
                                       
        res.json({success: true, comments: comments});

    }catch(err){
        console.log(err);
        res.status(500).json({"success": false, "message": "Internal server error"});
    }
}



module.exports.getReplyPostComment = async (req, res) => {
    try{
        const condition = {post: req.params.postId, parent: req.params.commentId};
        const comments = await PostCommentModel.find(condition)
                                        .populate('user', ['name', 'profilePicture'])
                                       
        res.json({success: true, replyComments: comments});

    }catch(err){
        console.log(err);
        res.status(500).json({"success": false, "message": "Internal server error"});
    }
}

// module.exports.checkPostLike = async (req, res) => {
//     try{
//         const condition = {post: req.params.id, user: req.userId};
//         const likes = await PostLikeModel.find(condition);
        
//         if(likes.length === 0){
//             res.json({success: true, isLike: false});
//         }
//         else{
//             res.json({success: true, isLike: true});
//         }

//     }catch(err){
//         console.log(err);
//         res.status(500).json({"success": false, "message": "Internal server error"});
//     }
// }


module.exports.deleteComment = async (req,res) => {
    try{
        const condition = {_id: req.params.id, user: req.userId};
        const deletedComment = await PostCommentModel.findOneAndDelete(condition);

        if(!deletedComment){
            res.status(401).json({"success": false, "message": "Comment not found or user is not autherized"})
        }

        res.json({"success": true, comment: deletedComment})

    }catch(err){
        console.log(err);
        res.status(500).json({"success": false, "message": "Internal server error"});
    }
}




module.exports.updateComment = async (req, res)=>{
    // const {title, content, description, bigCategory, category, backgroundUrl, likes_count, comments_count} = req.body;

    // simple validation

    // tạo post mới và đẩy vào db
    try{

        const commentUpdateCondition = {_id: req.params.id};


        // updatedPost = await PostModel.findOneAndUpdate(postUpdateCondition, updatedPost, {new: true});
        updatedComment = await PostCommentModel.findOneAndUpdate(commentUpdateCondition, {$set: req.body}, {new: true});
        // Kiểm tra xem update có thành công không
        if(!updatedComment){
            // console.log("this case 1");
            res.status(401).json({"success": false, "message": "Post not found or user is not autherized"})
        }
        
        // console.log("this case 2");
        res.json({success: true, message: "Excellent progress", post: updatedComment});


    }catch(err){
        console.log(err);
        res.status(500).json({"success": false, "message": "Internal server error"});
    }   
}