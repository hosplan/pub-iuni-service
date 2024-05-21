interface Props {
    type : number;
    name : string;
    key : number;
    createDate: Date;
    trashId : number;
    targetId : number;
    setTab : React.Dispatch<React.SetStateAction<boolean>>;
}
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { trashState } from "@/app/globalStates";
export default function TrashIcon(props: Props) {
    const [trashInfo, setTrashInfo] = useRecoilState(trashState);
    return (
        <>
            <div className="trash" onClick={() => {
                props.setTab(() => true);
                setTrashInfo({
                    id:props.targetId,
                    type : props.type,
                    name : props.name,
                    createDate: props.createDate,
                    trashId : props.trashId
                });
            }}>
                <img className="trash_img" src={ props.type === 0 ? "/images/trash_task.webp" : "/images/trash_board.webp"} />
                <div className="name">{props.name}</div>
            </div>
            <style jsx>
                {
                    `
                    .trash{
                        box-sizing:content-box;
                        display: flex;
                        justify-content : center;
                        align-content: center;
                        align-items: center;
                        flex-direction : column;
                        width: 120px;
                        height:120px;
                        border: 2px solid transparent;
                        border-radius: 8px;
                        gap:4px;
                        padding: 4px 0px;
                        cursor: pointer;
                    }
                    .trash:hover{
                        border : 2px solid #0086ea;
                    }
                    .trash_img{
                        width: 60px;
                        height: 60px;
                        object-fit:contain;
                    }
                    .name{
                        text-align:center;
                        width:100%;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        word-break: break-all;
                    }
                    `


                }
            </style>
        </>
    )
}