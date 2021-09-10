import "../../styles/postSummaryItem/postSummaryItem.css";
import React, { useState, useContext } from "react";
import wallDemo from "../../assets/EarthView's Story Background (Unsplash).jpg";
import heartIcon from "../../assets/PostSummaryItem-heartIcon.png";
import commentIcon from "../../assets/PostSummaryItem-commentIcon.png";
import shareIcon from "../../assets/PostSummaryItem-shareIcon.png";

const PostSummaryItem = (props) => {
    return(
        <div className="post-summary-container">
            <div className="postSummaryItem-background">
                <img src={wallDemo}></img> 
                {/* change src into data.img */}
            </div>

            <div className="postSummaryItem">
                <div className="summary-background">
                </div>
                <div className="postSummaryItem-content">
                    <div className="postSummaryItem-data">
                        <img src={heartIcon}></img> 
                        <div className="postSummaryItem-text">{props.data.heart}</div>
                    </div>
                    <div className="postSummaryItem-data">
                        <img src={commentIcon}></img>
                        <div className="postSummaryItem-text">{props.data.comment}</div>  
                    </div>
                    <div className="postSummaryItem-data">
                        <img src={shareIcon}></img>
                        <div className="postSummaryItem-text">{props.data.share}</div>  
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostSummaryItem;