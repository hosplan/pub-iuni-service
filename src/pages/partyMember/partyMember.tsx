import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as PartyMemberApi from "../../../public/api/partyMember";
import PartyMemberContent from "./partyMemberContent";
interface Props {
    taskId: number;
    setPartyMemberTab: React.Dispatch<React.SetStateAction<boolean>>
}
export default function PartyMember(props: Props) {
    const joinMemberTabRef = useRef<any>();
    const [members, setMembers] = useState<any>([]);
    const load = async () => {
        const memberList = await PartyMemberApi.loadPartyMember(props.taskId);
        
        setMembers(() => [...memberList]);
        
    }

    useEffect(() => {
        function handleFocus(e: any) {
            if (joinMemberTabRef.current && !joinMemberTabRef.current.contains(e.target)) {
                props.setPartyMemberTab(() => false);
            }
        }
        document.addEventListener("mouseup", handleFocus);
        return () => { document.removeEventListener("mouseup", handleFocus) }
    }, [joinMemberTabRef]);
    
    useEffect(() => {
        load();
    }, []);

    return (
        <>
            <div className="join-member-container" ref={joinMemberTabRef}>
                <div className="title">
                    <div className="title-name">
                        공유인원
                    </div>
                    <div className="close-btn" onClick={() => props.setPartyMemberTab(false)}>
                        <Image
                            className="close-btn-img"
                            width={"32px"}
                            height={"32px"}
                            src={"/images/default/delete-btn.webp"} />
                    </div>
                </div>
                <div className="body">
                    
                    <div className="member-list-box">
                        <PartyMemberContent members={members}/>
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
                    
                    .close-btn{
                        cursor : pointer;
                    }

                `
                }
            </style>
        </>
    )
}