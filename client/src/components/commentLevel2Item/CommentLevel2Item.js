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
                            <img src={heartIcon}></img>
                            <div className="lv2-love-count">12</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommentLevel2Item;