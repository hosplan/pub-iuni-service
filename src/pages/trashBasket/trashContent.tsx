import { useEffect, useState } from "react"
import TrashAlert from "./trashAlert"
import TrashIcon from "./trashIcon"
import * as TrashAPI from "../../../public/api/trashBasket";
import { useRecoilState } from "recoil";
import { log } from "console";
import { trashState, trashListState } from "@/app/globalStates";

interface Trash {
    type : number;
    name : string;
    trashId : number;   
    createDate:Date;
    id: number;
}
export default function TrashContent(){
    const [tab, setTab] = useState<boolean>(false);
    const [trashList, setTrashList] = useRecoilState<Trash[]>(trashListState);
    const [trashInfo, setTrashInfo] = useRecoilState(trashState);
        //태스크 불러오기
    const load = async () => {
        // setTrashList([]);
        const loadData = await TrashAPI.load();
        const _inputData = await loadData.map((rowData:Trash) => ({
            type: rowData.type,
            name: rowData.name,
            trashId: rowData.trashId,
            createDate: rowData.createDate,
            id: rowData.id
        }));
        setTrashList(_inputData);
    }
    
    useEffect(() => {
        const dataList = load();
    }, []);
    

    return(
        <>
            {
                tab && 
                <TrashAlert setTab={setTab} targetId={trashInfo.id} type={trashInfo.type} name={trashInfo.name} createDate={trashInfo.createDate} trashId={trashInfo.trashId}/>
            }
            
            <div className="box">
                {
                    trashList && trashList.map((trash: Trash) => (
                            <TrashIcon key={trash.id} targetId={trash.id} type={trash.type} name={trash.name} createDate={trash.createDate} trashId={trash.trashId} setTab={setTab}/>
                    ))
                }
            </div>
            <style jsx>
                {
                    `
                    .box{
                        display : flex;
                        width: 100%;
                        flex-wrap : wrap;
                        gap : 8px;
                    }
                    
                    `


                }
            </style>
        </>
    )
}