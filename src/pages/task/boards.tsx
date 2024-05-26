import { useCallback, useEffect, useRef, useState } from "react";
import * as BoardApi from "../../../public/api/board";
import * as TaskAPI from "../../../public/api/task";
import * as BoardTaskMapAPI from "../../../public/api/boardTaskMap";
import { useRecoilState, useRecoilValue } from "recoil";
import { boardState, cardState } from "@/app/globalStates";
import React from "react";
import { Droppable } from "react-beautiful-dnd";
import dynamic from "next/dynamic";
interface Props { board: Board; setBoards: React.Dispatch<React.SetStateAction<Board[]>>; }
interface BoardNameData { board: Board; }
interface TaskCountData { tasks: Task[] }
const Card = dynamic(()=> import('../../app/card'), {ssr : false}); 
import Image from "next/image";
//보드 이름
function BoardName(BoardNameData: BoardNameData) {
    
    const [name, setName] = useState<string>(BoardNameData.board?.name);
    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const [taskInfo, setTaskInfo] = useRecoilState(cardState);
    const [boards, setBoards] = useRecoilState(boardState);

    //이름 업데이트
    const updateName = async () => {
        const temp_list = [...boards];
        let temp_update_board = temp_list.find(e => e.id === BoardNameData.board?.id);

        if(temp_update_board){
            const update_board = JSON.parse(JSON.stringify(temp_update_board));
            let update_list : Board[] = await Promise.all(
                temp_list.map(async (data) => {
                    const temp = {...data};
                    if(temp.id === BoardNameData.board?.id){
                        temp.name = name;
                        update_board.name = name;
                    } 
                    return temp;
                })
            );
            
            const result = await BoardApi.update(update_board);
            if(result){
                setIsUpdate(() => false);
                setBoards(() => [...update_list]);
            }
            else {
                alert("업데이트 도중 오류가 발생 했어요.");
            }
        }
        
    }

    return <>
        {
            !isUpdate ? <div className="borad-name name-badge b-primary" onClick={() => setIsUpdate(() => true)}>{name}</div>
                : <input type="text" className="update-board-name"
                    value={name}
                    onChange={(e) => setName(() => e.target.value)}
                    onBlur={() => updateName()} />
        }
        <style jsx>{
            `
                .update-board-name{
                    font-family: Pretendard;
                    border-radius: 24px;
                    outline: none;
                    border : solid 1px #111fff;
                    padding-left : 15px;
                    padding-right : 15px;
                }
            `
        }
        </style>
    </>
}

function Boards(props: Props) {
    const [isActAddBtn, setIsActAddBtn] = useState<String>("default");
    const [isActOtherBtn, setIsActOtherBtn] = useState<String>("default");
    const [tab, setTab] = useState<Boolean>(false);
    const [taskInfo, setTaskInfo] = useRecoilState(cardState);
    const tabRef = useRef<any>();
    const btnRef = useRef<any>();

    //태스크 생성
    const renderTask = (data: Task) => {
        console.log(data);
        const temp_taskInfo = JSON.parse(JSON.stringify(taskInfo));
        const taskList = temp_taskInfo[props.board?.id];
        taskList.push(data);
        setTaskInfo(() => {
            return { ...temp_taskInfo }
        });
    }

    //boardTaskMap 테이블 삭제
    const disconnectMap = useCallback(async (boardId: number) => {
        return await BoardTaskMapAPI.removeByBoardId(boardId);
    }, []);

    //보드 삭제
    const remove = useCallback(async () => {
        const result = await disconnectMap(props.board?.id);
        
        if (result) {
            const removeResult = await BoardApi.moveTrash(props.board?.id);
            if (removeResult.result === "success") {
                props.setBoards((pre: Board[]) => [...pre.filter(d => d.id !== props.board?.id)]);
            }
        } else {
            alert("보드를 삭제하는 도중 문제가 발생 했습니다.");
        }
    }, [props.board]);

    const connectBoardTask = useCallback(async (board: Board, task: Task, index: number) => {
        return await BoardTaskMapAPI.create({
            task: task,
            board: board,
            taskOrder: index
        });
    }, []);
    
    const create = async () => {
        const newTask: Task = await TaskAPI.create({
            name: "새로운 할 일",
            description: "새로운 할 일 이에요",
            createDate: Date.now()
        });

        const result = await connectBoardTask(props.board, newTask, taskInfo[props.board.id].length);

        newTask["mapId"] = result?.id;
        newTask["taskOrder"] = result?.taskOrder;
        renderTask(newTask);
    };

    const updateTaskInfo = (task_list: any) => {
        console.log(task_list);
        return new Promise<void>((resolve, reject) => {             
            
            setTaskInfo((pre: any) => {
                const temp: any = {};
                temp[props.board?.id] = [...task_list];
                return { ...pre, ...temp };
            });
            resolve();
        })
    }

    //태스크 불러오기
    const load = async () => {
        const task_list = await TaskAPI.load(props.board?.id);
       updateTaskInfo(task_list);
    }

    //탭 이벤트 주입
    useEffect(() => {
        function handleFocus(e: any) {
            if (tabRef.current && !tabRef.current.contains(e.target) && !btnRef.current.contains(e.target)) {
                setTab(() => false);
            }
        }
        document.addEventListener("mouseup", handleFocus);
        return () => { document.removeEventListener("mouseup", handleFocus); }
    }, [tabRef]);

    useEffect(() => {
        load();
    }, []);

    const [enabled, setEnabled] = useState(false);
    useEffect(() => {
        const animation = requestAnimationFrame(() => setEnabled(true));
        return () => {
            cancelAnimationFrame(animation);
            setEnabled(false);
        }
    }, []);

    if (!enabled) {
        return null;
    }
 
    return (
        <>
        <Droppable droppableId={String(props.board.id)}>
            {(provided, snapshot) => (
                    <div className={snapshot.isDraggingOver ? "board shadow" : "board"} ref={provided.innerRef} {...provided.droppableProps}>
                    <div className="board-header">
                        <div className="board-title">
                            <BoardName board={props.board} />
                            <div className="borad-count count-badge bd-primary f-primary">
                                {taskInfo[props.board?.id]?.length}
                            </div>
                        </div>
                        <div className="board-btn-list">
                            
                            <img src={`/images/${isActOtherBtn}/board-other-btn.webp`}
                                ref={btnRef}
                                onMouseEnter={() => setIsActOtherBtn(() => "active")}
                                onMouseLeave={() => setIsActOtherBtn(() => "default")}
                                onClick={() => setTab(() => !tab)}
                                style={{ width: '2.375rem', height: '2.375rem' }} />

                            <img src={`/images/${isActAddBtn}/task-add-btn.webp`}
                                onMouseEnter={() => setIsActAddBtn(() => "active")}
                                onMouseLeave={() => setIsActAddBtn(() => "default")}
                                onClick={() => create()}
                                style={{ width: '2.375rem', height: '2.375rem', marginLeft: '0.3rem' }} />
                            {
                                tab &&
                                <div className="board-other-tab-container" ref={tabRef}>
                                    <div className="board-other-tab" onClick={() => remove()}>
                                        <Image 
                                            width={"24px"}
                                            height={"24px"}
                                            src={"/images/default/trash.webp"} />
                                        보드 삭제
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="board-body">
                        {
                            taskInfo[props.board?.id]?.map((task: Task, index:number) => (
                                <Card
                                        key={task?.id}
                                        boardId={props.board?.id}
                                        task={task}
                                        count={index}
                                    />
                            ))
                        }
                    </div>
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
          
            <style jsx>{`
                .board{
                    display: flex;
                    flex-direction: column;
                    gap:16px;
                    min-width: 28.125rem;
                    border-radius: 24px;
                    background-color: #efefef;
                    padding: 1.5rem;
                    min-height: 100%;    
                }
                .board-title{
                    display:flex;
                    width : fit-content;
                    gap : 6px;
                }
                .board-body{
                    display: flex;
                    flex-direction: column;
                    height: auto;
                    gap: 16px;
                }

                .board-body::-webkit-scrollbar {
                    width: 6px;
                  }
                .board-body::-webkit-scrollbar-thumb {
                    background-color: #e5e5e5;
                    border-radius: 5px;
                }
                .board-body::-webkit-scrollbar-track {
                    background-color: #fff;
                    fborder-radius: 5px;
                }

                .board-add-btn{
                    cursor: pointer;
                }
                .board-header{
                    display: flex;
                    width:100%;
                    justify-content: space-between;
                    align-items : center;
                    gap:15px;
                }
                .board-body{

                }
                .board-btn-list{
                    display: flex;
                    position:relative;
                }
                .board-other-tab{
                    position: absolute;
                    display: flex;
                    justify-content: center;
                    align-item: center;
                    padding : 14px;
                    min-width: 9rem;
                    right:50%;
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
                @media(max-width: 770px){
                    .board{
                        min-width : -webkit-fill-available;
                    }
                    .board-header{
                        flex-wrap: wrap;
                    }
                }
            `}
            </style>
        </>
    )
}

export default React.memo(Boards);