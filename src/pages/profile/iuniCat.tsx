import React, { useEffect, useState } from "react";
import { HuePicker } from "react-color";
import IuniPreview from "./iuniPreview";
import * as IuniStyleApi from "../../../public/api/iuniStyle";
import { useRecoilState } from "recoil";
import { iuniStyleState } from "@/app/globalStates";
import Image from "next/image";

function IuniCat() {
    const [color, setColor] = useState<string>("");
    const [editPart, setEditPart] = useState<string>("");
    const [background, setBackground] = useState<string>("");
    const [iuniStyle, setIuniStyle] = useRecoilState(iuniStyleState);
    const [leftWhiteEye, setLeftWhiteEye] = useState<string>("");
    const [leftEye, setLeftEye] = useState<string>("");
    const [id, setId] = useState<number>(-1);
    const [rightEye, setRightEye] = useState<string>("");
    const [rightWhiteEye, setRightWhiteEye] = useState<string>("");
    const [body, setBody] = useState<string>("");
    const [nose, setNose] = useState<string>("");
    
    const handleEditPart = (type:string, color: string) => {
        setEditPart(() => type);
        setColor(() => color);
    }

    const parts : any = {
        "background" : "배경화면",
        "leftWhiteEye" : "눈 흰자(왼쪽)",
        "leftEye" : "눈(왼쪽)",
        "nose" : "코",
        "rightWhiteEye" : "눈 흰자(오른쪽)",
        "rightEye" : "눈(오른쪽)",
        "body" : "몸"
    }
    const colorList = ["#ff4848", "#ffc248", "#f9ff48", "#48ffcd", "#486dff", "#f948ff", "#6b48ff", "#4c6555", "#30374d", "#48ffff","#ab7e25","#60613e"];

    const handleIuni = (data : any) => {
        setBackground(() => data.background);
        setLeftWhiteEye(() => data.leftWhiteEye);
        setLeftEye(() => data.leftEye);
        setNose(() => data.nose);
        setRightWhiteEye(() => data.rightWhiteEye);
        setRightEye(() => data.rightEye);
        setBody(() => data.body);
        if(data.id){
            setId(data.id);
        }
    }
    const update = async () => {
        let data = {
            "id" : id,
            "background" : background,
            "leftWhiteEye" : leftWhiteEye,
            "leftEye" : leftEye,
            "body" : body,
            "rightWhiteEye" : rightWhiteEye,
            "rightEye" : rightEye,
            "nose" : nose
        };
        const result = await IuniStyleApi.update(data);
        if(result === true){
            
            setIuniStyle((pre : any) => {
                const temp = JSON.parse(JSON.stringify(pre));
                temp.background = data.background;
                temp.leftWhiteEye = data.leftWhiteEye;
                temp.leftEye = data.leftEye;
                temp.body = data.body;
                temp.rightWhiteEye = data.rightWhiteEye;
                temp.rightEye =data.rightEye;
                temp.nose = data.nose;

                return {...temp};
            });

        } else {
            alert("업데이트 도중 문제가 발생했어요 ^오^");
        }
    }
    /* ColorPicker에서 색상을 선택할 시 테마 카드 색상 변경 */
    const getTemplate = (type : string) => {
        const temp = JSON.parse(JSON.stringify(parts));
        if(type === "basic"){
            temp.background = "#b7bbff";
            temp.leftWhiteEye = "#fff";
            temp.leftEye = "#020918";
            temp.nose = "#fff";
            temp.rightWhiteEye = "#fff";
            temp.rightEye = "#020918";
            temp.body = "#5762ff";
            handleIuni(temp);
        } else if(type === "mono"){
            temp.background = "#d9d8d8";
            temp.leftWhiteEye = "#fff";
            temp.leftEye = "#020918";
            temp.nose = "#fff";
            temp.rightWhiteEye = "#fff";
            temp.rightEye = "#020918";
            temp.body = "#020918";
            handleIuni(temp);
        } else if(type === "vivid"){
            temp.background = "#bda1ff";
            temp.leftWhiteEye = "#fff";
            temp.leftEye = "#020918";
            temp.nose = "#824eff";
            temp.rightWhiteEye = "#fff";
            temp.rightEye = "#020918";
            temp.body = "#a2ffe3";
            handleIuni(temp);
        }
    }
    
    const handleColor = (color: any) => {
        setColor(color.hex);
        if(editPart === "body"){
            setBody(() =>  color.hex);
        } else if(editPart === "background") {
            setBackground(() => color.hex);
        } else if(editPart === "leftWhiteEye") {
            setLeftWhiteEye(() =>  color.hex);
        } else if(editPart === "leftEye") {
            setLeftEye(() => color.hex);
        } else if(editPart === "rightWhiteEye") {
            setRightWhiteEye(() => color.hex);
        } else if(editPart === "rightEye") {
            setRightEye(() => color.hex);
        } else if(editPart === "nose") {
            setNose(() => color.hex);
        }
    }
    async function getIuniStyle(){
        const result = await IuniStyleApi.getMyIuni();
        handleIuni(result);
    }

    useEffect(() => {
        getIuniStyle();
    }, [])
    return (
        <>
            <div className="content">
                <div className="content-header">
                    <div className="title-container">
                        <div className="content-title">캐릭터 설정</div>
                        <div className="save-btn" onClick={() => update()}>저장</div>
                    </div>
                    <div className="description-container">
                        <div className="content-description">나만의 아유니 캐릭터를 만들고 내 프로필로 활용하세요.</div>
                    </div>
                </div>
             
                <div className="iuni-content">
                    <div className="iuni-editor">
                        <div className="basic-template">
                            <div className="theme" onClick={() => getTemplate("basic")}>
                                <Image width={"50px"} height={"50px"} src={"/images/basic.webp"} />
                                <div className="theme-name">
                                    기본
                                </div>
                            </div>
                            <div className="theme" onClick={() => getTemplate("mono")}>
                                <Image width={"50px"} height={"50px"} src={"/images/mono.webp"} />
                                <div className="theme-name">
                                    모노
                                </div>
                            </div>
                            <div className="theme" onClick={() => getTemplate("vivid")}>
                                <Image width={"50px"} height={"50px"} src={"/images/vivid.png"} />
                                <div className="theme-name">
                                    비비드
                                </div>
                            </div>
                        </div>
                        <div className="iuni-cat">
                            <svg xmlns="http://www.w3.org/2000/svg" width="250" height="250" viewBox="0 0 48 48" style={{ margin: "0 auto", cursor:"pointer" }}>
                                <path data-name="background" d="M24 0A24 24 0 1 1 0 24 24 24 0 0 1 24 0" style={{ fill: background }} onClick={() => handleEditPart("background", background)} />
                                <path data-name="body" onClick={() => handleEditPart("body", body)} d="M33.945 10.305h-2.42l-3.337 6.936h-8.375l-3.337-6.936h-2.421S5.275 22.35 1.391 32.058a24 24 0 0 0 45.219 0c-3.885-9.708-12.665-21.753-12.665-21.753" style={{ fill: body }} />
                                <path data-name="nose" onClick={() => handleEditPart("nose", nose)} d="m24 37.624-1.39-1.54h2.78z" style={{ fill: nose }} />
                                <path data-name="left-eye-white" onClick={() => handleEditPart("leftWhiteEye", leftWhiteEye)} d="M16.119 35.59a5.3 5.3 0 1 1 5.3-5.3 5.3 5.3 0 0 1-5.3 5.3" style={{ fill: leftWhiteEye }} />
                                <path data-name="left-eye" onClick={() => handleEditPart("leftEye", leftEye)} d="M16.119 33.153a2.865 2.865 0 1 1 2.864-2.865 2.865 2.865 0 0 1-2.864 2.865" style={{ fill: leftEye }} />
                                <path data-name="right-eye-white" onClick={() => handleEditPart("rightWhiteEye", rightWhiteEye)} d="M31.882 35.59a5.3 5.3 0 1 1 5.3-5.3 5.3 5.3 0 0 1-5.3 5.3" style={{ fill: rightWhiteEye }} />
                                <path data-name="right-eye" onClick={() => handleEditPart("rightEye", rightEye)} d="M31.882 33.153a2.865 2.865 0 1 1 2.864-2.865 2.865 2.865 0 0 1-2.864 2.865" style={{ fill: rightEye }} />
                            </svg>
                        </div>
                        <div className="iuni-cat-color-picker">
                            <div className="color-palette">
                                <div className="palette-header">
                                    <div className="name">{parts[editPart] === undefined ? "클릭해서 구석구석 커스텀 해봐요." : parts[editPart]}</div>
                                    <div className="color-code">
                                        <input type="text" value={color} onChange={(e) => setColor(e.target.value)} onBlur={(e) => handleColor({"hex" : e.target.value})}/>
                                    </div>
                                </div>
                                <div className="color-block-container">
                                    {
                                         colorList.map((item:string, index:number) => (
                                            <div className="color-block" key={index} onClick={() => handleColor({"hex": item})}  style={{backgroundColor:item}}></div>
                                        ))
                                    }                                   
                                </div>
                                <div className="hue-container">
                                    <HuePicker width="100%" height="18px" color={color} onChange={handleColor} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="iuni-preview">
                        <IuniPreview iuniPart={
                            {
                                "background" : background,
                                "nose" : nose,
                                "body" : body,
                                "leftEye" : leftEye,
                                "leftWhiteEye" : leftWhiteEye,
                                "rightEye" : rightEye,
                                "rightWhiteEye" : rightWhiteEye
                            }
                        }/>
                    </div>
                </div>
            </div>
            <style jsx>
                {
                    `
                        .nick-name {
                            font-size: 55px;
                            font-weight: 600;
                            font-stretch: normal;
                            font-style: normal;
                            letter-spacing: -0.55px;
                            color: #222;
                        }
                        .palette-header{
                            display: flex;
                            justify-content: space-between;
                        }
                        .palette-header>.name{
                            font-size: 24px;
                            font-weight: 600;
                        }
                        .palette-header>.color-code>input{
                            font-size: 24px;
                            font-weight: 600;
                            color : #b7bbff;
                            width: 110px;
                            border:none;
                        }
                        
                        .hue-container{
                            padding-top: 34px;
                            display: flex;
                            justify-content: center;
                        }
                        .color-block-container{
                            display: flex;
                            padding-top: 12px;
                            gap: 16px;
                            flex-wrap: wrap;
                            justify-content: space-between;
                            cursor:pointer;
                        }
                        .color-block{
                            width: 3.75rem;
                            height: 3.75rem;
                            border-radius: 10px;
                        }
                        .color-palette{
                            width: 33.625rem;
                            height: 17.688rem;
                            padding: 1.563rem;
                            border-radius: 24px;
                            background-color: #fff;
                        }
                        .iuni-cat-color-picker{
                            padding-top : 16px;
                            display: flex;
                            justify-content: center;
                        }
                        .iuni-cat{
                            display : flex;
                            width: 100%;
                            margin-top:15%;
                        }   
                        
                        .theme-name{
                            font-size: 1.5rem;
                            font-weight: normal;
                        }
                        .theme{
                            display : flex;
                            align-items: center;
                            gap: 16px;
                            padding-left: 16px;
                            padding-right: 16px; 
                            cursor: pointer;
                        }
                        .basic-template{
                            display: flex;
                            flex-direction : column;
                            position: absolute;
                            z-index: 999;
                            width: 12.75rem;
                            gap:16px;
                            top : 3%;
                            left: 3%;
                        }
                        .content{
                            display: flex;
                            padding: 2.719rem 2.75rem;
                            flex-direction: column;
                        }
                        .title-container{
                            display: flex;
                            justify-content : space-between;
                        }
                        .description-container{
                            display: flex;
                            justify-content : space-between;
                        }
                        .content-title{
                            font-size: 36px;
                            font-weight: 600;
                        }
                        .content-description{
                            padding-top: 2.563rem;
                            font-size: 24px;
                            font-weight: 600;
                        }
                        .save-btn{
                            display: flex;
                            justify-content:center;
                            align-items:center;
                            width: 6.5rem;
                            height: 3rem;
                            font-size: 18px;
                            font-weight: 500;
                            color: #fff;
                            background-color: #5762ff;
                            border-radius: 6px;
                            cursor: pointer;
                        }
                        .iuni-content{
                            display: flex;
                            padding-top:16px;
                            width:100%;
                            height: 45rem;
                        }
                        
                        .iuni-editor{
                            position:relative;
                            flex: 1 1 55%;
                            background-color: #e6e8ff;
                            border-top-left-radius: 12px;
                            border-bottom-left-radius: 12px;
                        }
                        .iuni-preview{
                            display : flex;
                            align-items : center;
                            justify-content: center;
                            flex: 1 1 45%;
                            background-color: #f2f3ff;
                            border-top-right-radius: 12px;
                            border-bottom-right-radius: 12px;
                        }

                        @media(max-width: 770px){
                            .content{
                                padding:0px;
                                padding-top:16px;
                            }
                            .iuni-content{
                                flex-direction: column;
                                height:fit-content;
                            }
                            .iuni-preview{
                                padding : 1rem;
                                border-top-left-radius: 0px;
                                border-top-right-radius: 0px;
                                border-bottom-left-radius: 12px;
                                border-bottom-right-radius: 12px;
                            }
                            .iuni-editor{
                                border-top-left-radius: 12px;
                                border-top-right-radius: 12px;
                                border-bottom-left-radius: 0px;
                                border-bottom-right-radius: 0px;
                                padding : 1rem;
                            }
                            .color-palette{
                               height: fit-content;
                            }
                            .palette-header{
                                flex-direction: column;
                                gap: 6px;
                            }
                            .palette-header>.name{
                                font-size: 0.95rem;
                                text-align: center;
                            }
                            .basic-template{
                                display: none;
                            }
                            .color-code{
                                margin: 0 auto;
                            }
                            .color-code>input{
                                text-align: center;
                            }
                        }
                    `
                }
            </style>
        </>
    )
}

export default React.memo(IuniCat);