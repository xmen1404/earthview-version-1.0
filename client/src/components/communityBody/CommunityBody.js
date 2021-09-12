import "../../styles/communityBody/communityBody.css";
import CommunityPosts from "../communityPosts/CommunityPosts";
// import CommunitySubMenu from "../communitySubMenu/CommunitySubMenu";
import CommunityTools from "../communityTools/CommunityTools";

import Background from "../../assets/theme/Background.png";

const CommunityBody = () => {
    return (
        <div className = "community-body fixed-background" 
            style = {{background: `url(${Background}) no-repeat bottom center/cover fixed`}}
        >
            {/* <img className = "community-body-background"/> */}
            <CommunityPosts></CommunityPosts>
            {/* <CommunitySubMenu></CommunitySubMenu> */}
            <CommunityTools></CommunityTools>
        </div>
    )
}

export default CommunityBody;