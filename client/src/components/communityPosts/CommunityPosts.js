import "../../styles/communityPosts/communityPosts.css";
import PostItem from "../postItem/PostItem";
import { useContext, useEffect } from "react";
import { PostContext } from "../../contexts/PostContext";

const CommunityPosts = () => {
    
    // code lấy data về => map
    const {postState: {postLoading,  posts}, getAllPosts, updatePostIncrement} = useContext(PostContext);

    useEffect(() => {
        getAllPosts();
        // console.log("getting post");
    }, [])

    return <div className = "community-posts">
        {/* container */}
        {
            posts.map((post) => {
                return <PostItem key = {post._id} 
                data = {post} 
                updatePostIncrement = {updatePostIncrement} openUserProfile={false}
                ></PostItem>
            })
        }
    </div>
}

export default CommunityPosts;