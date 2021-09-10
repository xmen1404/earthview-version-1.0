// const fetch = require('node-fetch');
const userModel = require('../models/user.model');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const {OAuth2Client} = require('google-auth-library');


module.exports.validateUser = async(req, res) => {
    try {
        const user = await userModel.findById(req.userId).select('-password -createdAt -__v');

        if (!user){
            // return res.status(400).json({success: false, message: 'User not found'});
            return res.json({success: false, message: 'User not found'});
        }

        // console.log("đến đây ok");

        return res.json({success: true, user: user});

    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: 'Internal server error'});
    }
}

module.exports.register = async(req,res) =>{
    const {username, password} = req.body;

    // simple validation
    if(!username || !password){
        return res
                .status(400)
                .json({success: false, message: "missing username and/or password"});
    }

    try{
        // check user - xem có user trong database chưa
        const user = await userModel.findOne({username: username});

        if(user){
            return res.status(400).json({success: false, message: "username exists"})
        }

        // all good => hash password
        const hashedPassword = await argon2.hash(password);
        const newUser = new userModel({
            username: username,
            password: hashedPassword
        });

        await newUser.save();

        // return token dùng jwt
        const accessToken = jwt.sign(
            {userId: newUser._id}, 
            process.env.ACCESS_TOKEN_SECRET
        )
        
        return res.json({success: true, message: "register done", accessToken});
    } catch(err){
        // in ra lỗi nếu server có vấn đề
        console.log(err);
        res.status(500).json({"success": false, "message": "Internal server error"});
    }
}

module.exports.login = async (req, res) => {
    // login cũng là hàm bất đồng bộ, vì trong này có communication với db
    const {username, password} = req.body;

    // simple validation
    if(!username || !password){
        return res
                .status(400)
                .json({success: false, message: "missing username and/or password"});
    }

    // check xem username có trong db không
    try{
        const user = await userModel.findOne({username:username});
        if(!user){
            return res.status(400).json({"success": false, "message": "Incorrect username or password"});
        }

        const passwordValid = await argon2.verify(user.password, password);
        
        if(!passwordValid){
            return res.status(400).json({"success": false, "message": "Incorrect username or password"});
        }

        // all good
        // return token dùng jwt
        const accessToken = jwt.sign(
            {userId: user._id}, 
            process.env.ACCESS_TOKEN_SECRET
        )
        
        return res.json({success: true, message: "login successfully", accessToken});


    }catch(err){
        // in ra lỗi nếu server có vấn đề
        console.log(err);
        res.status(500).json({"success": false, "message": "Internal server error"});
    }
}





module.exports.facebookLogin = async (req, res) => {
    // login cũng là hàm bất đồng bộ, vì trong này có communication với db
    const {accessToken, userId} = req.body;

    // console.log("check body", accessToken);
    // check xem username có trong db không
    try{
        const urlGraphFacebook = `https://graph.facebook.com/v11.0/me?fields=id%2Cname%2Cpicture%2Cemail&access_token=${accessToken}`;

        const facebookRes = await axios.get(urlGraphFacebook);

        // console.log("debug login facebook 2", res.data);
        const {email, name, picture} = facebookRes.data;
        // console.log("check facbookRes", facebookRes.data);

        // check user - xem có user trong database chưa
        const user = await userModel.findOne({email: email, accountType: "facebook"});

        if(user){
            const token = jwt.sign(
                {userId: user._id}, 
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '7d'}
            )
            
            // const {_id, email, name, role} = user;

            return res.json({
                success: true, 
                message: "login successfully", 
                accessToken: token,
                // user: {_id, name, email, role}
            });
        }
        else{
            console.log("đăng nhập lần đầu");
            const password = email+process.env.ACCESS_TOKEN_SECRET;
            const hashedPassword = await argon2.hash(password);

            // console.log("test picture", picture);

            const newUser = new userModel({
                name: name,
                password: hashedPassword,
                accountType: "facebook",
                email: email,
                profilePicture: picture.data.url
            });
    
            await newUser.save();
    
            // return token dùng jwt
            const token = jwt.sign(
                {userId: newUser._id}, 
                process.env.ACCESS_TOKEN_SECRET
            )
            
            // const {_id, email, name, role} = newUser;

            return res.json({
                success: true, 
                message: "đăng nhập lần đầu thành công", 
                // user: {_id, name, email, role},
                accessToken: token
            });

        }

    }catch(err){
        // in ra lỗi nếu server có vấn đề
        console.log(err);
        res.status(500).json({"success": false, "message": "Internal server error"});
    }
}



const client = new OAuth2Client("758282287979-fjtnthm0sborf4g7283cl17nulfp04se.apps.googleusercontent.com");

module.exports.googleLogin = async (req, res) => {
    // login cũng là hàm bất đồng bộ, vì trong này có communication với db
    const {tokenId} = req.body;

    // console.log("check body", accessToken);
    // check xem username có trong db không
    try{
        const googleRes = await client.verifyIdToken({idToken: tokenId, audience: "758282287979-fjtnthm0sborf4g7283cl17nulfp04se.apps.googleusercontent.com"})

        // console.log("debug login facebook 2", res.data);
        const {email_verified, name, email, picture} = googleRes.payload;

        // console.log("check response", googleRes.payload)

        // check user - xem có user trong database chưa
        
        if(email_verified){
            const user = await userModel.findOne({email: email, accountType: "google"});

            if(user){
                const token = jwt.sign(
                    {userId: user._id}, 
                    process.env.ACCESS_TOKEN_SECRET,
                    {expiresIn: '7d'}
                )
                
                // const {_id, email, name, role} = user;

                return res.json({
                    success: true, 
                    message: "login successfully", 
                    accessToken: token,
                    // user: {_id, name, email, role}
                });
            }
            else{
                console.log("đăng nhập lần đầu");
                const password = email+process.env.ACCESS_TOKEN_SECRET;
                const hashedPassword = await argon2.hash(password);


                const newUser = new userModel({
                    name: name,
                    password: hashedPassword,
                    accountType: "google",
                    email: email,
                    profilePicture: picture
                });
        
                await newUser.save();
        
                // return token dùng jwt
                const token = jwt.sign(
                    {userId: newUser._id}, 
                    process.env.ACCESS_TOKEN_SECRET
                )
                
                // const {_id, email, name, role} = newUser;

                return res.json({
                    success: true, 
                    message: "đăng nhập lần đầu thành công", 
                    // user: {_id, name, email, role},
                    accessToken: token
                });

            }
        }

    }catch(err){
        // in ra lỗi nếu server có vấn đề
        console.log(err);
        res.status(500).json({"success": false, "message": "Internal server error"});
    }
}





module.exports.updateUser = async (req, res)=>{
    // const {title, content, description, bigCategory, category, backgroundUrl, likes_count, comments_count} = req.body;

    // simple validation

    // tạo post mới và đẩy vào db
    try{

        const userUpdateCondition = {_id: req.useriId};


        // updatedPost = await PostModel.findOneAndUpdate(postUpdateCondition, updatedPost, {new: true});
        updatedUser = await userModel.findOneAndUpdate(userUpdateCondition, {$set: req.body}, {new: true});
        // Kiểm tra xem update có thành công không
        if(!updatedPost){
            // console.log("this case 1");
            res.status(401).json({"success": false, "message": "user not found or user is not autherized"})
        }
        
        // console.log("this case 2");
        res.json({success: true, message: "update successfully"});


    }catch(err){
        console.log(err);
        res.status(500).json({"success": false, "message": "Internal server error"});
    }   
}