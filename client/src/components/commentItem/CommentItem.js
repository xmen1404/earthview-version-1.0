import {useState, useContext, useEffect, useRef} from 'react';
import { CommentLikeContext } from '../../contexts/CommentLikeContext';
import { AuthContext } from "../../contexts/AuthContext";
import socketIOClient from "socket.io-client";
import "../../styles/commentItem/CommentItem.css";
// import tempProfilePicture from "../../assets/Icon_2.jpg";
import heartIcon from "../../assets/communityPost-heart-icon.png";
import redHeartIcon from "../../assets/redHeart_icon.png"
import moment from 'moment';
import 'moment/locale/vi';
import CommentItemLevel2 from "../commentLevel2Item/CommentLevel2Item";
import tempProfilePicture from "../../assets/Icon_2.jpg";
import emojiIcon from "../../assets/emoji-icon.png";
import libraryIcon from "../../assets/library-icon.png";
import { PostCommentContext } from "../../contexts/PostCommentContext";
import {apiUrl, LOCAL_STORAGE_TOKEN_NAME} from '../../contexts/constants';
import axios from 'axios';
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';
import { checkText } from 'smile2emoji'

// const host = "http://localhost:5000";

const CommentItem = (props) => {
    // const socketRef = useRef();
    // console.log("comment item", props.data);
    const [currentlike, setCurrentLike] = useState(props.data.likes_count);
    const [isLike, setIsLike] = useState(false);
    const [commentLevel2, setCommentLevel2] = useState(false);
    const [replyComment, setReplyComment] = useState(false);
    const [content, setContent] = useState("");
    const [replyList, setReplyList] = useState([]);
    const [commentImages, setCommentImages] = useState([]);
    const [openEmojiPanel, setOpenEmojiPanel] = useState(false);

    const {authState: {isAuthenticated, user}, redirectToLogin} = useContext(AuthContext);
    const {likeComment, unlikeComment, checkLike} = useContext(CommentLikeContext);

    const {repliesComment, getCommentReplies, deleteComment, updateComment} = useContext(PostCommentContext);
    

    const openCommentLevel2 = async () => {

        if(replyComment){
            setReplyComment(false);
        }
        
        if(commentLevel2){
            setCommentLevel2(false);
            await getAllReplies();
        }
        else{
            setCommentLevel2(true);
        }

        // if(replyComment){
        //     setReplyComment(false);
        // }

        // setCommentLevel2(!commentLevel2);
    } 

    useEffect(() => {
        // console.log("bị reset");
        checkCommentLike();
    }, [props.data]);


    const getAllReplies = async () => {
        const res = await getCommentReplies(props.postId, props.data._id);
        // console.log("debug comment list", res);    

        setReplyList(res.data.replyComments);
    }


    useEffect(() => {
        // async function getAllReplies() {
        //     const res = await getCommentReplies(props.postId, props.data._id);
        //     // console.log("debug comment list", res);    

        //     setReplyList(res.data.replyComments);
        // }
        
        getAllReplies();
    }, [])


    useEffect(() => {
        props.socket.on("ServerSendClient-comment", (type, commentId) => {
            // console.log("sent from server:", currentlike);
            // console.log("check type", type)
            if(commentId === props.data._id){
                // console.log("sent from server:", currentlike);
                // console.log("check type", type)
                // console.log("debug currentlike", currentlike)
                if(type === 0){
                    setCurrentLike(currentlike - 1);
                    // setIsLike(false);
                }
                else if(type === 1){
                    setCurrentLike(currentlike + 1);
                    // setIsLike(true);
                }
            }  
        })
    },[props.socket, currentlike]);


    useEffect(() => {
        props.socket.on("ServerSendClient-reply", (commentId, reply) => {
            if(commentId === props.data._id){
                setReplyList(curReplies => [...curReplies, reply]);
            }
            // return;
        })
    }, [props.socket, setReplyList]);

    
    const checkCommentLike = async () => {
        if(isAuthenticated && props.data){
            // console.log("checking...", props.data)

            const res = await checkLike(props.data._id);

            // console.log("checking like res", res);

            if(res.data.success && res.data.isLike){
                setIsLike(true);
            }
            // else{
            //     console.log("chắc là đây?", currentlike, isLike);
            //     console.log(props.data);
            //     setCurrentLike(props.data.likes_count);
            //     setIsLike(false);
            // }
        }
    }

    const likeCommentHandle = async () => {
        if(!isAuthenticated){
            // console.log("hello");
            // showLoginPanel();
            redirectToLogin();
            return;
        }

        if(isLike){
            const res = await unlikeComment(props.data._id);
            // console.log("debug like", res);
            if(res.data.success){
                // setIsLike(false);

                const data = {
                    likes_count: currentlike - 1
                }
    
                await props.updateComment(props.data._id, data);
    
                props.socket.emit("ClientSendServer-comment", 0, props.data._id)
                setIsLike(false);
            }
        }
        else{
            const res = await likeComment(props.data._id);
            console.log("test like", res);
            if(res.data.success){
                // setIsLike(true);
                const data = {
                    likes_count: currentlike + 1
                }
    
                // setCurrentLike(currentlike+1);
    
                await props.updateComment(props.data._id, data);
                
                // console.log("chạy chỗ này", props.socket.current);

                props.socket.emit("ClientSendServer-comment", 1, props.data._id)
                setIsLike(true);
            }

        }

        return;
    } 



    // props.socket.current.on("ServerSendClient-comment", (type, commentId) => {
    //     console.log("nhận đc từ server rồi");
    //     if(commentId === props.data._id){
    //         if(type === 0){
    //             setCurrentLike(currentlike - 1);
    //             // setIsLike(false);
    //         }
    //         else if(type === 1){
    //             setCurrentLike(currentlike + 1);
    //             // setIsLike(true);
    //         }
    //     }  
    // })


    const reply = () => {
        setCommentLevel2(true);
        setReplyComment(true);

        // document.getElementById("replyInput").focus();
    }

    useEffect(() => {
        if(replyComment){
            document.getElementById("replyInput").focus();
        }
    }, [replyComment]);



    const handleChange = (event) => {
        // console.log(event.target.value);
        setContent(checkText(event.target.value));
    }

    const onEmojiClick = (event, emojiObject) => {
        setContent(content + emojiObject.emoji);
    };


    const handleChangeCommentImages = async (event) => {
        try{

            console.log("hello");

            const url = apiUrl + '/uploads';
            // const header = "Bearer " + localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)

            const formData = new FormData();

            formData.append("file", event.target.files[0]);

            const res = await axios.post(url, formData);

            console.log("check res", res.data.url);

            setCommentImages(curCommentImages => [...curCommentImages, res.data.url])

            // return(list);

        }catch(err){
            console.log(err);
        }
    }

    const showEmojiPanel = () => {
        setOpenEmojiPanel(!openEmojiPanel);
    }


    const handleOnKeyDown = (event) => {
        if (event.keyCode === 13) {
            // console.log('enter');
            submitComment();
        }
    }

    const submitComment = async () => {

        if(!isAuthenticated){
            console.log("hello");
            // showLoginPanel();
            redirectToLogin();
            return;
        }


        const data = {
            content: content,
            images: commentImages
        }

        console.log("start sending...", data);

        const res = await repliesComment(props.postId, props.data._id, data);


        if(res.data.success){
            // window.location.href = '/'; 
            // console.log("success");
            // await props.updateCommentCount();
            // socketRef.current.emit("ClientSendServer", res.data.comment);
            props.socket.emit("ClientSendServer-reply", props.data._id, res.data.comment);

            setContent("");
            setCommentImages([]);

            return;
        }

        return;

        // setContent("");
    }


    return (
        <div className="commentItem-container">
            <div className = "profilePicture"><img src = {props.data.user.profilePicture} alt = "profile-picture"></img></div>
            <div className="background-container">
                <div className="margin-container">
                    <div className="comment-header">
                        <span className="comment-author">{props.data.user.name}</span>
                        <span className="comment-time">{moment(props.data.createdAt).fromNow()}</span>
                    </div>
                    <div className="comment-body">
                        {props.data.content}
                        {props.data.images && 
                            <div className = "comment-images">
                                {props.data.images.map((image) => {
                                    return <img src = {image} alt = "commentImage"></img>
                                })}
                            </div>
                        }
                    </div>
                    <div className="comment-interaction">
                        <div className="love-button">
                            <img onClick = {likeCommentHandle} src={isLike? redHeartIcon: heartIcon}></img>
                            <div className="love-count">{currentlike}</div>
                        </div>
                        <div className="reply">
                            <div className="text" onClick = {reply}>Phản Hồi</div>
                            {!commentLevel2 && (replyList.length > 0) &&
                                <div className="comment-lv2" onClick={openCommentLevel2}>Xem {replyList.length} câu trả lời</div>
                            }
                            {commentLevel2 && (replyList.length > 0) &&
                                <div className="comment-lv2" onClick={openCommentLevel2}>Ẩn {replyList.length} câu trả lời</div>
                            }
                        </div>
                    </div>
                    {commentLevel2 &&
                        <div className="comment-lv2-list">
                            {/* <CommentItemLevel2 data={props.data}></CommentItemLevel2> */}
                            {replyList && replyList.map((comment) => {
                                return <CommentItemLevel2 
                                            key = {comment._id} 
                                            updateComment = {props.updateComment} 
                                            socket = {props.socket} 
                                            data = {comment}
                                        ></CommentItemLevel2>
                            })}
                        </div>
                    }

                    {replyComment && 
                        <section className="post-comment">
                            <div className = "profilePicture"><img src = {user.profilePicture} alt = "profile-picture"></img></div>
                            <div className="input-comment">
                                <div className="text-input">
                                    <input 
                                        type="text" 
                                        id = "replyInput"
                                        placeholder="Chia sẻ cảm nghĩ của bạn ..." 
                                        value = {content} 
                                        onChange = {(event) => handleChange(event)}
                                        onKeyDown={(e) => handleOnKeyDown(e)}
                                    ></input>

                                    {/* <textarea
                                        placeholder="Chia sẻ cảm nghĩ của bạn ..." 
                                        value = {content} 
                                        onChange = {(event) => handleChange(event)}
                                        onKeyDown={(e) => handleOnKeyDown(e)}
                                    ></textarea> */}

                                    <div className="emoji-input">
                                        <img src={emojiIcon} onClick = {showEmojiPanel}></img>
                                    </div>

                                    <div className="picture-input">
                                        <input type="file" name="file" onChange={handleChangeCommentImages} id={"commentReply-file-button-" + props.postId} style={{display:"none"}}/>
                                        <label for={"commentReply-file-button-" + props.postId}>
                                            <div>
                                                <img src = {libraryIcon} style = {{width: "90%"}} alt = "add_images"/>
                                            </div>
                                        </label>
                                        {/* <img src={libraryIcon}></img> */}
                                    </div>

                                    {openEmojiPanel &&
                                        <div className = "emoji-panel">
                                            <Picker
                                                onEmojiClick={onEmojiClick}
                                                // pickerStyle={{ height: '50%' }}
                                                // disableAutoFocus={false}
                                                // skinTone={SKIN_TONE_MEDIUM_DARK}
                                                // groupNames={{ smileys_people: 'PEOPLE' }}
                                                // native
                                            />
                                        </div>
                                    }
                                </div>

                                {commentImages.length > 0 &&
                                    <div className = "comment-images">
                                        {commentImages.map((image) => {
                                            return <img src = {image} alt = "commentImage"></img>
                                        })}
                                    </div>
                                }
                            </div>
                        </section>
                    }
                </div>
            </div>
        </div>
    );
}

export default CommentItem;