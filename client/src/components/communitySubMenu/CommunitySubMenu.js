import "../../styles/communitySubMenu/communitySubMenu.css";
import bookmark_icon from "../../assets/bookmark_icon.png";
import follow_icon from "../../assets/follow_icon.png";
import home_icon from "../../assets/home_icon.png";


const CommunitySubMenu = () => {
    return (
        <div className = "community-submenu">
            <div className="submenu-container">
                <div className="block">
                    <div className="home">
                        <span className="icon"> <img src={home_icon} alt="home-logo"/> </span>
                        <span className="text">Dành cho bạn</span>
                    </div>

                    <div className="follow-list">
                        <span className="icon"> <img src={follow_icon} alt="follow-logo" /> </span>
                        <span className="text">Đang follow</span>
                    </div>

                    <div className="saved-posts">
                        <span className="icon"> <img src={bookmark_icon} alt="save-logo" /> </span>
                        <span className="text">Đã lưu</span>
                    </div>
                </div>

                <div className="block">
                    <div className="post-filter">
                        Lọc bài viết
                    </div>
                </div>

                <div className="block">
                <div className="top-topic">
                    <div className="header">Quan tâm nhiều:</div>
                    <div className="body">
                        <div className="topic">#thiennhien</div>
                        <div className="topic">#biendoikhihau</div>
                        <div className="topic">#lulutchauau</div>
                        <div className="topic">#COP26</div>
                        <div className="topic">#songnhiet</div>
                        <div className="topic">#gretathunberg</div>
                        <div className="topic">#earthview</div>
                    </div>
                </div>
                </div>

            </div> 
        </div>
    )
}

export default CommunitySubMenu;
