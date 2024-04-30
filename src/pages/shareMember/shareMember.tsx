import { useEffect, useRef, useState } from "react";
import Certification from "../certification/certification";
import React from "react";
import * as ShareMemberApi from "../../../public/api/shareMember";
import * as MemberApi from "../../../public/api/member";
import * as AlarmApi from "../../../public/api/alarm";
import ContentBody from "./contentBody";
import ContentFooter from "./contentFooter";
import Image from "next/image";

interface Props {
    task: Task;
    setShareTab: React.Dispatch<React.SetStateAction<boolean>>
}

function ShareMember(props: Props) {
    const shareTabRef = useRef<any>();
    const [certification, setCertification] = useState<boolean | undefined>();
    const [members, setMembers] = useState<any>([]);
    const [contentBodyDes, setContentBodyDes] = useState<string>("등록된 친구가 없어요.");

    const [search, setSearch] = useState<string>("");
    const [selectMembers, setSelectMembers] = useState<SignIn[]>([]);


    //친구 불러오기
    const loadFriends = async (id : number) => {
        try {
            const result = await fetch(`${process.env.NEXT_PUBLIC_LOGIN_API_HOST}/api/membermap?id=${id}`, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem("iuni")}`
                },
            });
            return result.json();
        }
        catch (e) {
            throw e;
        }
    }


    //유저 찾기
    const findMember = async () => {
        const result = await ShareMemberApi.find(search, props.task.id, "TASK");
     
        if(result.id === null){
            setMembers(() => []);
            setContentBodyDes(() => `'${search}' 을 찾을 수 없어요.`)
        } else if(result.id === -1){
            setMembers(() => []);
            setContentBodyDes(() => `'${search}' 은 이미 공유요청을 했어요.`)
        } else {
            setMembers((props : []) => {
                return [result]
            })
        }
    }

    //인증 체크
    const checkCertification = async () => {
        return await MemberApi.getCertification();
    }

    //친구 목록 렌더링
    const renderFriends = async () => {
        const myInfo = await checkCertification();
        
        if(myInfo.certification){
            setCertification(() => true);
            const result = await loadFriends(myInfo.id);
        } else {
            setCertification(() => false);
        }
    }

    //공유 요청
    const requestShare = async () => {
        const result = await ShareMemberApi.send(selectMembers, props.task.id);
        if(result.result === "success"){
            for(const member of selectMembers){
                AlarmApi.send(props.task.name, "TASK", member.id, props.task.id);    
            }
            setMembers((props : any) => []);
            setSelectMembers((props : any) => []);
            setSearch(() => "");
            setContentBodyDes(() => "");
        }
    }

    useEffect(() => {
        renderFriends();
    }, []);

    useEffect(() => {
        function handleFocus(e: any) {
         
            if (shareTabRef.current && !shareTabRef.current.contains(e.target)) {
                props.setShareTab(() => false);
            }
        }
        document.addEventListener("mouseup", handleFocus);
        return () => { document.removeEventListener("mouseup", handleFocus) }
    }, [shareTabRef]);

    //엔터키 눌렀을때 함수 실행
    const activeEnter = (e : any) => {
        if(e.key === "Enter"){
            findMember();
        }
    }

    
    return (
        <>
            <div className="share-member-container" ref={shareTabRef}>
                {
                    certification === false ?
                        <Certification setComplete={setCertification}/>
                        :
                        <>
                            <div className="header">
                                <div className="title">
                                    <div className="title-name">
                                        공유하기
                                    </div>
                                    <div className="close-btn" onClick={() => props.setShareTab(false)}>
                                        <Image 
                                            className="close-btn-img"
                                            width={"32px"}
                                            height={"32px"}
                                            src={"/images/default/delete-btn.webp"} />
                                    </div>
                                </div>
                                <div className="search">
                                    <input type="text" className="input-search" 
                                        onChange={(e) => setSearch(e.target.value)} 
                                        onKeyDown={(e) => activeEnter(e)}
                                        value={search} placeholder="찾고있는 멤버가 있나요?"/>
                                </div>
                            </div>
                            <div className="body">
                                <div className="member-count">{members?.length}</div>
                                <div className="member-list-box">
                                    <ContentBody 
                                        setSelectMembers={setSelectMembers} 
                                        members={members}
                                        contentBodyDes={contentBodyDes} />
                                </div>
                            </div>
                            <div className="footer">
                                <ContentFooter setSelectMembers={setSelectMembers} selectMembers={selectMembers} />
                            </div>
                            <div className="button-list">
                                <div className="send-btn" onClick={() => requestShare()}>
                                    공유 요청
                                </div>
                            </div>
                        </>
                }
            </div>
            <style jsx>
                {
                    `
                        .share-member-container{
                            display:flex;
                            flex-direction: column;
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            width: 30rem;
                            height: 35rem;
                            padding: 1.25rem;
                            border-radius: 14px;
                            box-shadow: 0 0 12px 0 rgba(34, 34, 34, 0.14);
                            background-color: #fff;
                            z-index:999;
                        }
                        
                        .header{

                        }
                       
                        .title{
                            display : flex;
                            justify-content: space-between;
                            align-items : center;
                            font-size: 18px;
                            font-weight: bold;
                            font-stretch: normal;
                            font-style: normal;
                            letter-spacing: -0.18px;
                            text-align: left;
                            color: #222;
                        }
                        .search{
                            padding-top:14px;
                        }
                        .member-count{
                            font-size: 16px;
                            font-weight: 600;
                            font-stretch: normal;
                            font-style: normal;
                            color: #a6a6a6;
                            padding-top:6px;
                            padding-bottom:6px;
                            padding-left: 0.875rem;
                            padding-right: 0.875rem;
                        }
                        .body{
                            display: flex;
                            flex-direction: column;
                            padding-top: 1rem;
                            height : 60%;
                        }
                        .footer{
                            display: grid;
                            gap: 6px;
                            padding-left: .875rem;
                            padding-right: .875rem;
                            padding-top:.875rem;
                            padding-bottom:.875rem;
                            height : 20%;
                            max-height: 20%;
                            overflow: auto;
                            border-radius:6px;
                            background-color: #f5f5f5;
                            
                        }
                        .button-list{
                            display: flex;
                            justify-content:end;
                            margin-top : 15px;
                        }

                        .send-btn{
                            border-radius:6px;
                            padding: 5px;
                            width: 100px;
                            font-size: 18px;
                            font-weight: 500;
                            color: #fff;
                            background-color: #5762FF;
                            text-align:center;
                            cursor:pointer;
                        }
                        .input-search{
                            width: 100%;
                            height: 2.625rem;
                            border-radius: 8px;
                            border: none;
                            padding-left: 2.6rem;
                            background: url('./images/default/project-search.webp') no-repeat 4% 50%, #f5f5f5;
                            background-size: 1.125rem 1.125rem;
                        }
                        .close-btn{
                            cursor : pointer;
                        }
                    `
                }
            </style>
        </>
    );
}

export default React.memo(ShareMember);