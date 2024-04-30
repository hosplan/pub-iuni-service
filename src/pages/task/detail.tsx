import { useEffect, useRef, useState } from "react";
import * as TaskAPI from "../../../public/api/task";
import '@toast-ui/editor/dist/toastui-editor.css';
import 'prismjs/themes/prism.css'
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css'
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import "tui-editor-plugin-font-size/dist/tui-editor-plugin-font-size.css";

import NameField from "./nameField";
import DateField from "./dateField";
import MemberField from "./memberField";
import StatusField from "./statusField";
import dynamic from "next/dynamic";
const EditorBox = dynamic(()=> import('../../app/editorBox'), {ssr : false}); 

interface Props {
    task: Task;
    setTask: React.Dispatch<React.SetStateAction<Task>>;
    setDetail: React.Dispatch<React.SetStateAction<boolean>>;
    moveTrash: (taskId: number) => void;
    boardId: number;
}

export default function Detail(props: Props) {
    //테스크 정보

    const update = async () => { const result = await TaskAPI.update(props.task); }
    const navRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        function handleFocus(e: any) {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                props.setDetail(() => false);
            }
        }
        document.addEventListener("mouseup", handleFocus);
        return () => { document.removeEventListener("mouseup", handleFocus) }
    }, [containerRef]);

    //상세화면 기본 높낮이 설정
    // useEffect(() => {
    //     setBodyHeight(containerRef.current!.clientHeight - (navRef.current!.clientHeight + headerRef.current!.clientHeight));
    // },[]);

    return (
        <>
            <div className="container" ref={containerRef}>
                <div className="container-nav" ref={navRef}>
                    <div className="bread-comb-name">
                        {
                            props.boardId === -1 ? "공유 태스크" : "나의 할 일"
                        }
                    </div>
                    <div className="close-detail" onClick={() => props.setDetail(() => false)}>
                       
                    </div>
                </div>
                <div className="content" ref={headerRef}>
                    <div className="header">
                        <NameField
                            task={props.task}
                            setTask={props.setTask}
                            setDetail={props.setDetail}
                            update={update}
                            moveTrash={props.moveTrash}
                            boardId={props.boardId} />

                        <DateField
                            task={props.task}
                            setTask={props.setTask}
                            update={update}
                        />
                        
                        <MemberField task={props.task}
                            setTask={props.setTask}
                            update={update}
                        />

                        <StatusField task={props.task}
                            setTask={props.setTask}
                            update={update}
                            boardId={props.boardId}
                        />
                    </div>

                    <div className="body" style={{height: '80%' }}>
                        <EditorBox task={props.task} 
                        setTask={props.setTask} 
                        update={update}
                        />    
                    </div>
                    
                    <div className="footer">

                    </div>
                </div>
            </div>
            <style jsx>
                {
                    `
                    .container{
                        position : fixed;
                        display: flex;
                        flex-direction: column;
                        width : 50%;
                        height: 100%;
                        background-color: #fff;
                        top:0%;
                        left:50%;
                        z-index:9999;
                        border: 1px solid #e4e4e4;
                    }
                    .close-detail{
                        width:1.5rem;
                        height:1.5rem;
                        cursor:pointer;
                        background-image: url("/images/default/close-detail.webp");
                        background-size: cover;
                        background-position: center;
                    }
                    .close-detail:hover{
                        background-image: url("/images/hover/close-detail.webp");
                        background-size: cover;
                        background-position: center;
                    }
                    
                    .detail-close-btn{
                        width:1.5rem;
                        height: 1.5rem;
                    }
                    .container-nav{
                        display : flex;
                        justify-content: space-between;
                        align-items:center;
                        border-bottom: 1px solid #e4e4e4;
                        padding-left: 1.5rem;
                        padding-right : 1.5rem;
                        padding-top: 0.7rem;
                        padding-bottom: 0.7rem;
                        width:100%;
                        height: 2.875rem;
                    }
                    .bread-comb-name{
                        font-size: 1rem;
                        font-weight: 500;
                        font-stretch: normal;
                        font-style: normal;
                        letter-spacing: -0.16px;
                        color: #4e4e4e;
                    }
                    .content{
                        display : flex;
                        flex-direction : column;
                        padding : 2.125rem;
                        width:100%;
                        height: 100%;
                    }
                    .header{
                        display: flex;
                        flex-direction: column;
                        
                    }
                    .body{

                    }
                    .footer{
                        
                    }
                    @media(max-width: 770px){
                        .container{
                            width : 100%;
                            z-index: 9998;
                            left: 0%;
                            padding-bottom:4.3rem;
                        }
                     
                    }
                `
                }
            </style>
        </>
    )
}