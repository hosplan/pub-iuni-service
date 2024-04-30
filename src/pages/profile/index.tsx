import { useState, useRef, useEffect } from "react";
import Layout from "../../app/layout";
import IuniCat from "./iuniCat";
import { useRouter } from "next/router";
import Prepare from "@/app/prepare";
import Image from "next/image";
import Trashbasket from "./trashbasket";
import AlarmContainer from "../alarm/container";
import * as AlarmApi from "../../../public/api/alarm";
import MyProfile from "./myProfile";

function Page(){
    const [active, setActive] = useState<string>("iuniCat");
    const [tab, setTab] = useState<boolean>(false);
    const [prepare, setPrepare] = useState<boolean>(false);
    const [alarms, setAlarms] = useState<AlarmContents | undefined>();

    const selectRef = useRef<any>();
    const tabRef = useRef<any>();
    const router = useRouter();

    const alarmLoad = async () => {
        const data : AlarmContents = await AlarmApi.load();
        setAlarms(() => {
            return {...data}
        });
    }

    const PAGE_INFO : {[key: string] : JSX.Element} = {
        "iuniCat" : <IuniCat />,
        "shareTask" : <AlarmContainer type="shareTaskAlarms" alarms={alarms?.shareTaskAlarms} setAlarms={setAlarms}/>,
        "trashbasket" : <Trashbasket />,
        "alarm" : <AlarmContainer type="alarms"  alarms={alarms?.alarms} setAlarms={setAlarms}/>,
        "myProfile" : <MyProfile />
    }

    const logout = () => {
        window.localStorage.removeItem('iuni');
        window.localStorage.removeItem("iuni_refresh");
        router.push("/");
    }

    //알람 정보 가져오기
    useEffect(() => {
        alarmLoad();
    },[]);
    //탭 이벤트 주입
    useEffect(() => {
        const handleFocus = (e : any) => {
            if (tabRef.current && !tabRef.current.contains(e.target) && !selectRef.current?.contains(e.target)) {
                setTab(() => false);
            }
        }

        document.addEventListener("mouseup", handleFocus);
        return () => { document.removeEventListener("mouseup", handleFocus)}
    },[tabRef]);

 

    return(
        <>
            {
                prepare && <Prepare setPrepare={setPrepare} />
            }
            <div className="profile-container">
                <div className="sidebar">
                    <div className="main-title">설정</div>
                    <div className="sub-title-container">
                        <div className={active=== "iuniCat" ? "sub-title active" : "sub-title"} onClick={() => setActive("iuniCat")}>캐릭터 설정</div>
                        <div className={active === "myProfile" ? "sub-title active" : "sub-title"} onClick={() => setActive("myProfile")}>내 정보 변경</div>
                        <div className={active=== "alarm" ? "sub-title active" : "sub-title"} onClick={() => setActive("alarm")}>
                            알람
                            <div className="alarm-count">
                                {alarms?.alarms?.filter(e => e.isRead === false)?.length}
                            </div>
                           
                        </div>
                        <div className={active=== "shareTask" ? "sub-title active" : "sub-title"} onClick={() => setActive("shareTask")}>
                            공유 요청받은 태스크
                            <div className="alarm-count">
                                {alarms?.shareTaskAlarms?.filter(e => e.isRead === false)?.length}
                            </div>
                        </div>
                        <div className={active=== "friendList" ? "sub-title active" : "sub-title"} onClick={() => setPrepare(true)}>친구 목록</div>
                        <div className={active=== "trash" ? "sub-title active" : "sub-title"} onClick={() => setActive("trashbasket")}>휴지통</div>
                        <div className="sub-title log-out" onClick={() => logout()}>로그아웃</div>
                    </div>
                </div>
                
                <div className={`select-bar ${tab ? 'active' : 'default'}`} ref={selectRef} onClick={() => setTab((d) => !d)}>
                    <div className="select-bar-select">
                        <div className={active=== "iuniCat" ? "sub-title active" : "sub-title"} onClick={() => setActive("iuniCat")}>캐릭터 설정</div>
                    </div>
                    <Image
                        width={"1.5rem"}
                        height={"1.5rem"}
                        src={"/images/select-box.webp"} />
                </div>
                {
                    tab &&
                    <div className="select-bar-content" ref={tabRef}>
                        <div className={active === "myProfile" ? "sub-title active" : "sub-title"} onClick={() => {setActive("myProfile"); setTab(false)}}>
                        </div>
                        <div className={active=== "shareTask" ? "sub-title active" : "sub-title"} onClick={() => {setActive("shareTask"); setTab(false);}}>
                            공유 요청받은 태스크
                            <div className="alarm-count">
                                {alarms?.shareTaskAlarms?.filter(e => e.isRead === false)?.length}
                            </div>
                        </div>
                        <div className={active=== "alarm" ? "sub-title active" : "sub-title"} onClick={() => {setActive("alarm"); setTab(false);}}>
                            알람
                            <div className="alarm-count">
                                {alarms?.shareTaskAlarms?.filter(e => e.isRead === false)?.length}
                            </div>
                        </div>
                        <div className={active=== "friendList" ? "sub-title active" : "sub-title"} onClick={() => {
                            setPrepare(true);
                            setTab(false);  
                        }}>친구 목록</div>
                        <div className="sub-title log-out" onClick={() => logout()}>로그아웃</div>
                    </div>
                }
                
                <div className="container">
                    {PAGE_INFO[active]}
                </div>
            </div>
            <style jsx>
                {
                    `
                        .sub-title-container{
                            padding-top: 24px;
                            display : flex;
                            gap: 16px;
                            font-size: 18px;
                            font-weight: 500;
                            font-stretch: normal;
                            font-style: normal;
                            line-height: 0.78;
                            letter-spacing: -0.18px;
                            text-align: left;
                            color: #222;
                            flex-direction: column;
                        }
                        .alarm-count{
                            font-weight: 600;
                            font-stretch: normal;
                            font-style: normal;
                            letter-spacing: normal;
                            text-align: left;
                            color: #a6a6a6;
                        }
                        .sub-title{
                            display: flex;
                            gap: 6px;
                            cursor: pointer;
                        }
                        .sub-title.log-out{
                            
                            color: #878fff;
                            text-decoration: underline;
                        }
                        .sub-title:hover{
                            font-weight: bold;
                        }
                        .sub-title.active{
                            font-weight: bold;
                        }
                        
                        .main-title{
                            font-size: 24px;
                            font-weight: 600;
                            letter-spacing: -0.24px;
                            color : #222;
                        }
                        .profile-container{
                            display:flex;
                            width:100%;
                            height: 100%;
                            overflow:auto;
                        }
                        .sidebar{
                            flex: 1 1 20%;
                            padding : 43.5px 44px;
                            height:100%;
                            border-right:1px solid #e5e5e5;
                        }
                        .container{
                            flex: 1 1 80%;
                            padding : 43.5px 44px;
                            height:100%;
                        }
                        .select-bar{
                            display: none;
                        }
                        .select-bar-content{
                            display: none;
                        }
                        @media(max-width: 770px){
                            .container{
                                padding: 0px;
                            }
                            .sidebar{
                                display : none;
                            }
                            .select-bar{
                                display: flex;
                                flex : auto 28px;
                                justify-content : space-between;
                                padding: 12px 13px;
                                border-radius: 8px;
                                border: solid 1px #e5e5e5;
                                font-size: 18px;
                                font-weight: 500;
                                font-stretch: normal;
                                font-style: normal;
                                letter-spacing: -0.18px;
                            }
                            .select-bar.active{
                                border: solid 1px #1120ff;
                            }
                            .select-bar-content{
                                display:flex;
                                flex-direction: column;
                                border: solid 1px #e5e5e5;
                                border-radius: 8px;
                                font-size: 18px;
                                font-stretch: normal;
                                font-style: normal;
                                letter-spacing: -0.18px;
                            }

                            .select-bar-content>.sub-title{
                                padding: 12px 13px;
                            }
                          
                            .profile-container{
                                flex-direction: column;
                                gap: 4px;
                                padding-top: 1.5rem;
                                padding-left: 1.5rem;
                                padding-right: 1.5rem;
                                padding-bottom: 4.3rem;
                            }
                        }
                    `
                }
            </style>
        </>
    )
}

export default Page;

Page.getLayout = function getLayout(page: React.ReactElement) {
    return (<Layout>{page}</Layout>)
}