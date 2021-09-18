import {useState, useContext, useEffect, useRef} from 'react';
import { PostLikeContext } from '../../contexts/PostLikeContext';
import { AuthContext } from "../../contexts/AuthContext";
import { ControllerContext } from '../../contexts/ControllerContext';

import "../../styles/postItem/postItem.css";
import Button from "../button/Button";
import heartIcon from "../../assets/communityPost-heart-icon.png"
import redHeartIcon from "../../assets/redHeart_icon.png"
import commentIcon from "../../assets/communityPost-comment-icon.png"
import shareIcon from "../../assets/communityPost-share-icon.png"
import UpBlackArrow from "../../assets/up_black_arrow.png";
import postBackground from "../../assets/Icon_5.jpg";
import RoundButton from '../roundbutton/RoundButton';
import cross_icon from "../../assets/cross_icon.png";
import bookmarkIcon from "../../assets/bookmark_icon.png";
import moment from 'moment';
import 'moment/locale/vi';
import CommentSection from "../commentSection/CommentSection";


const PostItem = (props) => {
    // console.log(props.data);
    const [openFullPost, setOpenFullPost] = useState(false);
    const [openComment, setOpenComment] = useState(false);
    const [loadOpenComment, setLoadOpenComment] = useState(false);
    const [postContainerClass, setPostContainerClass] = useState("post-container");

    const [currentlike, setCurrentLike] = useState(props.data.likes_count);
    const [isLike, setIsLike] = useState(false);

    const [currentComment, setCurrentComment] = useState(props.data.comments_count);

    const {authState: {isAuthenticated}, redirectToLogin} = useContext(AuthContext);
    const {likePost, unlikePost, checkLike} = useContext(PostLikeContext);

    const {displayFullPost, hideFullPost} = useContext(ControllerContext);

    // const myRef = useRef(null)

    // useEffect(() => {
    //     if(loadOpenComment) {
    //         marginTransition();
    //         setLoadOpenComment(!loadOpenComment);
    //     }
    // });

    useEffect(() => {
        checkPostLike();
    }, [props.data]);

    const checkPostLike = async () => {
        if(isAuthenticated && props.data){
            // console.log("checking...", props.data._id)

            const res = await checkLike(props.data._id);

            // console.log(res);

            if(res.data.success && res.data.isLike){
                setIsLike(true);
            }
        }
    }

    const OpenCommentSection = () => {
        // if(document.body.style.overflowY === "hidden"){
        //     document.body.style.overflowY = "scroll";
        // }
        // else{
        //     document.body.style.overflowY = "hidden";
        // }

        // setPostContainerClass("post-container leftAlign");

        if(!openFullPost){
            setOpenFullPost(true);
            displayFullPost();
        }

        // if(!openComment){
        //     // myRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        //     // window.scrollTo(1000, myRef.current.offsetTop);
        //     window.scrollTo({ behavior: 'smooth', top: myRef.current.offsetTop - 100 })
        // }
    
        setOpenComment(!openComment);

        // setLoadOpenComment(true);
    }

    const author = (timeData, textColor, showFollowButton, type) => {
        // const convertedTime = moment(timeData).fromNow();

        let followButton = (
            <div className = "follow">
                <Button 
                    content="Follow"
                    color="rgb(66, 113, 117)"
                    width="4.5rem"
                    height="1rem"
                    fontSize="1rem"
                    margin = "0"
                    border="2px solid rgb(66, 113, 117)"
                    paddingTop="0.15rem"
                    paddingBottom="0.25rem"
                    fontWeight = "550"
                    // handleClick={props.showLoginPanel}
                />
            </div>
        );
        if(!showFollowButton) {
            followButton = <div></div>;
        }

        return (
            <div className = "postitem-user"
                style = {type === 0 ? {
                    width: "100%"
                }:{
                    width: "100%"
                }}
            >
                <div className = "profilePicture"><img src = {props.data.user.profilePicture} alt = "profile-picture"></img></div>
                <div className = "user-name" style={{color:textColor}}>{props.data.user.name}</div>
                {followButton}
                {type === 0  &&
                    <div className = "createdAt"> {moment(timeData).fromNow()} </div>
                }
                {type === 1 &&
                    <div className = "createdAt"> {timeData} phút đọc </div>
                }
                {type === 2 &&
                    <div className = "createdAt"> {moment(timeData).fromNow()} </div>
                }
                
            </div>
        );
    }

    const switchOpenFullPost = () => {
        // if(document.body.style.overflowY === "hidden"){
        //     document.body.style.overflowY = "scroll";
        //     setPostContainerClass("post-container");
        // }
        // else{
        //     document.body.style.overflowY = "hidden";
        // }


        // if(openFullPost) {
        //     document.getElementById('post-container').style.transition = null;
        //     document.getElementById('post-container').style.marginLeft = null;
        //     if(openComment) 
        //         setOpenComment(false);
        // }

        if(openFullPost){
            setOpenComment(false);
            hideFullPost();
        }
        else{
            displayFullPost();
        }

        setOpenFullPost(!openFullPost);

        
    }

    const marginTransition = () => {
        // console.log(openComment, !openComment);
        // console.log(openComment);
        // setPostContainerClass("post-container");

        if(!openComment){
            document.getElementById('post-container').style.transition = "margin-left 0.5s linear 0s";
            document.getElementById('post-container').style.marginLeft = "0";
        } else {
            // document.getElementById('post-container').style.marginLeft = null;
            document.getElementById('post-container').style.transition = "margin-left 0.5s linear 0s";
            document.getElementById('post-container').style.marginLeft = "19vw";
        }
        setOpenComment(!openComment);
    }

    const likePostHandle = async () => {
        if(!isAuthenticated){
            // showLoginPanel();
            redirectToLogin();
            return;
        }

        if(isLike){
            const res = await unlikePost(props.data._id);

            if(res.data.success){
                setIsLike(false);
            }

            const data = {
                likes_count: -1
                // increment: -1
            }

            setCurrentLike(currentlike-1);

            await props.updatePostIncrement(props.data._id, data);
        }
        else{
            const res = await likePost(props.data._id);
            // console.log(res);
            if(res.data.success){
                setIsLike(true);
            }

            const data = {
                likes_count: 1
                // increment: 1
            }
            

            setCurrentLike(currentlike+1);

            await props.updatePostIncrement(props.data._id, data);
        }

        return;
    }


    const updateCommentCount = async () => {
        // const data = {
        //     ...props.data,
        //     comments_count: currentComment + 1,
        //     likes_count: currentlike
        // }


        const data = {
            // comments_count: currentComment + 1,
            comments_count: 1
        }

        // setCurrentLike(currentComment+1);
        // console.log("updating count...", currentComment);
        await props.updatePostIncrement(props.data._id, data);
    }

    const increaseCommentCount = () => {
        // console.log("hàm này chạy bình thường");
        setCurrentComment(currentComment+1);


        // return;
    }


    // const handleScrollPost = () => {
    //     console.log("scrolling");
    // }

    // window.onscroll = function() {
    //     if(openFullPost){
    //         scrollFunction()
    //     }
    // };

    // function scrollFunction() {

    //     const divId = "container-" + props.data._id;

    //     const element = document.getElementById(divId)
    //     var domRect = element.getBoundingClientRect();

    //     console.log(domRect.bottom , window.innerHeight);

    //     var spaceBelow = domRect.bottom - window.innerHeight;

    //     console.log("space", spaceBelow);

    //     if(spaceBelow < 0){
    //         // setOpenFullPost(false);
    //         // if(openComment){
    //         //     setOpenComment(false)
    //         // }
    //     }
    // }



    var userProfilePostItemFlexBasis = {
        background: `url(${props.data.backgroundUrl}) no-repeat center center/cover`,
        flexBasis: "100%"
    };
    if(!props.openUserProfile) {
        userProfilePostItemFlexBasis = {
            background: `url(${props.data.backgroundUrl}) no-repeat center center/cover`
        };
    }

    let closePost;

    const handlePostScroll = (event) => {
        if(openFullPost){
            // console.log("scrolling....");
            const target = event.target;
            
            // console.log("check", target.scrollHeight - target.scrollTop, target.clientHeight);

            if(target.scrollHeight - target.scrollTop - 3 < target.clientHeight){
                // console.log("reached bottom");

                clearTimeout(closePost);
                closePost = setTimeout(() => {
                    // console.log("closed");
                    switchOpenFullPost();
                }, 10000);
            }

            if(target.scrollHeight - target.scrollTop > target.clientHeight + 5 ){
                // console.log("closing");
                clearTimeout(closePost);
                // if(closePost){
                //     clearTimeout(closePost);
                // }
            }
        }
    }

    return (
        <div className = "community-postitem" onScroll = {(event) => {handlePostScroll(event)}}>
            {/* {author(props.data.createdAt, "black", true, props.openUserProfile ? 2 : 0)} */}
            {!props.openUserProfile && 
                <div className="tools">
                    {openFullPost &&
                        <div className="cancel">
                            <RoundButton 
                                content = "Thu nhỏ"
                                contentColor = "#000000"
                                background = {UpBlackArrow}
                                backgroundSize = "20%"
                                radius = "2.5rem"
                                backgroundColor = "#F5FFFFB2"
                                handleClick = {switchOpenFullPost}
                            ></RoundButton>
                        </div>
                    }

                    <div className="love">
                        <RoundButton 
                            content = {currentlike}
                            contentColor = "#000000"
                            background = {isLike? redHeartIcon: heartIcon}
                            radius = "2.5rem"
                            backgroundColor = "#F5FFFFB2"
                            handleClick = {likePostHandle}
                        ></RoundButton>
                    </div>
                    <div className="comment">
                        <RoundButton 
                            content = {currentComment}
                            contentColor = "#000000"
                            background = {commentIcon}
                            radius = "2.5rem"
                            backgroundColor = "#F5FFFFB2"
                            handleClick={OpenCommentSection}
                        ></RoundButton>
                    </div>
                    <div className="share">
                        <RoundButton 
                            content = "7"
                            contentColor = "#000000"
                            background = {shareIcon}
                            radius = "2.5rem"
                            backgroundColor = "#F5FFFFB2"
                        ></RoundButton>
                    </div>
                </div>
            }

            <div className = "postitem-content">
                {/* <div className="header">
                </div> */}
                {author(props.data.createdAt, "black", true, props.openUserProfile ? 2 : 0)}

                <div className="header">
                    <h3>{props.data.title}</h3>
                </div>

                <div className="body-container"> 
                    {!openFullPost &&
                        <div className="body" 
                            style = {userProfilePostItemFlexBasis}
                        >

                            <div className="description">
                                <div className="hastag">
                                    #{props.data.category.name} {props.data.bigCategory.name}
                                </div>

                                <div className="text">
                                    {props.data.description}
                                </div>

                                <div>
                                    <Button 
                                        content="Đọc tiếp"
                                        color="white"
                                        width="6rem"
                                        height="1.7rem"
                                        fontSize="15px"
                                        margin = "3rem auto 0 auto"
                                        border="1.2px solid white"
                                        paddingTop="0.15rem"
                                        paddingBottom="0.25rem"
                                        fontWeight = "550"
                                        handleClick={switchOpenFullPost}
                                    />
                                </div>
                            </div>
                            {/* <div className="end-line"></div> */}
                        </div>
                    }   


                    {openFullPost && 
                        <div className="full-body">
                            <div className="text" style = {{whiteSpace: "pre-wrap"}}>
                                {props.data.content}
                            </div>
                            {/* <div className="author">
                            {author("7 phút đọc", "rgb(41, 94, 98)")}
                            </div>
                            <div className="body">
                                <div className="text" style = {{whiteSpace: "pre-wrap"}}>
                                    {props.data.content}
                                </div>
                            </div> */}

                            <Button 
                                content="Lưu bài viết"
                                color="#000000"
                                width="9rem"
                                height="1.75rem"
                                fontSize="1rem"
                                margin = "3rem 0"
                                border="2px solid #000000"
                                paddingTop="0.15rem"
                                paddingBottom="0.35rem"
                                fontWeight = "550"
                                // handleClick={props.showLoginPanel}
                            />

                            <div className="end-line"></div>
                            <div className="end-author">
                                <div className="postitem-user">
                                    <div className = "profilePicture"><img src = {props.data.user.profilePicture} alt = "profile-picture"></img></div>
                                    <div className = "user-name">{props.data.user.name}</div>
                                    <div className = "follow">
                                        <Button 
                                            content="Follow"
                                            color="rgb(66, 113, 117)"
                                            width="4.5rem"
                                            height="1rem"
                                            fontSize="1rem"
                                            margin = "0"
                                            border="2px solid rgb(66, 113, 117)"
                                            paddingTop="0.15rem"
                                            paddingBottom="0.25rem"
                                            fontWeight = "550"
                                            // handleClick={props.showLoginPanel}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    }                 
                </div>
            </div>

            {/* {openComment && 
                <div id="commentSection" className = {openComment ? "show": undefined}>
                    <CommentSection increaseCommentCount = {increaseCommentCount}  updateCommentCount = {updateCommentCount} postId = {props.data._id} />
                </div>
            } */}

            <div id="commentSection" className = {openComment ? "comment-show": "comment-hide"}>
                <CommentSection increaseCommentCount = {increaseCommentCount}  updateCommentCount = {updateCommentCount} postId = {props.data._id} />
            </div>
        </div>
    );


    // if(!openFullPost) {
    //     var userProfilePostItemFlexBasis = {
    //         background: `url(${props.data.backgroundUrl}) no-repeat center center/cover`,
    //         flexBasis: "100%"
    //     };
    //     if(!props.openUserProfile) {
    //         userProfilePostItemFlexBasis = {
    //             background: `url(${props.data.backgroundUrl}) no-repeat center center/cover`
    //         };
    //     }

    //     return (
    //         <div className = "community-postitem">
    //             {/* {author(props.data.createdAt, "black", true, props.openUserProfile ? 2 : 0)} */}
    //             {!props.openUserProfile && 
    //                 <div className="tools">
    //                     <div className="love">
    //                         <RoundButton 
    //                             content = {currentlike}
    //                             contentColor = "#000000"
    //                             background = {isLike? redHeartIcon: heartIcon}
    //                             radius = "2.5rem"
    //                             backgroundColor = "#F5FFFFB2"
    //                             handleClick = {likePostHandle}
    //                         ></RoundButton>
    //                     </div>
    //                     <div className="comment">
    //                         <RoundButton 
    //                             content = {currentComment}
    //                             contentColor = "#000000"
    //                             background = {commentIcon}
    //                             radius = "2.5rem"
    //                             backgroundColor = "#F5FFFFB2"
    //                             handleClick={outsideOpenCommentSection}
    //                         ></RoundButton>
    //                     </div>
    //                     <div className="share">
    //                         <RoundButton 
    //                             content = "7"
    //                             contentColor = "#000000"
    //                             background = {shareIcon}
    //                             radius = "2.5rem"
    //                             backgroundColor = "#F5FFFFB2"
    //                         ></RoundButton>
    //                     </div>
    //                 </div>
    //             }
    //             <div className = "postitem-content">
    //                 {/* <div className="header">
    //                 </div> */}
    //                 {author(props.data.createdAt, "black", true, props.openUserProfile ? 2 : 0)}

    //                 <div className="header">
    //                     <h3>{props.data.title}</h3>
    //                 </div>

    //                 <div className="body-container"> 
    //                     <div className="body" 
    //                         style = {userProfilePostItemFlexBasis}>

    //                         <div className="description">
    //                             <div className="hastag">
    //                                 #{props.data.category.name} {props.data.bigCategory.name}
    //                             </div>

    //                             <div className="text">
    //                                 {props.data.description}
    //                             </div>

    //                             <div>
    //                                 <Button 
    //                                     content="Đọc tiếp"
    //                                     color="white"
    //                                     width="6rem"
    //                                     height="1.7rem"
    //                                     fontSize="15px"
    //                                     margin = "3rem auto 0 auto"
    //                                     border="1.2px solid white"
    //                                     paddingTop="0.15rem"
    //                                     paddingBottom="0.25rem"
    //                                     fontWeight = "550"
    //                                     handleClick={switchOpenFullPost}
    //                                 />
    //                             </div>
    //                         </div>
    //                         <div className="end-line"></div>
    //                     </div>                        
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // } else return (
    //     <div className="outmost-container"
    //         style = {{background: `url(${props.data.backgroundUrl}) no-repeat center center/cover`}}
    //     >
    //         <div className="background">   
    //         </div>
    //         <div className= {postContainerClass} id="post-container">
    //             <div className="left-tools"></div>
    //             <div className="post">
    //                 <div className="post-content">
    //                     <div className="header">
    //                         <h3>{props.data.title}</h3>
    //                     </div>
    //                     <div className="author">
    //                     {author(Math.ceil(props.data.content.trim().split(" ").length/3/60), "rgb(41, 94, 98)", false, 1)}
    //                     </div>
    //                     <div className="body">
    //                         <div className="text" style = {{whiteSpace: "pre-wrap"}}>
    //                             {props.data.content}
    //                         </div>
    //                         {/* <div className="author">
    //                         {author("7 phút đọc", "rgb(41, 94, 98)")}
    //                         </div>
    //                         <div className="body">
    //                             <div className="text" style = {{whiteSpace: "pre-wrap"}}>
    //                                 {props.data.content}
    //                             </div>
    //                         </div> */}
    //                         <div className="end-line"></div>
    //                         <div className="end-author">
    //                             <div className="postitem-user">
    //                                 <div className = "profilePicture"><img src = {props.data.user.profilePicture} alt = "profile-picture"></img></div>
    //                                 <div className = "user-name">{props.data.user.name}</div>
    //                                 <div className = "follow">
    //                                     <Button 
    //                                         content="Follow"
    //                                         color="rgb(66, 113, 117)"
    //                                         width="4.5rem"
    //                                         height="1rem"
    //                                         fontSize="1rem"
    //                                         margin = "0"
    //                                         border="2px solid rgb(66, 113, 117)"
    //                                         paddingTop="0.15rem"
    //                                         paddingBottom="0.25rem"
    //                                         fontWeight = "550"
    //                                         // handleClick={props.showLoginPanel}
    //                                     />
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //             <div className="right-tools">
    //                 <div className="close-post">
    //                     <RoundButton 
    //                         content = "Thoát"
    //                         contentColor = "rgba(255, 255, 255, 0.85)"
    //                         background = {cross_icon}
    //                         radius = "2.5rem"
    //                         handleClick = {switchOpenFullPost}
    //                         backgroundColor = "rgba(238, 238, 238, 0.8)"
    //                     ></RoundButton>
    //                 </div>
    //                 <div className="save-post">
    //                     <RoundButton 
    //                         content = "Lưu bài"
    //                         contentColor = "rgba(255, 255, 255, 0.85)"
    //                         background = {bookmarkIcon}
    //                         radius = "2.5rem"
    //                         backgroundColor = "rgba(238, 238, 238, 0.8)"
    //                     ></RoundButton>
    //                 </div>
    //                 <div className="love">
    //                     <RoundButton 
    //                         content = {currentlike}
    //                         contentColor = "rgba(255, 255, 255, 0.85)"
    //                         background = {isLike? redHeartIcon: heartIcon}
    //                         radius = "2.5rem"
    //                         backgroundColor = "rgba(238, 238, 238, 0.8)"
    //                         handleClick = {likePostHandle}
    //                     ></RoundButton>
    //                 </div>
    //                 <div className="comment">
    //                     <RoundButton 
    //                         content = {currentComment}
    //                         contentColor = "rgba(255, 255, 255, 0.85)"
    //                         background = {commentIcon}
    //                         radius = "2.5rem"
    //                         backgroundColor = "rgba(238, 238, 238, 0.8)"
    //                         handleClick={marginTransition}
    //                     ></RoundButton>
    //                 </div>
    //                 <div className="share">
    //                     <RoundButton 
    //                         content = "7"
    //                         contentColor = "rgba(255, 255, 255, 0.85)"
    //                         background = {shareIcon}
    //                         radius = "2.5rem"
    //                         backgroundColor = "rgba(238, 238, 238, 0.8)"
    //                     ></RoundButton>
    //                 </div>
    //             </div>
    //         </div>
    //         {openComment && 
    //             <div id="commentSection">
    //                 <CommentSection increaseCommentCount = {increaseCommentCount}  updateCommentCount = {updateCommentCount} postId = {props.data._id} />
    //             </div>
    //         }
    //     </div>
    // );
}

export default PostItem;