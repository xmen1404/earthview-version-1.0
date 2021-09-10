const PostModel = require("../models/post.model");

module.exports.createPost = async (req, res) =>{
    // phải nói chuyện với db => là hàm bất đồng bộ
    const {title, content, description, backgroundUrl, bigCategory, category} = req.body;

    // simple validation
    if(!title){
        return res.status(400).json({"success": false, "message": "title is required"});
    }

    if(!content){
        return res.status(400).json({"success": false, "message": "content is required"});
    }

    if(!description){
        return res.status(400).json({"success": false, "message": "description is required"});
    }

    // tạo post mới và đẩy vào db
    try{
        const newPost = new PostModel({
            title: title,
            content: content,
            description: description,
            bigCategory: bigCategory,
            category: category,
            backgroundUrl: backgroundUrl,
            user: req.userId
        })

        await newPost.save();

        res.json({success: true, message: "post ok", post: newPost});


    }catch(err){
        console.log(err);
        res.status(500).json({success: false, message: "Internal server error"});
    }
}

module.exports.getPost = async (req,res) =>{
    try{
        const posts = await PostModel.find().sort({ _id: -1 })
                                        .populate('user', ['name', 'profilePicture', '_id'])
                                        .populate('category', ['name'])
                                        .populate('bigCategory', ['name']);
        res.json({"success": true, "posts": posts});

    }catch(err){
        console.log(err);
        res.status(500).json({"success": false, "message": "Internal server error"});
    }
}

module.exports.getPostById = async (req,res) =>{
    try{
        const postGetCondition = {user: req.params.id};

        const posts = await PostModel.find(postGetCondition).sort({ _id: -1 })
                                        .populate('user', ['name', 'profilePicture', '_id'])
                                        .populate('category', ['name'])
                                        .populate('bigCategory', ['name']);
        res.json({"success": true, "posts": posts});

    }catch(err){
        console.log(err);
        res.status(500).json({"success": false, "message": "Internal server error"});
    }
}


module.exports.updatePost = async (req, res)=>{
    // const {title, content, description, bigCategory, category, backgroundUrl, likes_count, comments_count} = req.body;

    // simple validation

    // tạo post mới và đẩy vào db
    try{
        // let updatedPost = {
        //     title,
        //     content,
        //     description,
        //     bigCategory: bigCategory._id,
        //     category: category._id,
        //     backgroundUrl,
        //     likes_count,
        //     comments_count
        // }

        const postUpdateCondition = {_id: req.params.id};


        // updatedPost = await PostModel.findOneAndUpdate(postUpdateCondition, updatedPost, {new: true});
        updatedPost = await PostModel.findOneAndUpdate(postUpdateCondition, {$set: req.body}, {new: true});
        // Kiểm tra xem update có thành công không
        if(!updatedPost){
            // console.log("this case 1");
            res.status(401).json({"success": false, "message": "Post not found or user is not autherized"})
        }
        
        // console.log("this case 2");
        res.json({success: true, message: "Excellent progress", post: updatedPost});


    }catch(err){
        console.log(err);
        res.status(500).json({"success": false, "message": "Internal server error"});
    }   
}





module.exports.updatePostIncrement = async (req, res)=>{
    // const {increment} = req.body;

    // simple validation

    // tạo post mới và đẩy vào db
    try{
          const postUpdateCondition = {_id: req.params.id};


        // updatedPost = await PostModel.findOneAndUpdate(postUpdateCondition, updatedPost, {new: true});
        updatedPost = await PostModel.findOneAndUpdate(postUpdateCondition, {$inc: req.body}, {new: true});
        // Kiểm tra xem update có thành công không
        if(!updatedPost){
            // console.log("this case 1");
            res.status(401).json({"success": false, "message": "Post not found or user is not autherized"})
        }
        
        // console.log("this case 2");
        res.json({success: true, message: "Excellent progress", post: updatedPost});


    }catch(err){
        console.log(err);
        res.status(500).json({"success": false, "message": "Internal server error"});
    }   
}





module.exports.deletePost = async (req,res) =>{
    try{
        const deletePostCondition = {_id: req.params.id, user: req.userId};
        const deletedPost = await PostModel.findOneAndDelete(deletePostCondition);

        if(!deletedPost){
            res.status(401).json({"success": false, "message": "Post not found or user is not autherized"})
        }

        res.json({"success": true, post: deletedPost})

    }catch(err){
        console.log(err);
        res.status(500).json({"success": false, "message": "Internal server error"});
    }
}