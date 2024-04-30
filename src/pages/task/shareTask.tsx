import React, { useEffect, useRef, useState } from "react";
import * as IuniStyleApi from "../../../public/api/iuniStyle";
import { prettyDate } from "../../../public/common/common";
import * as TaskAPI from "../../../public/api/task";
import Image from "next/image";
import MemberIconContainer from "./memberIconContainer";
import Detail from "./detail";
import PartyMember from "../partyMember/partyMember";
import ShareTaskTab from "../tab/shareTaskTab";
import * as ShareMemberAPI from "../../../public/api/shareMember";
interface Props {
    task: any;
    setTasks : React.Dispatch<React.SetStateAction<any>>
}

function ShareTask(props: Props) {

    //공유 태스크 연결 끊기
    const disconnectShare = async () => {
        const result = await ShareMemberAPI.disconnect(props.task.id);
 
        
        if(result === 1){
            props.setTasks((t: any) => {
                const data = t.filter((d: any) => d.id !== props.task.id);
                return [...data];
            });
        }
    }
    
    const makeDuringDate = (startDate: Date | null, endDate: Date | null) => {
        if (!startDate || !endDate) {
            return (
                <><div></div></>
            );
        } else {
            startDate = new Date(startDate);
            endDate = new Date(endDate);

            const duringDate = (endDate: Date) => {
                let today = new Date();
                let result = (Math.floor((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)))
                if (result < 0) {
                    return "초과";
                } else if (result === 0) {
                    return "D-Day";
                } else {
                    return `D-${String(result)}`;
                }
            }
            return (
                <>
                    {
                        props.task?.statusId !== 3 &&
                        <div className="during-date-badge">{duringDate(endDate)}</div>
                    }
                    <div>{prettyDate(startDate)}</div>
                    <div>~</div>
                    <div>{prettyDate(endDate)}</div>
                </>
            );
        }
    }
    const [tab, setTab] = useState<boolean>(false);
    const [joinTab, setJoinTab] = useState<boolean>(false);
    const [avatars, setAvatars] = useState<any>([]);
    const [detail, setDetail] = useState<boolean>(false);
    const [task, setTask] = useState<Task>(props.task);
    const [partyMemberTab, setPartyMemberTab] = useState<boolean>(false);

    const btnRef = useRef<any>();
    const tabRef = useRef<any>();
    //탭 열기
    const openTab = (e: any) => {
        e.stopPropagation();
        setTab((d: Boolean) => !d);
    }

    //참여인원 정보 가져오기
    const loadJoinMember = async () => {
        // props.task.memberId;
        const dataList = [];
        
        for (const taskMemberMap of props.task.taskMemberMapList) {
            if(taskMemberMap.mapType==="JOIN" || taskMemberMap.mapType==="owner"){
                dataList.push(taskMemberMap.memberId);
            }
        }
        const result: any[] = await IuniStyleApi.loadMemberIuni(dataList);
        setAvatars((props: any) => [...result, ...props]);
    }

  

    useEffect(() => {
        loadJoinMember();
    }, []);
    //탭 이벤트 주입
    useEffect(() => {
        const handleFocus = (e: any) => {
            if (tabRef.current && !tabRef.current.contains(e.target) && !btnRef.current?.contains(e.target)) {
                setTab(() => false);
            }
        }

        document.addEventListener("mouseup", handleFocus);
        return () => { document.removeEventListener("mouseup", handleFocus) }
    }, [tabRef]);

    const openDetail = async (e: any) => {
        e.stopPropagation();

        //const result = await TaskAPI.get(props.task.id);
        // props.setTasks((t : any) => {
        //     const data = t.find((d : any) => d.id === props.task.id);
            
        // })

        setTask((task : any) => {
            task.startDate = task.starDate !== null ? new Date(task.startDate) : null;
            task.endDate = task.endDate !== null ? new Date(task.endDate) : null;
            task.statusId = task.status?.id;
            task.statusName = task.status?.name;
            return { ...task };
        });

        setDetail((d: Boolean) => !d);
    }

    const openPartyMemberTab = () => {
        setPartyMemberTab(() => true);
        setTab(() => false);
    }
    return (
        <>
            {
                detail && <Detail
                    task={task}
                    setTask={setTask}
                    boardId={-1}
                    setDetail={setDetail}
                    moveTrash={disconnectShare} />
            }
            {
                partyMemberTab &&
                <>
                    <PartyMember taskId={props.task.id} setPartyMemberTab={setPartyMemberTab} />
                </>
            }
            <div className="card" onClick={(e) => openDetail(e)}>
                <div className="card-header">
                    <div className="card-title">
                        {props.task?.name}
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
                                    <ShareTaskTab disconnectShare={disconnectShare} taskId={props.task?.id} openPartyMemberTab={openPartyMemberTab}/>
                                </div>
                            </>
                        }
                    </div>
                </div>
                <div className="card-body">
                    <div className="task-description" dangerouslySetInnerHTML={{ __html: props.task?.description }}>

                    </div>
                    <div className="badge-list">
                        {
                            props.task?.status &&
                            <div className="card-status-badge">{props.task?.status?.name}</div>
                        }
                    </div>
                </div>
                <div className="card-footer">
                    <div className="during-date">
                        {makeDuringDate(props.task?.startDate, props.task?.endDate)}
                    </div>
                    <div className="party-user-list">
                        <MemberIconContainer avatars={avatars} />
                    </div>
                </div>
            </div>
            <style jsx>{`
                .badge-list{
                    display : flex;
                    flex-direction :row;
                    gap:6px;
                }
                
                .card{
                    width: 100%;
                    min-height:fit-content;
                    max-height:300px;
                    padding: 14px 14px;
                    border-radius: 8px;
                    background-color: #fff;
                    cursor: pointer; 
                }
                
                .party-user-list{
                    display:flex;
                    flex-direction:row-reverse;
                    width : 7rem;
                    max-width:7rem;
                    justify-content:end;              
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

export default React.memo(ShareTask);