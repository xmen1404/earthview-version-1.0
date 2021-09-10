import "../../styles/communityBody/communityBody.css";
import CommunityPosts from "../communityPosts/CommunityPosts";
import CommunitySubMenu from "../communitySubMenu/CommunitySubMenu";

import Background from "../../assets/theme/Background.png";

const CommunityBody = () => {
    return (
        <div className = "community-body" 
            style = {{background: `url(${Background}) no-repeat bottom center/cover`,}}
        >
            <CommunityPosts></CommunityPosts>
            <CommunitySubMenu></CommunitySubMenu>
        </div>
    )
}

export default CommunityBody;