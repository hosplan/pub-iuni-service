"use client"

import { useEffect, useState } from "react";
import Prepare from "./prepare"
import { useRouter } from 'next/router';
import { iuniStyleState } from "./globalStates";
import { useRecoilState } from "recoil";
import * as IuniStyle from "../../public/api/iuniStyle";
import * as AlarmApi from "../../public/api/alarm";
import Image from "next/image";

export default function Side() {
    const [prepare, setPrepare] = useState<boolean>(false);
    const [isShow, setIsShow] = useState<boolean>(false);
    const [isShowAlarm, setIsShowAlarm] = useState<boolean>(false);
    const [iuniStyle, setIuniStyle] = useRecoilState(iuniStyleState);
    const router = useRouter();
    const movePage = (url: string) => { router.push(url) };

    const loadUserInfo = async () => {
        const result = await checkJwt();
        if(result){
            getIuniStyle();
            loadAlarms();
        }
    }
    const getIuniStyle = async () => {
        const result = await IuniStyle.getMyIuni();

        if(result === "successRefresh"){
            getIuniStyle();
        } else if(result === "expiredToken") {
            window.localStorage.removeItem('iuni');
            window.localStorage.removeItem("iuni_refresh");
            router.push("/");
        } else {
            setIuniStyle(() => {
                return { ...result };
            })
        }
    }

    const checkJwt = async () => {
        const token = window.localStorage.getItem("iuni");
        if(token === null){
            return false;
        }
        setIsShow(() => true);
        return true;
    }
    const loadAlarms = async () => {
        const result = await AlarmApi.load();
        console.log(result);
        const unReadAlarm =result?.alarms?.find(e => e.isRead === false);
        const unReadShareTaskAlram = result?.shareTaskAlarms?.find(e => e.isRead === false);
        if(unReadAlarm || unReadShareTaskAlram){
            setIsShowAlarm(() => true);
        }
    }
    useEffect(() => {
        loadUserInfo();
    }, []);

    return (

        <>
            {
                isShow && 
                <>
                {
                    prepare && <Prepare setPrepare={setPrepare} />
                }
                <div className="side-layout g-c-item">
                    <div className="logo-container">
                        <div className="logo-item">
                        <Image 
                            width={"100%"}
                            height={"100%"}
                            src={"/images/logo.webp"} />
                        </div>
                    </div>

                    <div className="side-container">
                        <div className="item-box">
                            <div className="side-item" onClick={() => movePage("/task")}>
                                <Image 
                                    width={"100%"}
                                    height={"100%"}
                                    src={"/images/default/home.webp"} />
                                <div className="tooltiptext">홈</div>
                            </div>
                            <div className="side-item" onClick={() => setPrepare(() => true)}>
                                <Image 
                                    width={"100%"}
                                    height={"100%"}
                                    src={"/images/default/project.webp"} />
                                <div className="tooltiptext">프로젝트</div>
                            </div>
                            <div className="side-item" onClick={() => setPrepare(() => true)}>
                                <Image 
                                    width={"100%"}
                                    height={"100%"}
                                    src={"/images/default/calendar.webp"} />
                                <div className="tooltiptext">캘린더</div>
                            </div>
                            <div className="side-item" onClick={() => movePage("/developer")}>
                                <Image 
                                    width={"100%"}
                                    height={"100%"}
                                    src={"/images/developers.webp"} />
                                <div className="tooltiptext">만든 사람</div>
                            </div>
                            <div className="side-item iuni-profile mobile" onClick={() => movePage("/profile")}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 48 48" style={{ margin: "0 auto", cursor: "pointer" }}>
                                    <path data-name="background" d="M24 0A24 24 0 1 1 0 24 24 24 0 0 1 24 0" style={{ fill: iuniStyle.background }} />
                                    <path data-name="body" d="M33.945 10.305h-2.42l-3.337 6.936h-8.375l-3.337-6.936h-2.421S5.275 22.35 1.391 32.058a24 24 0 0 0 45.219 0c-3.885-9.708-12.665-21.753-12.665-21.753" style={{ fill: iuniStyle.body }} />
                                    <path data-name="nose" d="m24 37.624-1.39-1.54h2.78z" style={{ fill: iuniStyle.nose }} />
                                    <path data-name="left-eye-white" d="M16.119 35.59a5.3 5.3 0 1 1 5.3-5.3 5.3 5.3 0 0 1-5.3 5.3" style={{ fill: iuniStyle.leftWhiteEye }} />
                                    <path data-name="left-eye" d="M16.119 33.153a2.865 2.865 0 1 1 2.864-2.865 2.865 2.865 0 0 1-2.864 2.865" style={{ fill: iuniStyle.leftEye }} />
                                    <path data-name="right-eye-white" d="M31.882 35.59a5.3 5.3 0 1 1 5.3-5.3 5.3 5.3 0 0 1-5.3 5.3" style={{ fill: iuniStyle.rightWhiteEye }} />
                                    <path data-name="right-eye" d="M31.882 33.153a2.865 2.865 0 1 1 2.864-2.865 2.865 2.865 0 0 1-2.864 2.865" style={{ fill: iuniStyle.rightEye }} />
                                    <path data-name="right-eye" d="M31.882 33.153a2.865 2.865 0 1 1 2.864-2.865 2.865 2.865 0 0 1-2.864 2.865" style={{fill: "#ff0062"}}></path>
                                    {
                                        isShowAlarm &&
                                        <circle cx="40" cy="9" r="8"  style={{fill: "rgb(255, 0, 98)"}}></circle>
                                    }
                                    
                                </svg>
                                <div className="tooltiptext">내정보</div>
                            </div>
                        </div>

                    
                        <div className="box">
                            <div className="side-item iuni-profile" onClick={() => movePage("/profile")}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 48 48" style={{ margin: "0 auto", cursor: "pointer" }}>
                                    <path data-name="background" d="M24 0A24 24 0 1 1 0 24 24 24 0 0 1 24 0" style={{ fill: iuniStyle.background }} />
                                    <path data-name="body" d="M33.945 10.305h-2.42l-3.337 6.936h-8.375l-3.337-6.936h-2.421S5.275 22.35 1.391 32.058a24 24 0 0 0 45.219 0c-3.885-9.708-12.665-21.753-12.665-21.753" style={{ fill: iuniStyle.body }} />
                                    <path data-name="nose" d="m24 37.624-1.39-1.54h2.78z" style={{ fill: iuniStyle.nose }} />
                                    <path data-name="left-eye-white" d="M16.119 35.59a5.3 5.3 0 1 1 5.3-5.3 5.3 5.3 0 0 1-5.3 5.3" style={{ fill: iuniStyle.leftWhiteEye }} />
                                    <path data-name="left-eye" d="M16.119 33.153a2.865 2.865 0 1 1 2.864-2.865 2.865 2.865 0 0 1-2.864 2.865" style={{ fill: iuniStyle.leftEye }} />
                                    <path data-name="right-eye-white" d="M31.882 35.59a5.3 5.3 0 1 1 5.3-5.3 5.3 5.3 0 0 1-5.3 5.3" style={{ fill: iuniStyle.rightWhiteEye }} />
                                    <path data-name="right-eye" d="M31.882 33.153a2.865 2.865 0 1 1 2.864-2.865 2.865 2.865 0 0 1-2.864 2.865" style={{ fill: iuniStyle.rightEye }} />
                                    {
                                        isShowAlarm &&
                                        <circle cx="40" cy="9" r="8"  style={{fill: "rgb(255, 0, 98)"}}></circle>
                                    }
                                </svg>
                                <div className="tooltiptext">내정보</div>
                            </div>
                        </div>
                      
                    </div>
                </div>
                <style jsx>{
                    `                           
                    .side-item{
                        position: relative;
                        cursor : pointer;
                    }
                    .item-box{
                        display:flex;
                        flex-direction: column;
                        gap:0.75rem;
                        justify-content: space-between;
                    }
                    .side-item .tooltiptext {
                        visibility: hidden;
                        width: fit-content;
                        background-color: #1120ff;
                        color: #fff;
                        text-align: center;
                        border-radius: 6px;
                        padding: 5px;
                        position: absolute;
                        z-index: 1;
                        bottom: 20%;
                        left: 320%;
                        margin-left: -100px;
                        opacity: 0;
                        transition: opacity 0.3s;
                    }
                    .side-item.iuni-profile{
                        margin-top : 7.5rem;
                    }
                    .side-item.iuni-profile.mobile{
                        display: none;
                    }
                    .side-item:hover .tooltiptext {
                        visibility: visible;
                        opacity: 1;
                    }
                    @media (max-width: 770px){
                        .side-item.iuni-profile{
                            margin-top : 0;
                        }
                        .tooltiptext{
                            display: none;
                        }
                        .item-box{
                            display:flex;
                            width:100%;
                            flex-direction: row;
                            gap:0.75rem;
                            justify-content: space-between;
                        }

                        .box{
                            display: none;
                        }
                        .side-item.iuni-profile.mobile{
                            display: block;
                        }
                    }
                    `
                }
                </style>
            </>
                   
            }

        </>
    )
}