import { useEffect, useState } from "react";
import * as IuniStyleApi from "../../../public/api/iuniStyle";
interface IuniPart {
    "background": string,
    "body": string,
    "nose": string,
    "leftWhiteEye": string,
    "leftEye": string,
    "rightWhiteEye": string,
    "rightEye": string,
}
interface Props {
    iuniPart: IuniPart
}


export default function IuniPreview(props: Props) {
    const [nickName, setNickName] = useState<string>("");
    // const get = async () => {
    //     const result = await fetch(`${process.env.NEXT_PUBLIC_LOGIN_API_HOST}/api/member/my`,{
    //         method : "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `${localStorage.getItem("iuni")}`
    //         },
    //     }); 

    //     return result.json();
    // }

    const getMyInfo = async () => {
        const result = await IuniStyleApi.getUserProfile();
        setNickName(() => result.nickName);
    }

    useEffect(() => { getMyInfo(); },[])
    return (
        <>
            <div className="container">
                <div className="greeting-container">
                    <div className="greeting">
                        <div className="greeting-block">안</div>
                        <div className="greeting-block">녕</div>
                        <div className="greeting-block">하</div>
                        <div className="greeting-block">세</div>
                        <div className="greeting-block">요</div>
                    </div>
                </div>
                <div className="preview">
                    <svg xmlns="http://www.w3.org/2000/svg" width="350" height="350" viewBox="0 0 48 48" style={{ margin: "0 auto", cursor: "pointer" }}>
                        <path data-name="background" d="M24 0A24 24 0 1 1 0 24 24 24 0 0 1 24 0" style={{ fill: props.iuniPart?.background }} />
                        <path data-name="body" d="M33.945 10.305h-2.42l-3.337 6.936h-8.375l-3.337-6.936h-2.421S5.275 22.35 1.391 32.058a24 24 0 0 0 45.219 0c-3.885-9.708-12.665-21.753-12.665-21.753" style={{ fill: props.iuniPart?.body }} />
                        <path data-name="nose" d="m24 37.624-1.39-1.54h2.78z" style={{ fill: props.iuniPart?.nose }} />
                        <path data-name="left-eye-white" d="M16.119 35.59a5.3 5.3 0 1 1 5.3-5.3 5.3 5.3 0 0 1-5.3 5.3" style={{ fill: props.iuniPart?.leftWhiteEye }} />
                        <path data-name="left-eye" d="M16.119 33.153a2.865 2.865 0 1 1 2.864-2.865 2.865 2.865 0 0 1-2.864 2.865" style={{ fill: props.iuniPart?.leftEye }} />
                        <path data-name="right-eye-white" d="M31.882 35.59a5.3 5.3 0 1 1 5.3-5.3 5.3 5.3 0 0 1-5.3 5.3" style={{ fill: props.iuniPart?.rightWhiteEye }} />
                        <path data-name="right-eye" d="M31.882 33.153a2.865 2.865 0 1 1 2.864-2.865 2.865 2.865 0 0 1-2.864 2.865" style={{ fill: props.iuniPart?.rightEye }} />
                    </svg>
                </div>
                <div className="nick-name">
                    {nickName}
                </div>
                <div className="my-profile">
                    내 프로필
                </div>
            </div>
            
            <style jsx>{
                `
                    .greeting-container{
                        position : relative;
                        width:100%;
                    }
                    .greeting{
                        display : flex;
                        gap : 14px;
                        justify-content: center;
                        align-items:center;
                        width: 100%;
                        height: 7.5rem;
                        border-radius: 6px;    
                        background-color: #050a4c;
                    }
                    .greeting:after {
                        content:""; 
                        position: absolute; 
                        left: 45%; 
                        top: 90%; 
                        border-left: 20px solid transparent; 
                        border-right: 20px solid transparent; 
                        border-top: 20px solid #050a4c;
                    }
                    .greeting-block{
                        display:flex;
                        align-items: center;
                        justify-content: center;
                        width: 3rem;
                        height: 3rem;
                        background-color: #fff;
                        font-size: 35px;
                        font-weight:600;
                        color : #060a4c;
                    }
                    .preview{
                        padding-top:2.188rem;
                    }
                    .container{
                        display : flex;
                        flex-direction : column;
                        align-items: center;
                        justify-content: center;
                    }
                    .nick-name{
                        padding-top:2.313rem;
                        font-size: 3.438rem;
                        font-weight: 600;
                        font-stretch: normal;
                        font-style: normal;
                        letter-spacing: -0.55px;
                        color: #222;
                    }
                    .my-profile{
                        font-size: 1.875rem;
                        font-weight: 600;
                        letter-spacing: -0.3px;
                        color: #bcbcbc;
                    }
                `
            }
            </style>
        </>
    )
}