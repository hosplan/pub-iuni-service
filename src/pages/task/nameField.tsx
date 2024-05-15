import { useEffect, useRef, useState } from "react";
import ShareMember from "../shareMember/shareMember";
import React from "react";
import Image from "next/image";
import PartyMember from "../partyMember/partyMember";
import ShareTaskTab from "../tab/shareTaskTab";
import * as ShareMemberAPI from "../../../public/api/shareMember";
interface Props{
    task: Task,
    setTask: React.Dispatch<React.SetStateAction<Task>>
    setDetail: React.Dispatch<React.SetStateAction<boolean>>
    update: () => void
    moveTrash: (taskId: number) => void;
    boardId : number;
}
function NameField(props : Props){
    const [name, setName] = useState<string>(props.task?.name === undefined ? "없음" : props.task.name);
    const [tab, setTab] = useState<boolean>(false);
    const [shareTab, setShareTab] = useState<boolean>(false);
    const [partyMemberTab, setPartyMemberTab] = useState<boolean>(false);
    //const [certificationTab, setCertificationTab] = useState<boolean>(false);

    const tabRef = useRef<HTMLDivElement>(null);
    const btnRef = useRef<HTMLDivElement>(null);
    // const disconnectShare = async () => {
    //     const result = await ShareMemberAPI.disconnect(props.task.id);
    //     console.log(result);
        
    //     if(result === 1){
    //         props.setTasks((t: any) => {
    //             const data = t.filter((d: any) => d.id !== props.task.id);
    //             return [...data];
    //         });
    //     }
    // }
    
    useEffect(() => {
        const handleFocus = (e : any) => {
            if (tabRef.current && !tabRef.current.contains(e.target) && !btnRef.current?.contains(e.target)) {
                setTab(() => false);
            }
        }
        document.addEventListener("mouseup", handleFocus);
        return () => { document.removeEventListener("mouseup", handleFocus); }
    }, [tabRef]);

    const updateName = () => {
        props.setTask((pre: Task) => {
            pre.name = name;
            return { ...pre };
        });
        props.update();
    }

    const remove = (taskId: number) => {
        props.moveTrash(taskId);
        props.setDetail(() => false);
    }
  
    const openTab = () => {
        setTab(() => false);
        setPartyMemberTab(() => false);
        setShareTab(() => true);
    }

    const openPartyMemberTab = () => {
        setTab(() => false);
        setShareTab(() => false);
        setPartyMemberTab(() => true);
    }

    return (
        <>
            {
                shareTab && 
                <>
                    <ShareMember task={props.task} setShareTab={setShareTab}/>
                </>
            }
            {
                partyMemberTab &&
                <>
                    <PartyMember taskId={props.task.id} setPartyMemberTab={setPartyMemberTab}/>
                </>
            }
            <div className="name-space">
                <input className="name-input" value={name}
                    onChange={(e) => setName(() => e.target.value)}
                    onBlur={() => updateName()}
                />
                <div ref={btnRef} onClick={(e) => setTab((d : boolean) =>!d)}>
                    <Image 
                        style={{cursor:"pointer", width:"2rem", height:"2rem"}}
                        width={"32px"}
                        height={"32px"}
                        src={"/images/default/card-other-btn.webp"} />
                </div>
                {
                    tab &&
                    <div className="tab-container" ref={tabRef}>
                        {
                            props.boardId === -1 ? 
                            <>
                                <ShareTaskTab taskId={props.task?.id} disconnectShare={props.moveTrash} openPartyMemberTab={openPartyMemberTab}/>
                            </>
                            : 
                            <>
                            <div className="tab warning" onClick={() => remove(props.task.id)}>
                                <Image 
                                    width={"24px"}
                                    height={"24px"}
                                    src={"/images/default/trash.webp"} />
                                휴지통
                            </div>
                            <div className="tab" onClick={() => openTab()}>
                                <Image width={"24px"} height={"24px"} src={"/images/profile.webp"} />
                                공유하기
                            </div>
                            {
                                props.task.isShared &&
                                <>
                                <div className="tab" onClick={() => openPartyMemberTab()}>
                                    <Image width={"24px"} height={"24px"} src={"/images/profile.webp"} />
                                    공유인원
                                </div>
                                </>
                            }
                            </>
                        }
                       
                    </div>
                }
            </div>
            <style jsx>
                {
                    `
                        .name-space{
                            display:flex;
                            width:100%;
                            align-items : center;
                            justify-content: space-between;   
                        }
                        .name-input{
                            border : none;
                            width:100%;
                            font-style:Pretendard;
                            font-size: 24px;
                            font-weight: 600;
                            font-stretch: normal;
                            font-style: normal;
                            letter-spacing: -0.24px;
                            text-align: left;
                            color: #222;
                        }
                        .name-input:focus{
                            outline:none;
                            border: none;
                        }
                        .tab-container{
                            position: absolute;
                            display: flex;
                            flex-direction:column;
                            right:0%;
                            background-color: #fff;
                            border-radius: 4px;
                            border: solid 1px #2f00ff;
                            font-size: 18px;
                            font-weight: normal;
                            font-stretch: normal;
                            font-style: normal;
                            letter-spacing: -0.18px;
                            color: #222;
                            gap:4px;
                            cursor : pointer;
                            z-index : 999;
                            top: 7rem;
                            right: 1.5rem;
                        }
                        .tab{
                            display: flex;
                            align-items: center;
                            justify-content: left;
                            padding : 14px;
                            min-width: 9rem;
                            gap:6px;
                        }
                        .tab.warning{
                            color:#ff0062;
                        }
                        .tab:hover{
                            background-color: #e5e5e5;
                            font-weight: bold;
                        }

                    `
                }
            </style>
        </>
    )
}   

export default React.memo(NameField);