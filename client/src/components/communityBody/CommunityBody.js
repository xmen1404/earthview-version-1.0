import "../../styles/communityBody/communityBody.css";
import CommunityPosts from "../communityPosts/CommunityPosts";
import CommunitySubMenu from "../communitySubMenu/CommunitySubMenu";
import {useState, useContext} from 'react';
// import CommunitySubMenu from "../communitySubMenu/CommunitySubMenu";
import CommunityTools from "../communityTools/CommunityTools";
import {ControllerContext} from "../../contexts/ControllerContext";

import Background from "../../assets/theme/Background.png";

const CommunityBody = () => {
    const {controllerState: {landing}} = useContext(ControllerContext);

    // const [openSubMenu, setOpenSubMenu] = useState(true);

    return (
        <div className = "community-body fixed-background" 
            style = {{background: `url(${Background}) no-repeat bottom center/cover fixed`}}
        >
            {/* <img className = "community-body-background"/> */}
            <CommunityPosts
                // openSubMenu={openSubMenu}
            ></CommunityPosts>
            {landing &&
                <CommunitySubMenu></CommunitySubMenu>
            }
            {/* <CommunitySubMenu></CommunitySubMenu> */}
            {/* <CommunityTools></CommunityTools> */}
        </div>
    )
}

export default CommunityBody;