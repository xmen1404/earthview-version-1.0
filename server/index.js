require('dotenv').config();
const express = require('express');
const multer = require('multer');

const app = express();
const PORT = 5000;

const cors = require('cors');
const morgan = require('morgan');
const {authPage} = require('./middleware/page');

const connectDB = require('./database/db');
connectDB();

const userRoute = require('./routes/auth.route');
const postRoute = require('./routes/post.route');
const postLikeRoute = require('./routes/postLike.route');
const postCommentRoute = require('./routes/postComment.route');
const commentLikeRoute = require('./routes/commentLike.route');
const categoryRoute = require('./routes/category.route');
const bigCategoryRoute = require('./routes/bigCategory.route');
const seriesRoute = require('./routes/series.route');
const newsRoute = require('./routes/news.route');
const uploadsRoute = require('./routes/uploads.route');
const typeRoute = require('./routes/type.route');

//CREATE EXPRESS APP
app.use(express.json()); // đọc được bất cứ thứ gì gửi trong body (trong req body)
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("uploads"));

app.get('/', (req, res)=>{
    res.send("hello world");
});

app.use('/admin', authPage(['Admin']), (req,res) => {
    console.log("testing route admin");
});

app.use('/post', authPage(['Admin', 'Contributor']), (req,res) => {

});

app.use('/api/auth', userRoute);

app.use('/api/posts', postRoute);

app.use('/api/postLike', postLikeRoute);

app.use('/api/postComment', postCommentRoute);

app.use('/api/commentLike', commentLikeRoute);

app.use('/api/categories', categoryRoute);

app.use('/api/bigcategories', bigCategoryRoute);

app.use('/api/series', seriesRoute);

app.use('/api/types', typeRoute);

app.use('/api/news', newsRoute);

app.use('/api/uploads', uploadsRoute);


const http = require("http");

// const server = require("http").Server(app);
const server = http.createServer(app);

// const io = require("socket.io")(server);
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    }
}); 

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})

// app.listen(PORT, ()=>{
//     console.log(`Server started on port ${PORT}`);
// });

io.on("connection", (socket) => {
    console.log("Có người kết nối:", socket.id);

    socket.on("ClientJoinPost", (postId) => {
        // console.log("joining post " + postId);
        socket.join(postId);
        socket.postId = postId;
    })

    socket.on("ClientSendServer", (comment) => {
        // console.log("client send: " + comment);
        io.sockets.in(socket.postId).emit("ServerSendClient", comment);
    })


    socket.on("ClientJoinComment", (commentId) => {
        // console.log("joining comment " + commentId);
        socket.join(commentId);
        socket.commentId = commentId;
    })

    socket.on("ClientSendServer-comment", (type, commentId) => {
        console.log("client send commentId: ", type, commentId);
        io.sockets.in(socket.postId).emit("ServerSendClient-comment", type, commentId);
    })





    socket.on("disconnect", () => {
        // console.log(socket.id + " had left");
    })
})