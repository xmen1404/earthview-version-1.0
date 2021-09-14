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


// const host = "http://localhost:5000";

const CommentItem = (props) => {
    // const socketRef = useRef();
    // console.log("comment item", props.data);
    const [currentlike, setCurrentLike] = useState(props.data.likes_count);
    const [isLike, setIsLike] = useState(false);
    const [commentLevel2, setCommentLevel2] = useState(false);
    const {authState: {isAuthenticated}, redirectToLogin} = useContext(AuthContext);
    const {likeComment, unlikeComment, checkLike} = useContext(CommentLikeContext);

    const openCommentLevel2 = () => {
        setCommentLevel2(!commentLevel2);
    } 

    useEffect(() => {
        // console.log("bị reset");
        checkCommentLike();
    }, [props.data]);


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


    return (
        <div className="commentItem-container">
            <div className = "profilePicture"><img src = {props.data.user.profilePicture} alt = "profile-picture"></img></div>
            <div className="background-container">
                <div className="margin-container">
                    <div className="comment-header">
                        <span className="comment-author">{props.data.user.name}</span>
                        <span className="comment-time">{moment(props.data.createdAt).fromNow()}</span>
                    </div>
                    <div className="comment-body">{props.data.content}</div>
                    <div className="comment-interaction">
                        <div className="love-button">
                            <img onClick = {likeCommentHandle} src={isLike? redHeartIcon: heartIcon}></img>
                            <div className="love-count">{currentlike}</div>
                        </div>
                        <div className="reply">
                            <div className="text">Phản Hồi</div>
                            {!commentLevel2 && 
                                <div className="comment-lv2" onClick={openCommentLevel2}>Xem 2 câu trả lời</div>
                            }
                            {commentLevel2 && 
                                <div className="comment-lv2" onClick={openCommentLevel2}>Ẩn 2 câu trả lời</div>
                            }
                        </div>
                    </div>
                    {commentLevel2 &&
                        <div className="comment-lv2-list">
                            <CommentItemLevel2 data={props.data}></CommentItemLevel2>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default CommentItem;