type Trash = {
    type : number;
    name : string;
    trashId : number;   
    createDate:Date;
    id: number;
}
interface Props {
    trashInfo : Trash | undefined;
    setTab : React.Dispatch<React.SetStateAction<boolean>>;
    setTrashInfo : React.Dispatch<React.SetStateAction<any>>
}
export default function TrashIcon(props: Props) {
    return (
        <>
            <div className="trash" onClick={() => {
                props.setTab(() => true);
                props.setTrashInfo((d : Trash) => {
                    const data = {
                        id:props.trashInfo?.id,
                        type : props.trashInfo?.type,
                        name : props.trashInfo?.name,
                        createDate: props.trashInfo?.createDate,
                        trashId : props.trashInfo?.trashId
                    }
                    return {...data};
                });
            }}>
                <img className="trash_img" src={ props.trashInfo?.type === 0 ? "/images/trash_task.webp" : "/images/trash_board.webp"} />
                <div className="name">{props.trashInfo?.name}</div>
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