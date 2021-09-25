import "../../styles/commentSection/CommentSection.css";
// import io from 'socket.io-client';
import {useState, useRef, useEffect, usseContext, useContext } from "react";
import socketIOClient from "socket.io-client";
import tempProfilePicture from "../../assets/Icon_2.jpg";
import emojiIcon from "../../assets/emoji-icon.png";
import libraryIcon from "../../assets/library-icon.png";
import CommentItem from "../commentItem/CommentItem";
import { PostCommentContext } from "../../contexts/PostCommentContext";
import { AuthContext } from "../../contexts/AuthContext";
import {apiUrl, LOCAL_STORAGE_TOKEN_NAME} from '../../contexts/constants';
import axios from 'axios';
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';
import { checkText } from 'smile2emoji'

const host = "http://localhost:5000";

// const socket = io("http://localhost:5000");


const CommentSection = (props) => {
    // const socket = io("http://localhost:5000");
    // const socketRef = useRef();

    const [commentList, setCommentList] = useState([]);
    const [content, setContent] = useState("")
    const [commentImages, setCommentImages] = useState([]);
    const [openEmojiPanel, setOpenEmojiPanel] = useState(false);

    const {commentPost, getPostComment, deleteComment, updateComment} = useContext(PostCommentContext);
    const {authState: {isAuthenticated, user}, redirectToLogin} = useContext(AuthContext);

    const [socket, setSocket] = useState(null);

    useEffect(() => {
        async function getAllComment() {
            const res = await getPostComment(props.postId);
            // console.log("debug comment list", res);    
            setCommentList(res.data.comments);
        }
        
        getAllComment();
    }, [])

    useEffect(() => {
        // socketRef.current = io.connect(host)
        // socketRef.current = socketIOClient.connect(host);

        const newSocket = socketIOClient.connect(host);
        setSocket(newSocket);

        // console.log("debug id ngoài", socketRef.current);

        // socketRef.current.emit("ClientJoinPost", props.postId)
        newSocket.emit("ClientJoinPost", props.postId)

        // socketRef.current.on("ServerSendClient", (comment) => {
        //     console.log("sent from server: " + comment);
        //     // document.getElementById("comment-abcd").innerHTML =
        //     // `<div>sent from server ${message}</div>`;
        //     setCommentList(curComments => [comment, ...curComments]);
        //     props.increaseCommentCount();

        //     // return;
        // })


        newSocket.on("ServerSendClient", (comment) => {
            // console.log("sent from server: " + comment);
            // document.getElementById("comment-abcd").innerHTML =
            // `<div>sent from server ${message}</div>`;
            setCommentList(curComments => [comment, ...curComments]);
            props.increaseCommentCount();

            // return;
        })

        return () => {
            // socketRef.current.disconnect();
            newSocket.disconnect();
        };

    }, [props.increaseCommentCount, setSocket]);

    // const sendMessage = () => {
    //     console.log("sending message...");
    //     socketRef.current.emit("ClientSendServer", "hello");
    // }


    const handleChange = (event) => {
        // console.log(event.target.value);
        setContent(checkText(event.target.value));
    }

    const onEmojiClick = (event, emojiObject) => {
        setContent(content + emojiObject.emoji);
    };

    const handleOnKeyDown = (event) => {
        if (event.keyCode === 13) {
            // console.log('enter');
            submitComment();
        }
    }

    const submitComment = async () => {

        if(!isAuthenticated){
            // console.log("hello");
            // showLoginPanel();
            redirectToLogin();
            return;
        }


        const data = {
            content: content,
            images: commentImages
        }

        const res = await commentPost(props.postId, data);


        if(res.data.success){
            // window.location.href = '/'; 
            // console.log("success");
            await props.updateCommentCount();
            // socketRef.current.emit("ClientSendServer", res.data.comment);
            socket.emit("ClientSendServer", res.data.comment);

            setContent("");
            setCommentImages([]);

            return;
        }

        return;

        // setContent("");
    }



    const handleChangeCommentImages = async (event) => {
        try{

            // console.log("hello");

            const url = apiUrl + '/uploads';
            // const header = "Bearer " + localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)

            const formData = new FormData();

            formData.append("file", event.target.files[0]);

            const res = await axios.post(url, formData);

            // console.log("check res", res.data.url);

            setCommentImages(curCommentImages => [...curCommentImages, res.data.url])

            // return(list);

        }catch(err){
            console.log(err);
        }
    }

    const showEmojiPanel = () => {
        setOpenEmojiPanel(!openEmojiPanel);
    }

    return (
        <div className="comment-container">
            <div className="inner-container">

                {isAuthenticated && 
                    <section className="post-comment">
                        <div className = "profilePicture"><img src = {user.profilePicture} alt = "profile-picture"></img></div>
                        <div className="input-comment">
                            <div className="text-input">
                                <input 
                                    type="text" 
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
                                    <input type="file" name="file" onChange={handleChangeCommentImages} id={"comment-file-button-" + props.postId} style={{display:"none"}}/>
                                    <label for={"comment-file-button-" + props.postId}>
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


                {!isAuthenticated && 
                    <section className="post-comment">
                        <div className = "profilePicture"><img src = {tempProfilePicture} alt = "profile-picture"></img></div>
                        <div className="input-comment">
                            <div className="text-input">
                                <input 
                                    type="text" 
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
                                    <input type="file" name="file" onChange={handleChangeCommentImages} id={"comment-file-button-" + props.postId} style={{display:"none"}}/>
                                    <label for={"comment-file-button-" + props.postId}>
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


                <section className="comment-list">
                    {/* map comment list from data */}
                    {commentList && socket && commentList.map((comment) => {
                        return <CommentItem key = {comment._id} postId = {props.postId} updateComment = {updateComment} socket = {socket} data = {comment}/>
                    })}
                    
                </section>
            </div>
        </div>
    );
}

export default CommentSection;