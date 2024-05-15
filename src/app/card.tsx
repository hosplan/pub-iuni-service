"use client"
import { useEffect, useRef, useState } from "react";
import * as BoardTaskMapAPI from "../../public/api/boardTaskMap";
import Detail from "../pages/task/detail";
import * as TaskAPI from "../../public/api/task";
import { prettyDate } from "../../public/common/common";
import { Draggable } from "react-beautiful-dnd";
import { RecoilState, useRecoilState } from "recoil";
import { cardState, iuniStyleState } from "./globalStates";
import React from 'react';
import ShareMember from "../pages/shareMember/shareMember";
import Image from "next/image";
import MemberIconContainer from "@/pages/task/memberIconContainer";
import PartyMember from "@/pages/partyMember/partyMember";

interface Props{
    boardId : number;
    task : Task,
    count : number;
}

function Card(props: Props){
    const [task, setTask] = useState<Task>(props.task);
    const [tab, setTab] = useState<boolean>(false);
    const [detail, setDetail] = useState<boolean>(false);
    const [taskInfo, setTaskInfo] = useRecoilState(cardState);
    const [iuniStyle, setIuniStyle] = useRecoilState(iuniStyleState);
    const [shareTab, setShareTab] = useState<boolean>(false);
    const [partyMemberTab, setPartyMemberTab] = useState<boolean>(false);

    const btnRef = useRef<any>();
    const tabRef = useRef<any>();
    

    const disconnectMap = async (taskId: number) => {
        return await BoardTaskMapAPI.removeByTaskId(taskId);
    }
    
    const disconnectTask = (taskId: number) => {
        const temp_taskInfo = JSON.parse(JSON.stringify(taskInfo));
        const taskList = temp_taskInfo[props.boardId];
        setTaskInfo((pre : any) => {
            const temp : any = {};
            temp[props.boardId] = taskList.filter((e:any) => e.id !== taskId);
            return { ...pre, ...temp };
        });
    }

    //삭제
    const moveTrash = async (taskId : number) => {
        await disconnectMap(taskId) 
            ? disconnectTask(taskId)
            : alert("태스크 삭제도 도중 문제가 발생했어요.");
    }
    
    //탭 이벤트 주입
    useEffect(() => {
        const handleFocus = (e : any) => {
            if (tabRef.current && !tabRef.current.contains(e.target) && !btnRef.current?.contains(e.target)) {
                setTab(() => false);
            }
        }

        document.addEventListener("mouseup", handleFocus);
        return () => { document.removeEventListener("mouseup", handleFocus)}
    },[tabRef]);

    const openDetail = async (e : any) => {
        e.stopPropagation();
    
        const result = await TaskAPI.get(task.id);

        setTask(() => {
            result.startDate = result.starDate !== null ? new Date(result.startDate) : null;
            result.endDate = result.endDate !== null ? new Date(result.endDate) : null;
            result.statusId = result.status?.id;
            result.statusName = result.status?.name;
            return {...result};
        });
        setDetail((d: Boolean) => !d);
    }

    const openTab = (e: any) => {
        e.stopPropagation();
        setTab((d: Boolean) => !d);
    }

    const makeDuringDate = (startDate : Date | null, endDate : Date | null) => {
        if(!startDate || !endDate) {
            return (
                <><div></div></>
            );
        } else {
            startDate = new Date(startDate);
            endDate = new Date(endDate);
            
            const duringDate = (endDate: Date) => {
                let today = new Date();
                let result = (Math.floor((endDate.getTime() - today.getTime()) / (1000*60*60*24)))
                if(result < 0) {
                    return "초과";
                } else if(result === 0) {
                    return "D-Day";
                } else {
                    return `D-${String(result)}`;
                }
            }
     
            return (
                <>
                    {
                        task.statusId !== 3 &&
                        <div className="during-date-badge">{duringDate(endDate)}</div>
                    }
                    <div>{prettyDate(startDate)}</div>
                    <div>~</div>
                    <div>{prettyDate(endDate)}</div>
                </>
            );
        }
    }
    return (
        <>
            {
                detail && <Detail 
                            task={task} 
                            setTask={setTask}
                            boardId={props.boardId}
                            setDetail={setDetail}
                            moveTrash={moveTrash} />
            }
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
            <Draggable key={String(!task ? "none" : task.id)} draggableId={String(!task ? "none" : task.id)} index={props.count}>
                {(provided, snapshot) => (
                    <div className={snapshot.isDragging ? "card shadow" : "card"} 
                        onClick={(e) => openDetail(e)}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                    <div className="card-header">
                        <div className="card-title">
                            {task?.name}
                        </div>
                        <div className="card-btn-list">
                            <div ref={btnRef}>
                                <Image
                                    src={`/images/default/card-other-btn.webp`}
                                    width={'24px'}
                                    height={'24px'}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openTab(e);
                                    }}
                                />
                            </div>
                           
                            {
                                tab &&
                                <>
                                    <div className="card-other-tab-container" ref={tabRef}>
                                        <div className="card-other-tab" onClick={(e) => {
                                            e.stopPropagation();
                                            moveTrash(task.id);
                                        }}>
                                            <Image 
                                                src={"/images/default/trash.webp"}
                                                width={"24px"}
                                                height={"24px"} />
                                            휴지통
                                        </div>
                                        <div className="card-other-tab" onClick={(e) => {
                                            e.stopPropagation();
                                            setShareTab(true);
                                            setTab(false);
                                        }}>                                         
                                            <Image 
                                                src={"/images/profile.webp"}
                                                width={"24px"}
                                                height={"24px"} />
                                            공유하기
                                        </div>
                                        {
                                            task.isShared &&
                                            <>
                                                <div className="card-other-tab" onClick={(e) => {
                                                    e.stopPropagation();
                                                    setPartyMemberTab(true);
                                                    setTab(false);
                                                    setShareTab(false);
                                                }}>
                                                     <Image 
                                                        src={"/images/profile.webp"}
                                                        width={"24px"}
                                                        height={"24px"} />
                                                        공유인원
                                                </div>
                                            </>
                                        }
                                    </div>
                                </>                            
                            }
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="task-description" dangerouslySetInnerHTML={{ __html : task?.description }}>
    
                        </div>
                        <div className="badge-list">
                            {
                                task.statusName &&
                                <div className="card-status-badge">{ task.statusName }</div>
                            }
                            {
                                task.isShared &&
                                <div className="card-status-badge">공유됨</div>
                            }
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="during-date">
                            { makeDuringDate(task?.startDate, task?.endDate)}
                        </div>
                        <div className="party-user-list">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 48 48" style={{ margin: "0 auto", cursor:"pointer" }}>
                                <path data-name="background" d="M24 0A24 24 0 1 1 0 24 24 24 0 0 1 24 0" style={{ fill: iuniStyle.background }} />
                                <path data-name="body" d="M33.945 10.305h-2.42l-3.337 6.936h-8.375l-3.337-6.936h-2.421S5.275 22.35 1.391 32.058a24 24 0 0 0 45.219 0c-3.885-9.708-12.665-21.753-12.665-21.753" style={{ fill: iuniStyle.body }} />
                                <path data-name="nose" d="m24 37.624-1.39-1.54h2.78z" style={{ fill: iuniStyle.nose }} />
                                <path data-name="left-eye-white" d="M16.119 35.59a5.3 5.3 0 1 1 5.3-5.3 5.3 5.3 0 0 1-5.3 5.3" style={{ fill: iuniStyle.leftWhiteEye }} />
                                <path data-name="left-eye" d="M16.119 33.153a2.865 2.865 0 1 1 2.864-2.865 2.865 2.865 0 0 1-2.864 2.865" style={{ fill: iuniStyle.leftEye }} />
                                <path data-name="right-eye-white" d="M31.882 35.59a5.3 5.3 0 1 1 5.3-5.3 5.3 5.3 0 0 1-5.3 5.3" style={{ fill: iuniStyle.rightWhiteEye }} />
                                <path data-name="right-eye" d="M31.882 33.153a2.865 2.865 0 1 1 2.864-2.865 2.865 2.865 0 0 1-2.864 2.865" style={{ fill: iuniStyle.rightEye }} />
                            </svg>
                        </div>
                    </div>
                </div>
                )}
            </Draggable>
            
            <style jsx>{`
                .card{
                    width: 100%;
                    min-height:fit-content;
                    max-height:300px;
                    padding: 14px 14px;
                    border-radius: 8px;
                    background-color: #fff;
                    cursor: pointer; 
                }
                .badge-list{
                    display: flex;
                    flex-direction : row;
                    gap: 6px;
                }
                .party-user-list{
                    display:flex;
                    algin-items:center;
                }

                .card:hover{
                    border: solid 1px #111fff;
                }
                .card-header{
                    display: flex;
                    justify-content: space-between; 
                }
                
                .task-description{
                    font-size:12px;
                    text-align: left;
                    max-height: 2.8rem;
                    overflow-y: hidden;
                    color: #7a7a7a;
                    margin-bottom:7px;
                }

                .card-other-tab-container{
                    position: absolute;
                    display: flex;
                    flex-direction: column;
                    right:0%;
                    background-color: #fff;
                    border-radius: 4px;
                    border: solid 1px #2f00ff;
                    font-size: 18px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    letter-spacing: -0.18px;
                    color: #ff0062;
                    gap:4px;
                    cursor : pointer;
                    z-index : 999;
                }
                
                .card-status-badge{
                    width:fit-content;
                    padding: 4px 9px 4px 10px;
                    border-radius: 6px;
                    background-color: #f2f3ff;
                    font-size: 12px;
                    font-weight: 600;
                    font-stretch: normal;
                    font-style: normal;
                    letter-spacing: -0.12px;
                    color: #1120ff;
                }
                
                .card-title{
                    display: flex;
                    font-size: 18px;
                    font-weight: 600;
                    font-stretch: normal;
                    font-style: normal;
                    letter-spacing: -0.18px;
                    text-align: left;
                    color: #222;
                    align-items: center;
                }
                
                .card-btn-list{
                    position: relative;
                    cursor: pointer;
                }
                
                .card-body{
                    border-bottom : 1px solid #e5e5e5;
                    padding-bottom:7px;
                }
                
                .card-footer{
                    display:flex;
                    padding-top:11px;
                    align-items : center;
                    justify-content: space-between;
                    
                }

                .card-other-tab{
                    display: flex;
                    justify-content: left;
                    align-item: center;
                    padding : 14px;
                    min-width: 9rem;
                    width: 100%;
                    gap: 6px;
                }

                .card-other-tab:hover{
                    background-color: #e5e5e5;
                    font-weight: bold;
                }
                .during-date{
                    display:flex;
                    gap:6px;
                    font-size: 12px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    letter-spacing: -0.12px;
                    color: #222;
                    align-items : center;
                }
            `}
            </style>
        </>
    )
}

export default React.memo(Card);