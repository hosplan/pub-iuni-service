import { useState } from "react";
import { prettyDate } from "../../../public/common/common";
import * as ShareMemberAPI from "../../../public/api/shareMember";
import * as AlarmAPI from "../../../public/api/alarm";
import ProfileModal from "../profile/profileModal";
import Image from "next/image";
interface Props{
    alarm : Alarm;
    setAlarms : React.Dispatch<React.SetStateAction<AlarmContents | undefined>>;
    type : string;
}
export default function Content(props: Props){
    const [certificationModal, setCertificationModal] = useState<boolean>(false);
    const response = async (type: string) => {

        const result = await ShareMemberAPI.updateShareTask({
            "taskId": props.alarm.relateId,
            "memberId": props.alarm.toMember.id,
            "mapType": type
        });
        
        if(result.token_error === "noAuth"){
            setCertificationModal(() => true);
        }
        else if(result.result === "success"){
            //응답 알람 전송
            await AlarmAPI.send(type, "NORMAL", props.alarm.fromMember.id, props.alarm.relateId);
            //자신의 알람 읽음으로 처리
            await AlarmAPI.updateRead(props.alarm.id);

            props.setAlarms((d : any) => {
                const alarms = d[`${props.type}`];
                const alarm = alarms.find((e : Alarm) => e.id === props.alarm.id);
                alarm.isRead = true;
                return {...d};
            });;
        }
    }

    return(
        <>
            {
                certificationModal &&
                <ProfileModal setModal={setCertificationModal} />
            }
            <div className={props.alarm?.isRead ? "box read" : "box"}>
                <div className="icon">
                    <Image
                        src={`/images/task-icon.webp`}
                        width={"48px"}
                        height={"48px"}
                    />
                </div>
                <div className="content">
                    <div className="title">
                        {props.alarm?.name}
                    </div>
                    <div className="user-info">
                        <div className="from-user-iuni">
                            From : {props.alarm?.fromMember?.nickName}({props.alarm?.fromMember?.email})
                        </div>
                        <div className="create-date">
                            보낸날짜 : {prettyDate(new Date(props.alarm?.createDate))}
                        </div>
                    </div>
                </div>
                {
                    props.alarm?.alarmType === "TASK" &&
                    <>
                        <div className="btn-list">
                            {
                                !props.alarm?.isRead &&
                                <>
                                    <div className="btn join" onClick={() => response("JOIN")}>
                                        승인
                                    </div>
                                    <div className="btn refuse" onClick={() => response("REJECT")}>
                                        거절
                                    </div>
                                </>
                            }
                        </div>
                    </>
                }
            </div>
            <style jsx>
                {
                    `
                    .box{
                        display: flex;
                        width : 100%;
                        height: 6rem;
                        border: 1px solid #efefef;
                        border-radius : 14px;
                        padding: 1rem;
                        gap: 14px;
                    }
                    .box.read{
                        background-color:#efefef;
                    }
                    .box:hover{
                        border: 1px solid #2f00ff;
                    }
                    .icon{
                        align-self:center;
                    }
                    .title{
                        font-size: 18px;
                        font-weight: normal;
                        font-stretch: normal;
                        font-style: normal;
                        line-height: 1.33;
                        letter-spacing: -0.18px;
                        text-align: left;
                    }
                    .from-user-iuni{
                        font-size: 12px;
                        font-weight: normal;
                        font-stretch: normal;
                        font-style: normal;
                        line-height: 2;
                        letter-spacing: -0.12px;
                        text-align: left;
                        color: #A6A6A6;
                    }
                    .create-date{
                        font-size: 12px;
                        font-weight: normal;
                        font-stretch: normal;
                        font-style: normal;
                        line-height: 2;
                        letter-spacing: -0.12px;
                        text-align: left;
                        color: #A6A6A6;
                    }
                    .content{
                        display: flex;
                        flex-direction: column;
                        align-self:center;
                    }
                    .user-info{
                        display : flex;
                        gap: 14px;
                    }
                    .btn-list{
                        display: flex;
                        margin:auto 0 auto auto;
                        gap: 14px;
                        align-self:center;
                    }
                    .btn{
                        border-radius: 6px;
                        text-align:center;
                        padding: 10px;
                        width: 100px;
                        font-size: 18px;
                        font-weight: 500;
                        color: #fff;
                        cursor: pointer;
                    }
                    .btn.join{
                        background-color : #1120ff;
                        color : white;
                    }
                    .btn.refuse{
                        background-color : #ff0062;
                        color : white;
                    }
                `
                }
            </style>
        </>
    )

}