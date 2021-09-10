import "../../styles/roundbutton/roundbutton.css";

const RoundButton = (props) => {


    return <div className = "roundbutton" 
                // style = {{width: props.radius}}
                onClick = {props.handleClick}            
            >
            <div className = "round"
                style = {{height: props.radius, width: props.radius, backgroundColor: props.backgroundColor}}
            >
                <img
                    style = {props.backgroundSize ? {height: props.backgroundSize}: {height: "1rem"}}
                    src = {props.background}
                >
                </img>
            </div>
            <div className = "content"
                style = {{color: props.contentColor}}
            >
                {props.content}
            </div>
    </div>
}

export default RoundButton;