import { useEffect, useRef, useState } from "react";
import * as BoardAPI from "../../../public/api/board";
import * as StatusAPI from "../../../public/api/status";
import { useRecoilState } from "recoil";
import { cardState } from "@/app/globalStates";
import * as BoardTaskMapAPI from "../../../public/api/boardTaskMap";

interface Props {
    task: Task;
    setTask: React.Dispatch<React.SetStateAction<Task>>;
    update: () => void;
    boardId: number;
}

export default function StatusField(props: Props) {
    const [statusList, setStatusList] = useState<Status[]>([]);
    const [boardList, setBoardList] = useState<Board[]>([]);

    const [statusTab, setStatusTab] = useState<boolean>(false);
    const [boardTab, setBoardTab] = useState<boolean>(false);

    const [currentStatus, setCurrentStatus] = useState<string>("");
    const [currentBoard, setCurrentBoard] = useState<string>("");

    const [taskInfo, setTaskInfo] = useRecoilState(cardState);

    const statusTabRef = useRef<HTMLDivElement>(null);
    const boardTabRef = useRef<HTMLDivElement>(null);

    const loadStatus = async () => {

        const result = await StatusAPI.loadByType("task");
        setStatusList((pre) => [...pre, ...result]);
        setCurrentStatus(() => props.task.status === null ? "없음" : props.task.status.name);
    }

    const loadBoard = async () => {
        //공유 보드일시 종료
        if (props.boardId === -1) {
            return false;
        }
        const result = await BoardAPI.load();
        setBoardList((pre) => [...pre, ...result]);
        const currentBoard = result.find((b: any) => b.id === props.boardId);
        setCurrentBoard(() => currentBoard.name);
    }

    const updateBoard = async (data: Board) => {
        const tempTaskInfo = JSON.parse(JSON.stringify(taskInfo));
        const oldTaskList = tempTaskInfo[props.boardId];
        tempTaskInfo[props.boardId] = oldTaskList.filter((e: Task) => e.id !== props.task.id);

        const newTaskList = tempTaskInfo[data.id];
        tempTaskInfo[data.id] = [...newTaskList, props.task];

        setTaskInfo(() => {
            return { ...tempTaskInfo }
        });

        const updateData = {
            "taskId": props.task.id,
            "boardId": props.boardId,
            "updateBoardId": data.id
        }

        BoardTaskMapAPI.updateMove(updateData);
        setBoardTab(() => false);

    }

    const updateStatus = async (data: Status) => {
        props.setTask((pre: Task) => {
            pre.statusId = data.id;
            pre.status = data;
            return { ...pre };
        });

        setCurrentStatus(() => {
            const result = statusList.find(e => e.id === data.id)?.name;
            return result === undefined ? "없음" : result;
        })

        setStatusTab(() => false);

        props.update();
    }



    useEffect(() => {
        loadStatus();
        loadBoard();
    }, []);

    useEffect(() => {
        function handleFocus(e: any) {
            if (statusTabRef.current && !statusTabRef.current.contains(e.target)) {
                setStatusTab(() => false);
            }
        }
        document.addEventListener("mouseup", handleFocus);
        return () => { document.removeEventListener("mouseup", handleFocus); }
    }, [statusTabRef]);

    useEffect(() => {
        function handleFocus(e: any) {
            if (boardTabRef.current && !boardTabRef.current.contains(e.target)) {
                setBoardTab(() => false);
            }
        }
        document.addEventListener("mouseup", handleFocus);
        return () => { document.removeEventListener("mouseup", handleFocus); }
    }, [boardTabRef]);

    return (
        <>
            <div className="status-space">
                <div className="task-status-field">
                    <div className="field-label">상태</div>
                    <div className="status-badge" onClick={() => setStatusTab(true)}>
                        {currentStatus}
                    </div>
                    {
                        statusTab &&
                        <div className="tab-container" ref={statusTabRef}>
                            {
                                statusList.map((d: Status) => (
                                    <div className="tab" key={d.id} onClick={() => updateStatus(d)}>
                                        {d.name}
                                    </div>
                                ))
                            }
                        </div>
                    }
                </div>

                <div className="board-status-field">
                    <div className="field-label">보드</div>
                    {
                        props.boardId === -1 ?
                        <>
                            <div className="status-badge">
                                공유보드
                            </div>
                        </>
                        
                        :
                        <>
                            <div className="status-badge" onClick={() => setBoardTab(true)}>
                                {currentBoard}
                            </div>
                            {
                                boardTab &&
                                <div className="board-tab-container" ref={boardTabRef}>
                                    {
                                        boardList.map((d: Board) => (
                                            <div className="tab" key={d.id} onClick={() => updateBoard(d)}>
                                                {d.name}
                                            </div>
                                        ))
                                    }
                                </div>
                            }
                        </>
                    }

                </div>
            </div>
            <style jsx>
                {
                    `
                        .status-space{
                            display: flex;
                            width:100%;
                            gap:24px;
                            padding-top: 24px;
                            padding-bottom:24px;
                        }
                        .status-badge{
                            padding: 6px 14px;
                            border-radius: 6px;
                            background-color: #f2f3ff;
                            color: #1120ff;
                            font-size: 17px;
                            font-weight: 600;
                            cursor: pointer;
                        }
                        .task-status-field{
                            position:relative;
                            display:flex;
                            gap:8px;
                            align-items: center;
                        }
                   
                        .field-label{
                            font-size: 14px;
                            font-weight: 600;
                            font-stretch: normal;
                            font-style: normal;
                            letter-spacing: -0.14px;
                            color: #222;
                        }
                        .board-status-field{
                            position:relative;
                            display:flex;
                            gap:8px;
                            align-items: center;
                        }
                       
                        .board-tab-container{
                            position: absolute;
                            display: flex;
                            flex-direction:column;
                            right:0%;
                            background-color: #fff;
                            border-radius: 4px;
                            font-size: 18px;
                            font-weight: normal;
                            font-stretch: normal;
                            font-style: normal;
                            letter-spacing: -0.18px;
                            color: #ff0062;
                            gap:4px;
                            cursor : pointer;
                            z-index : 999;
                            top: 9%;
                            left: 25%;
                            min-width:12rem;
                            border: solid 1px #2f00ff;
                        }
                        .board-tab-container:hover{
                            border: solid 1px #2f00ff;
                        }
                        .tab-container{
                            position: absolute;
                            display: flex;
                            flex-direction:column;
                            right:0%;
                            background-color: #fff;
                            border-radius: 4px;
                            font-size: 18px;
                            font-weight: normal;
                            font-stretch: normal;
                            font-style: normal;
                            letter-spacing: -0.18px;
                            color: #ff0062;
                            gap:4px;
                            cursor : pointer;
                            z-index : 999;
                            top: 9%;
                            left: 40%;
                            min-width:6rem;
                            border: solid 1px #2f00ff;
                        }
                        .tab-container:hover{
                            border: solid 1px #2f00ff;
                        }
                        .tab{
                            display: flex;
                            flex-wrap : no-wrap;
                            align-items: center;
                            justify-content: left;
                            padding : 14px;
                            gap:6px;
                        }
                        
                        .tab:hover{
                            color:#1120ff;
                            background-color: #f2f3ff;
                        }
                        
                    `
                }

            </style>
        </>
    )
}