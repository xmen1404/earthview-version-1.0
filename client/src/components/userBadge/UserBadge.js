import "../../styles/userBadge/userBadge.css";
import {useState} from 'react';
import Button from "../button/Button";

const UserBadge = (props) => {
    return (
        <div className="userBadge-container">
            <div className="userBadge-profileImg">
                <img src = {props.data.user.profilePicture} alt = "profile-picture"></img>
            </div>
            <div className="userBadge-info">
                <div className="userBadge-name">
                    {props.data.user.name}
                </div>
                <div className="userBadge-actHistory">
                    {props.data.user.actHistory}
                </div>
            </div>
            <div className="userBadge-follow">
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
    )
}

export default UserBadge;