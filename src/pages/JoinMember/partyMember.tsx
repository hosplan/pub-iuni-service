import { useEffect, useRef } from "react";
import Image from "next/image";
import React from "react";

interface Props {
    taskId: number;
    setJoinMemberTab: React.Dispatch<React.SetStateAction<boolean>>
}
export default function PartyMember(props: Props) {

    const joinMemberTabRef = useRef<any>();

    useEffect(() => {
        function handleFocus(e: any) {
            if (joinMemberTabRef.current && !joinMemberTabRef.current.contains(e.target)) {
                props.setJoinMemberTab(() => false);
            }
        }
        document.addEventListener("mouseup", handleFocus);
        return () => { document.removeEventListener("mouseup", handleFocus) }
    }, [joinMemberTabRef]);

    return (
        <>
            <div className="join-member-container" ref={joinMemberTabRef}>
                <div className="title">
                    <div className="title-name">
                        공유인원
                    </div>
                    <div className="close-btn" onClick={() => props.setJoinMemberTab(false)}>
                        <Image
                            className="close-btn-img"
                            width={"32px"}
                            height={"32px"}
                            src={"/images/default/delete-btn.webp"} />
                    </div>
                </div>
                <div className="body">
                    <div className="member-count">1</div>
                    <div className="member-list-box">
                        
                    </div>
                </div>
            </div>
            <style jsx>
                {
                    `
                    .join-member-container{
                        display: flex;
                        flex-direction : column;
                        position: absolute;
                        top : 50%;
                        left: 50%;
                        transform : translate(-50%, -50%);
                        width: 30rem;
                        height: 35rem;
                        padding: 1.25rem;
                        border-radius: 14px;
                        box-shadow: 0 0 12px 0 rgba(34, 34, 34, 0.14);
                        background-color: #fff;
                        z-index:999;
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
                    .close-btn{
                        cursor : pointer;
                    }

                `
                }
            </style>
        </>
    )
}