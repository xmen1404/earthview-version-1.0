import "../../styles/communitySubMenu/communitySubMenu.css";
import UserBadge from "../userBadge/UserBadge";
import bookmark_icon from "../../assets/bookmark_icon.png";
import follow_icon from "../../assets/follow_icon.png";
import home_icon from "../../assets/home_icon.png";
import userImgTemp from "../../assets/Icon_2.jpg";


const CommunitySubMenu = () => {
    return (
        <div className = "community-submenu">
            <div className="submenu-container">
                <div className="submenu-block">
                    <div className="submenu-innerBlock">
                        <div className="submenu-header">
                            <span className="submenu-text">Chủ đề đang được quan tâm:</span>
                            <span className="submenu-extend">Xem thêm</span>
                        </div>
                        <div className="submenu-body">
                            <div className="submenu-topic">1. #thiennhien</div>
                            <div className="submenu-topic">2. #biendoikhihau</div>
                            <div className="submenu-topic">3. #lulutchauau</div>
                            <div className="submenu-topic">4. #COP26</div>
                            <div className="submenu-topic">5. #songnhiet</div>
                        </div>
                    </div>
                </div>
                <div className="submenu-block">
                    <div className="submenu-innerBlock">
                        <div className="submenu-header">
                            <span className="submenu-text">Gợi ý theo dõi: </span>
                            <span className="submenu-extend">Xem thêm</span>
                        </div>
                        <div className="submenu-body">
                            <div className="submenu-userBadge">
                                <UserBadge data={{
                                    user : {
                                        name: "Scooby Doo", 
                                        profilePicture: userImgTemp, 
                                        actHistory: "He stole your toys"
                                    }
                                }}></UserBadge>
                            </div>
                            <div className="submenu-userBadge">
                                <UserBadge data={{
                                    user : {
                                        name: "Scooby Doo", 
                                        profilePicture: userImgTemp, 
                                        actHistory: "He stole your toys"
                                    }
                                }}></UserBadge>
                            </div>
                            <div className="submenu-userBadge">
                                <UserBadge data={{
                                    user : {
                                        name: "Scooby Doo", 
                                        profilePicture: userImgTemp, 
                                        actHistory: "He stole your toys"
                                    }
                                }}></UserBadge>
                            </div>
                            <div className="submenu-userBadge">
                                <UserBadge data={{
                                    user : {
                                        name: "Scooby Doo", 
                                        profilePicture: userImgTemp, 
                                        actHistory: "He stole your toys"
                                    }
                                }}></UserBadge>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default CommunitySubMenu;
