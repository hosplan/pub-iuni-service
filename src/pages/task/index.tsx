import { useEffect, useState, useCallback } from "react"
import Layout from "../../app/layout"
import Boards from "./boards";
import * as BoardApi from "../../../public/api/board";
import { useRouter } from "next/router";
import { boardState, cardState } from "@/app/globalStates";
import { useRecoilState } from "recoil";
import * as BoardTaskMapAPI from "../../../public/api/boardTaskMap";
import * as TaskAPI from "../../../public/api/task";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import React from "react";
import Image from "next/image";
import ShareTask from "./shareTask";

function Page() {
    const router = useRouter();
    const [taskInfo, setTaskInfo] = useRecoilState(cardState);
    const [boards, setBoards] = useRecoilState(boardState);
    const [shareTasks, setShareTasks] = useState<any>([]);

    
    const create = useCallback(async () => {
        const temp_board = [...boards];
        const latestBoards = temp_board.sort((a : Board, b : Board) => b.boardOrder - a.boardOrder);
        renderBoard(await BoardApi.create({
            "name": "새로운 보드",
            "description": "새로만든 보드에요.",
            "boardOrder" : latestBoards[0].boardOrder + 1
        }));
    }, [boards]);

    const renderBoard = useCallback((data: Board) => {
        setBoards((pre: Board[]) => {
            return [data, ...pre];
        });
    }, []);

    //공유 태스크 불러오기
    const loadShareTask = useCallback(async () => {
        const result = await TaskAPI.loadShareTask();
        if(result.token_error !== "noToken" && result.token_error !== "noAuth"){
            setShareTasks((props: any) => [...result, ...props]);
        }
    },[shareTasks]);

    //보드 불러오기
    const loadBoard = useCallback(async () => {
        const result = await BoardApi.load();

        if (result.length === 0) {
            const boardList = await BoardApi.initCreate();
            renderBoard(boardList);
        } else if (result.length > 0) {            
            setBoards(() => [...result]);
        }
    },[boards]);

    useEffect(() => {
        loadBoard();
        loadShareTask();
    }, []);

    //태스크 순번 업데이트
    const updateTaskOrder = useCallback(async (taskList: Array<any>, boardId: number) => {
        const update_data_list = [];
        for (const task of taskList) {
            let data = new Object();
            data = {
                "boardId": boardId,
                "taskId": task.id,
                "taskOrder": task.taskOrder
            };
            update_data_list.push(data);
        }
        return await BoardTaskMapAPI.updateTaskOrder(update_data_list);
    }, [])


    const updateMove = async (task: any, boardId: number, updateBoardId: number) => {
        const updateData = {
            "boardId": boardId,
            "updateBoardId": updateBoardId,
            "taskId": task.id
        }
        return await BoardTaskMapAPI.updateMove(updateData);
    }

    const reorder = (dataList: Array<any>) => {
        let count = 0;
        for (const data of dataList) {
            data.taskOrder = count;
            count++;
        }
        return dataList;
    }
    
    const moveForOtherBoard = async (sourceIndex: number, sourceDropId: number, destinationIndex: number, destinationDropId: number) => {
        const temp_taskInfo = JSON.parse(JSON.stringify(taskInfo));

        const temp_des_task_list = temp_taskInfo[destinationDropId];
        const temp_sou_task_list = temp_taskInfo[sourceDropId];
        const sourceTask = temp_sou_task_list[sourceIndex];
        //기존에 있던 보드 업데이트
        await updateMove(sourceTask, sourceDropId, destinationDropId);
        const source_list = temp_sou_task_list.filter((e: any) => e.id !== sourceTask.id);
        updateTaskOrder(source_list, sourceDropId);
        temp_taskInfo[sourceDropId] = [...reorder(source_list)];

        //새로 옮기는 보드 업데이트
        temp_des_task_list.splice(destinationIndex, 0, sourceTask);
        updateTaskOrder(reorder(temp_des_task_list), destinationDropId);
        setTaskInfo((pre) => {
            return { ...temp_taskInfo }
        });
    }

    const moveForSameBoard = async (sourceIndex: number, destinationIndex: number, destinationDropId: number) => {
        const temp_taskInfo = JSON.parse(JSON.stringify(taskInfo));
        let temp_taskList = temp_taskInfo[destinationDropId];
        const temp_task = temp_taskList[sourceIndex];

        let source_taskList = temp_taskList.filter((e: any) => e.id !== temp_task.id);
        source_taskList.splice(destinationIndex, 0, temp_task);
        source_taskList = reorder(source_taskList);

        updateTaskOrder(source_taskList, destinationDropId);
        temp_taskInfo[destinationDropId] = [...source_taskList];
        setTaskInfo(() => {
            return { ...temp_taskInfo };
        });

    }

    const onDragEnd = ({ source, destination }: DropResult) => {
        //recoil에 들어있는 보드, 카드의 위치변경을 위한 작업이 들어가야 된다.
        //index : taskOrder, droppableId : boardId

        if (destination && (source.droppableId === destination?.droppableId)) {
            moveForSameBoard(source.index, destination.index, Number(destination.droppableId));
        } else if (destination && (source.droppableId !== destination?.droppableId)) {
            moveForOtherBoard(source.index, Number(source.droppableId), Number(destination.index), Number(destination.droppableId));
        }
    }
    return (
        <>
            <div className="container g-c-item">
                <div className="board-container">
                    <Image
                        className={"mobile-image-logo"}
                        width={"10.625rem"}
                        height={"2.5rem"}
                        src={"/images/mobile-logo.webp"} />
                    <div className="board-flex-content">
                        <DragDropContext onDragEnd={onDragEnd}>
                            {
                                boards.map((e: Board) =>
                                    <Boards key={e.id}
                                        board={e}
                                        setBoards={setBoards} />
                                )
                            }
                        </DragDropContext>
                        <div className="share-board">
                            <div className="board-header">
                                <div className="borad-name name-se-badge b-share">
                                    공유 보드
                                </div>
                            </div>
                            <div className="share-board-body">
                                {
                                    shareTasks.map((task : any) => (
                                        <ShareTask task={task} setTasks={setShareTasks} key={`share-${task.id}`}/>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="board-add-btn" onClick={() => create()}>
                            <div className="board-title">
                                <Image
                                    width={"23.5px"}
                                    height={"23.5px"}
                                    src={"/images/board-btn.webp"} />
                                보드추가
                            </div>
                        </div>
                    </div>
                </div>
                <div className="board-add-btn-small" onClick={() => create()}>
                    <Image
                        width={"23.5px"}
                        height={"23.5px"}
                        src={"/images/board-btn-small.webp"} />
                </div>
            </div>
            <style jsx>{`
               .share-board{
                    display: flex;
                    flex-direction: column;
                    gap:16px;
                    min-width: 28.125rem;
                    border: 1px solid #efefef;
                    border-radius: 24px;
                    background-color: #e6e8ff;
                    
                    padding: 1.5rem;
                    min-height: 100%;    
                }
                .share-board-title{
                    display:flex;
                    width : fit-content;
                    gap : 6px;
                }
                .share-board-body{
                    display: flex;
                    flex-direction: column;
                    height: auto;
                    gap: 16px;
                }
                .share-board-header{
                    display: flex;
                    width:100%;
                    justify-content: space-between;
                    align-items : center;
                    gap:15px;
                }
                .share-board-body::-webkit-scrollbar {
                    width: 6px;
                }
                .share-board-body::-webkit-scrollbar-thumb {
                    background-color: #e5e5e5;
                    border-radius: 5px;
                }
                .share-board-body::-webkit-scrollbar-track {
                    background-color: #fff;
                    fborder-radius: 5px;
                }
                .mobile-image-logo{
                    display : none;
                }
                .board-add-btn-small{
                    position:absolute;
                    display : flex;
                    justify-content: center;
                    align-items: center;
                    width: 48px;
                    height: 48px;
                    background-color: #1120ff;
                    border-radius: 6px;
                    z-index: 500;
                    bottom: 1rem;
                    right:3%;
                }
                .container{
                    width: 100%;
                    height: 100%;
                    padding : 2.75rem;
                    overflow: auto;
                }
                .board-container{
                    position: relative;
                    width:fit-content;
                    height:100%;
                }
                .board-flex-content{
                    display:flex;
                    flex-wrap:nowrap;
                    width:100%;
                    height:100%;
                    gap :1.25rem;
                }
                .board-title{
                    display: flex;
                    align-items : center;
                    font-size: 18px;
                    font-weight: 500;
                    gap: 4.5px;
                }
                .container::-webkit-scrollbar {
                    width: 13px;
                }
                .container::-webkit-scrollbar-thumb {
                    background-color: #e5e5e5;
                    border-radius: 5px;
                }
                .container::-webkit-scrollbar-track {
                    background-color: #fff;
                    border-radius: 5px;
                }
                
                .task-grid{
                    display : grid;
                    grid-template-rows : 1fr;
                    grid-template-columns : repeat(auto-fill, 28.125rem);
                    gap :1.25rem;
                    width : 100%;
                    height : 100%;
                    background : #fff;
                    padding : 2.75rem;
                }

                .board-add-btn{
                    display:grid;
                    justify-items: center;
                    align-items: center;
                    min-width : 28.125rem;
                    height: 100%;
                    border-radius: 24px;
                    background-color: #f2f3ff;
                    padding: 1.5rem;
                    cursor: pointer;
                }
                
                @media (max-width: 770px){
                    .container{
                        padding: 0;
                    }
                    .board-container{
                        position: relative;
                        width:100%;
                        height:100%;
                        padding-left : 12px;
                        padding-right: 12px;
                        padding-top:18px;
                        padding-bottom: 4.3rem;
                    }
                    .board-add-btn{
                        min-width : -webkit-fill-available;
                        height: 100%;
                    }
                    .board-flex-content{
                        padding-top: 12px;
                    }
                    .mobile-image-logo{
                        display: block;
                    }
                    .board-add-btn-small{
                        display: none;
                    }
                    .share-board{
                        min-width : -webkit-fill-available;
                    }
                    .share-board-header{
                        flex-wrap: wrap;
                    }
                }
            `}
            </style>
        </>
    )
}
export default Page;
Page.getLayout = function getLayout(page: React.ReactElement) {
    return (<Layout>{page}</Layout>)
}