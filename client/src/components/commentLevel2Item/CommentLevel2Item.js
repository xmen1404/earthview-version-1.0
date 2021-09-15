import {useState, useContext, useEffect, useRef} from 'react';
import { CommentLikeContext } from '../../contexts/CommentLikeContext';
import { AuthContext } from "../../contexts/AuthContext";
import socketIOClient from "socket.io-client";
import "../../styles/commentLevel2Item/CommentLevel2Item.css";
// import tempProfilePicture from "../../assets/Icon_2.jpg";
import heartIcon from "../../assets/communityPost-heart-icon.png";
import redHeartIcon from "../../assets/redHeart_icon.png"
import moment from 'moment';
import 'moment/locale/vi';


const CommentLevel2Item = (props) => {
    const [currentlike, setCurrentLike] = useState(props.data.likes_count);
    const [isLike, setIsLike] = useState(false);

    const {authState: {isAuthenticated, user}, redirectToLogin} = useContext(AuthContext);
    const {likeComment, unlikeComment, checkLike} = useContext(CommentLikeContext);

    
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
        // console.log("bị reset");
        checkCommentLike();
    }, [props.data]);


    const checkCommentLike = async () => {
        if(isAuthenticated && props.data){
            // console.log("checking...", props.data)

            const res = await checkLike(props.data._id);

            // console.log("checking like res", res);

            if(res.data.success && res.data.isLike){
                setIsLike(true);
            }
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

    return (
        <div className="lv2-commentItem-container">
            <div className = "lv2-profilePicture"><img src = {props.data.user.profilePicture} alt = "lv2-profile-picture"></img></div>
            <div className="lv2-background-container">
                <div className="lv2-margin-container">
                    <div className="lv2-comment-header">
                        <span className="lv2-comment-author">{props.data.user.name}</span>
                        <span className="lv2-comment-time">{moment(props.data.createdAt).fromNow()}</span>
                    </div>
                    <div className="lv2-comment-body">{props.data.content}</div>
                    <div className="lv2-comment-interaction">
                        <div className="lv2-love-button">
                            <img onClick = {likeCommentHandle} src={isLike? redHeartIcon: heartIcon}></img>
                            <div className="lv2-love-count">{currentlike}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommentLevel2Item;