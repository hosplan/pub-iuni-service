import moment from "moment";
import { useEffect, useRef, useState } from "react"
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { prettyDate } from "../../../public/common/common";
import Image from "next/image";

interface Props {
    task: Task,
    setTask: React.Dispatch<React.SetStateAction<Task>>
    update: () => void
}

interface DuringDateInfo {
    [key:string] : string
}

export default function DateField(props: Props){
    
    const [tab, setTab] = useState<Boolean>(false);
    const [duringDateInfo, setDuringDateInfo] = useState<DuringDateInfo>();
    const tabRef = useRef<any>();
    const updateTaskData = (startDate : Date, endDate : Date) => {
        return new Promise<void>((resolve, reject) => {
            try{
                props.setTask((pre : Task) => {
                    pre.startDate = startDate;
                    pre.endDate = endDate;
                    return { ...pre }
                });
                resolve();
            }
            catch(e){
                throw e;
            }
        })
    }

    const updateDuringDateInfo = (startDate : Date, endDate : Date) => {
        setDuringDateInfo(() => {
            const duringDate = (endDate: Date) => {
                let today = new Date();
                let result = (Math.floor((endDate.getTime() - today.getTime()) / (1000*60*60*24)))
                if(result < 0) {
                    return "초과";
                } else if(result === 0) {
                    return "D-Day";
                } else {
                    return `D-${String(result)}`;
                }
            }

            const result = {
                'duringDate' : `${duringDate(endDate)}`,
                'startDate' : prettyDate(startDate),
                'endDate' : prettyDate(endDate)
            }
            return {...result};
        });
    }

    //초기 날짜 셋팅
    useEffect(() => {
        if(props.task.startDate !== null && props.task.endDate !== null){
            updateDuringDateInfo(props.task.startDate, props.task.endDate);
        }
    },[]);

    useEffect(() => {
        function handleFocus(e : any){
            if(tabRef.current && !tabRef.current.contains(e.target)){
                setTab(() => false);
            }
        }
        document.addEventListener("mouseup", handleFocus);
        return () => { document.removeEventListener("mouseup", handleFocus)}
    }, [tabRef]);
    
    return (
        <>
            <div className="date-space">
                {
                    duringDateInfo === undefined || duringDateInfo.startDate === null || duringDateInfo.endDate === null ?
                        <>
                            <div className="add-date-btn" onClick={() => setTab(() => true)}>                              
                                <Image 
                                    width={"18px"}
                                    height={"18px"}
                                    src={"/images/add-btn.webp"} />
                                일정추가
                            </div>
                        </> :
                        <>
                            <div className="during-date-badge">{duringDateInfo?.duringDate}</div>
                            <div className="field-label">태스크 기간</div>
                            <div className="date" onClick={() => setTab(() => true)}>{duringDateInfo?.startDate}</div>
                            <div className="date" onClick={() => setTab(() => true)}>~</div>
                            <div className="date" onClick={() => setTab(() => true)}>{duringDateInfo?.endDate}</div>
                        </>
                }
                {
                    tab&&
                    <>
                        <div className="tab-container" ref={tabRef} >
                        <p className="react-calendar-title">일정 설정하기</p>
                                <Calendar 
                                    formatDay={(locale, date) => moment(date).format('D')}
                                    selectRange={true}
                                    onChange={(data : any) => {
                                        updateDuringDateInfo(data[0], data[1]);
                                        updateTaskData(data[0], data[1])
                                            .then(() => {
                                                props.update();
                                                setTab(() => false);
                                        });
                                    }}
                                />
                        </div>
                    </>
                }
            </div>
            <style jsx>
                {
                    `
                        .date-space{
                            position:relative;
                            display : flex;
                            width : 100%;
                            gap:6px;
                            padding-top:10px;
                            padding-bottom:10px;
                            border-bottom:1px solid #e4e4e4;
                            font-size: 16px;
                            font-weight: normal;
                            font-stretch: normal;
                            font-style: normal;
                            letter-spacing: -0.12px;
                            text-align: left;
                            align-items:center;
                        }
                        .during-date-badge{
                            padding: 2px 6px;
                            border-radius: 4px;
                            background-color: #f2f3ff;
                            font-weight: 600;
                            color: #1120ff;
                        }
                        .field-label{
                            color : 222;
                        }
                        .date{
                            color: #4e4e4e;
                            cursor: pointer;
                        }
                        .add-date-btn{
                            display:flex;
                            align-items:center;
                            cursor:pointer;
                            color: #4e4e4e;
                        }
                        .tab-container{
                            position: absolute;
                            display: flex;
                            flex-direction:column;
                            justify-content:center;
                            background-color: #fff;
                            cursor : pointer;
                            z-index : 999;
                            top: 9%;
                            left: -1rem;
                            width: fit-content;
                            border-radius: 14px;
                            padding : 28px;
                            box-shadow: 0 0 12px 0 rgba(34, 34, 34, 0.14);
                        }
                    `
                }
            </style>
        </>
    )
}