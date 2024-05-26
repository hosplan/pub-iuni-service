import { trashState, trashListState } from "@/app/globalStates";
import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import Image from "next/image";
import { prettyDate, stringToDate, prettyDateTime } from "../../../public/common/common";
import * as TrashAPI from "../../../public/api/trashBasket";
interface Props {
    type: number;
    name: string;
    targetId: number;
    createDate: string;
    trashId: number;
    setTab: React.Dispatch<React.SetStateAction<boolean>>
}
interface Trash {
    type: number;
    name: string;
    trashId: number;
    createDate: string;
    id: number;
}
export default function (props: Props) {
    const tabRef = useRef<any>();
    const [trashInfo, setTrashInfo] = useRecoilState(trashState);
    const [trashList, setTrashList] = useRecoilState<Trash[]>(trashListState);
    useEffect(() => {
        function handleFocus(e: any) {
            if (tabRef.current && !tabRef.current.contains(e.target)) {
                props.setTab(() => false);
            }
        }
        document.addEventListener("mouseup", handleFocus);
        return () => { document.removeEventListener("mouseup", handleFocus) };
    }, [tabRef]);
    const reload = (id: number) => {
        setTrashList([...trashList].filter(trash => {
            return trash.id !== id;
        }));
    }
    const restore = async (id: number) => {
        await TrashAPI.restore(id);
        reload(id);
        props.setTab(() => false);
    }
    const remove = async (id: number) => {
        await TrashAPI.remove(id);
        reload(id);
        props.setTab(() => false);
    }
    return (
        <>
            <div className="trash-confirm-container ac jc" ref={tabRef}>
                <div className="container-header">
                    <div className="close-btn" onClick={() => props.setTab(() => false)}>
                        <Image 
                            className="close-btn-img"
                            width={"32px"}
                            height={"32px"}
                            src={"/images/default/delete-btn.webp"} />
                    </div>
                </div>
                <img className="trash-img" src={props.type === 0 ? "/images/trash_task.webp" : "/images/trash_board.webp"} />
                <div className="trash-type">{props.type == 0 ? "태스크" : props.type == 1 ? "보드" : ""}</div>
                <div className="data-container">

                    <div className="name-container">
                        <div className="title-tab ac">
                            <span>이름</span>
                        </div>
                        <div className="content-tab ac">
                            <span>{props.name}</span>
                        </div>
                    </div>
                    <div className="date-container">
                        <div className="title-tab ac">
                            <span>삭제일</span>
                        </div>
                        <div className="content-tab ac">
                            <span>{prettyDateTime(stringToDate(props.createDate))}</span>
                        </div>
                    </div>
                </div>
                <div className='button-container'>
                    <button className='button red ac jc' onClick={async () => remove(props.targetId)}>
                        <span>삭제</span>
                    </button>
                    <button className='button blue ac jc' onClick={async () => restore(props.targetId)}>
                        <span>복원</span>
                    </button>
                </div>
            </div>
            <style jsx>
                {
                    `
                .ac{align-items:center;}
                .jc{justify-content:center;}
                .trash-confirm-container{
                    display:flex;
                    flex-direction: column;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 30rem;
                    height: 30rem;
                    padding: 1.25rem;
                    border-radius: 14px;
                    box-shadow: 0 0 12px 0 rgba(34, 34, 34, 0.14);
                    background-color: #fff;
                    z-index:999;
                }
                .close-btn{
                    cursor:pointer;
                }
                .container-header{
                    display: flex;
                    width:100%;
                    height: 30%;
                    flex-direction:row;
                    justify-content:flex-end;
                    
                }
                .trash-img{
                    height: 10rem;
                    width: 10rem;
                }
                .data-container{
                    width:100%;
                    height:15rem;
                    padding: 2rem;
                    display:flex;
                    flex-direction: column;
                    gap:16px;
                }
                .name-container,.date-container,.type-container{
                    display:flex;
                    width:100%;
                }
                .trash-type{
                    margin-top:1em;
                    font-size: 20px;
                    font-weight: 300;
                    color: #7a7a7a;
                    font-stretch: normal;
                    font-style: normal;
                    letter-spacing: -0.24px;
                
                }
                .title-tab{
                    display:flex;
                    font-size: 18px;
                    font-weight: 300;
                    color: #7a7a7a;
                    font-stretch: normal;
                    font-style: normal;
                    letter-spacing: -0.24px;
                    text-align: left;
                    width:20%;
                }
                .content-tab{
                    display:flex;
                    font-size: 18px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    letter-spacing: -0.24px;
                    text-align: left;
                    color: #222;
                    width: 80%;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    word-break: break-all;
                }
                .content-tab>span{
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    word-break: break-all;
                }
                .button-container{
                    display:flex;
                    justify-content:flex-end;
                    gap:1rem;
                    width:90%;
                }
                .button{
                    cursor:pointer;
                    border-radius:4px;
                    height:3rem;
                    width:5.4rem;
                    color:white;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    border:none;
                    text-align:center;
                    box-sizing: content-box;
                    font-size:1rem;
                }
                .button.red{
                    background-color:#FF0062;
                }
                .button.blue{
                    background-color:#1120ff;
                }
                `
                }
            </style>
        </>

    )
}