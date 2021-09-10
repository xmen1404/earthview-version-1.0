import "../../styles/newpost/newpost.css"
import React, {useState, useContext} from "react";
import Button from "../../components/button/Button";
import image_icon from "../../assets/image_icon.png";
import {apiUrl, LOCAL_STORAGE_TOKEN_NAME} from '../../contexts/constants';
import axios from 'axios';
import {BigCategoryContext} from "../../contexts/BigCategoryContext";
import {CategoryContext} from "../../contexts/CategoryContext";
import RoundButton from "../roundbutton/RoundButton";
import cross_icon from "../../assets/cross_icon.png";
import cloud_icon from "../../assets/cloud_icon.png";
import flag_icon from "../../assets/flag_icon.png";
import { PostContext } from "../../contexts/PostContext";

const NewPost = (props) => {

    // props.pushShowLoginPanel(showLoginPanel);
    // console.log(props);
    const [state, setState] = useState({
        backgroundUrl:"",
        title: "",
        content: "",
        description: "",
        descriptionWordCount: 0,
        bigCategory: {},
        category: {}
    })


    const [step, setStep] = useState(0);

    const {categoryList} = useContext(CategoryContext);
    const {bigCategoryList} = useContext(BigCategoryContext);
    const {createPost} = useContext(PostContext);

    const colorList = [
        "green", "red", "purple", "yellow" ,"blue", "orange"
    ];


    const handleChangeBackground = async (event) => {
        try{
            const url = apiUrl + '/uploads';
            const header = "Bearer " + localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)

            const formData = new FormData();

            formData.append("file", event.target.files[0]);

            const res = await axios.post(url, formData, {
                headers:{
                    Authorization: header
                }
            })

            console.log("check res", res.data.url);

            setState({
                ...state,
                backgroundUrl: res.data.url
            })

            // return(list);

        }catch(err){
            console.log(err);
        }
    }


    const nextStep = () => {
        setStep(step + 1);
    }

    const handleChange = (type, event) => {
        // console.log("debug", type, event.target.value);
        
        if(type === "title"){
            console.log("title case");
            setState({
                ...state,
                title: event.target.value
            })
        }

        else if(type === "content"){
            console.log("content case");
            setState({
                ...state,
                content: event.target.value
            })
        }

        else if(type === "description"){
            console.log("content case");
            
            const wordCount = event.target.value.trim().replace("  ", " ").split(" ").length;
            if(wordCount <= 50){
                setState({
                    ...state,
                    description: event.target.value,
                    descriptionWordCount: wordCount
                })
            }
        }
        
    }


    const handleChangeCategory = (type, event) => {
        console.log(event.target)
        let index;
        let label;
        let value;


        if(type === "category" || type === "bigCategory"){
            index = event.nativeEvent.target.selectedIndex;
            label = event.nativeEvent.target[index].text;
            value = event.target.value;
        }


        let data = {
            name: label,
            _id: value
        }

        console.log("handling", type);

        setState({
            ...state,
            [type]: data
        })


    }


    const submit = async () => {
        const {backgroundUrl, title, content, description, bigCategory, category} = state;
        // console.log("check data", backgroundUrl, title, content, description, bigCategory, category);

        const modifiedDescription = description !== ""? description: content.split(" ", 37).join(" ");

        const data = {
            title, 
            backgroundUrl, 
            content, 
            description: modifiedDescription, 
            bigCategory: bigCategory._id !== "default" ? bigCategory._id: null, 
            category: category._id !== "default" ? category._id:null
        }

        const res = await createPost(data);

        if(res.success){
            window.location.href = '/'; 
        }
    }




    return (
        <div className="newpost-container">
            <div className = "newpost-background"
                style = {state.backgroundUrl !== "" ?
                            {background: `url(${state.backgroundUrl}) no-repeat center center/cover`, opacity: 0.5}:
                            {}
                        }
            >
                
            </div>

            <div className = "newpost-wrapper">
                {step === 0 &&
                    <div className="newpost-body">
                        <div className="newpost-header">
                            <span className="newpost-text">Ảnh nền</span>
                        </div>

                        <div className = "newpost-step-1">

                            {state.backgroundUrl === "" &&
                                <div className = "upload-background">
                                    <div>
                                        <img src = {image_icon}></img>
                                    </div>
                                    <div className = "upload-button">
                                        <input type="file" name="file" id = "file-button-1" onChange={handleChangeBackground} style={{display:"none"}}/>
                                        <label for="file-button-1">
                                            Chọn từ máy tính
                                        </label>
                                        {/* <div className = "text">Chọn từ máy tính</div> */}
                                    </div>
                                </div>
                            }


                            {state.backgroundUrl !== "" &&
                                <div className = "upload-background-active">
                                    {/* <div>
                                        <img src = {state.backgroundUrl}></img>
                                    </div> */}
                                    <div className = "upload-button">
                                        {/* <input type="file" name="file" onChange={handleChangeBackground}/> */}
                                        <input type="file" name="file" onChange={handleChangeBackground} id="file-button" style={{display:"none"}}/>
                                        <label for="file-button" style = {{background: `url(${state.backgroundUrl}) no-repeat center center/cover`}}>
                                            <div style = {{height: "79%", width: "84%", borderRadius: "8px", border: "2px solid #cacaca"}}>
                                                
                                            </div>
                                        </label>

                                    </div>
                                </div>
                            }
                        </div>


                        <div className = "nextbutton">
                            <Button 
                                content="Tiếp theo"
                                color="white"
                                bgcolor="#295E62"
                                width="6rem"
                                height="2rem"
                                fontSize="1rem"
                                // fontWeight="600"
                                paddingTop="0.075rem"
                                paddingBottom="0.1rem"
                                borderRadius = "12px"
                                margin = "0"
                                handleClick={nextStep}
                            />
                        </div>
                    </div>
                }


                {step === 1 &&
                    <div className="newpost-body">
                        <div className="newpost-header">
                            <span className="newpost-text">Nội dung</span>
                        </div>

                        <div className = "newpost-step-2">

                            <input placeholder = "Tiêu đề" onChange = {(event) => handleChange("title", event)}></input>

                            <textarea placeholder = "Nội dung bài viết" value = {state.content} onChange = {(event) => handleChange("content", event)}></textarea>

                            {/* <div style = {{whiteSpace: "pre-wrap"}}>
                                {state.content}
                            </div> */}
                        </div>

                        <div className = "nextbutton">
                            <Button 
                                content="Tiếp theo"
                                color="white"
                                bgcolor="#295E62"
                                width="6rem"
                                height="2rem"
                                fontSize="1rem"
                                // fontWeight="600"
                                paddingTop="0.075rem"
                                paddingBottom="0.1rem"
                                borderRadius = "12px"
                                margin = "0"
                                handleClick={nextStep}
                            />
                        </div>
                    </div>
                }


                {step === 2 &&
                    <div className="newpost-body">
                        <div className="newpost-header">
                            <span className="newpost-text">Mô tả</span>
                        </div>

                        <div className = "newpost-step-3">

                            <div className = "description">
                                <div className = "header">
                                    Mô tả bài viết (không bắt buộc):
                                </div>

                                <div className = "description-content">
                                    <textarea value = {state.description} onChange = {(event) => handleChange("description", event)}></textarea>
                                    <div className = "word-count">{state.descriptionWordCount}/50</div>
                                </div>
                            </div>


                            <div className = "option">
                                <div className = "select-box">
                                    <div className = "header">
                                        Chủ đề
                                    </div>

                                    <select onChange={(event)=>handleChangeCategory("bigCategory", event)}>
                                        <option value="default">Chọn chủ đề</option>
                                        {bigCategoryList.map((cur_bigCategory)=>{
                                            return <option value={cur_bigCategory.id}>{cur_bigCategory.name}</option>
                                        })}
                                    </select>
                                </div>

                                <div className = "select-box">
                                    <div className = "header bolder">
                                        Thể loại
                                    </div>

                                    <select onChange={(event)=>handleChangeCategory("category", event)}>
                                        <option value="default">Chọn thể loại</option>
                                        {categoryList.map((cur_category)=>{
                                            return <option value={cur_category.id}>{cur_category.name}</option>
                                        })}
                                    </select>
                                </div>

                            </div>

                            <div className = "emotion-color">
                                <div className = "header">
                                    Màu sắc (thể hiện tâm trạng bài viết):
                                </div>
                                <div className = "color-list">
                                    {colorList.map((color) => {
                                        return <div style = {{
                                                    width: "1.3rem", height: "1.3rem", background: color, marginRight:"0.6rem"
                                                }}></div>
                                    })}
                                </div>
                            </div>

            

                        </div>

                        <div className = "nextbutton">
                            <Button 
                                content="Đăng bài"
                                color="white"
                                bgcolor="#295E62"
                                width="6rem"
                                height="2rem"
                                fontSize="1rem"
                                // fontWeight="600"
                                paddingTop="0.075rem"
                                paddingBottom="0.1rem"
                                borderRadius = "12px"
                                margin = "0"
                                handleClick={submit}
                            />
                        </div>

                    </div>
                }
                
                <div className = "buttons-set">
                    <RoundButton 
                        content = "Thoát"
                        background = {cross_icon}
                        radius = "3rem"
                        handleClick = {props.closeCreatePost}
                    ></RoundButton>

                    <RoundButton 
                        content = "Lưu nháp"
                        background = {cloud_icon}
                        radius = "3rem"
                    
                    ></RoundButton>

                    <RoundButton 
                        content = "Hướng dẫn"
                        background = {flag_icon}
                        radius = "3rem"
                    
                    ></RoundButton>
                </div>

            </div>

        </div>
    );
}

export default NewPost;