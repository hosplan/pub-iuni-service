import { useEffect, useState } from "react";
import Content from "./content";
interface Props {
    type : string;
    alarms : Alarm[] | undefined;
    setAlarms : React.Dispatch<React.SetStateAction<AlarmContents | undefined>>;
}
export default function Container(props : Props){
 
    const TITLE : any = {
        "alarms": "알람",
        "shareTaskAlarms": "공유요청 받은 태스크"
    };

    return(
        <>
            <div className="content">
                <div className="content-header">
                    <div className="content-title">
                        {TITLE[props.type]}
                    </div>
                </div>
            </div>
            <div className="content-body">
            {
                props.alarms?.map((alarm : Alarm) => (
                    <>
                        <Content alarm={alarm} setAlarms={props.setAlarms} type={props.type}/>
                    </>
                ))
            }
            </div>
            <style jsx>
                {
                `
                .content{
                    display : flex;
                    width : 100%;
                    flex-direction : column;   
                    padding: 2.719rem 2.75rem;
                }
                .content-title{
                    font-size: 36px;
                    font-weight: 600;
                }
                .content-body{
                    display : flex;
                    flex-direction: column;
                    padding-top: 2.563rem;
                    width: 100%;
                    gap: 14px;
                }
                `
                }
            </style>
        </>
    )
}