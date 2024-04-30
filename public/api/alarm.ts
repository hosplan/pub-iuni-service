import * as RequestApi from "../api/request";
//알람 보내기
export async function send(content: string, type: string, to : number, relateId : number){
    const data = {
        "name" : content,
        "alarmType" : type,
        "memberId" : to,
        "relateId" : relateId,
        "isRead": false
    };

    try{
        return await RequestApi.request(`${process.env.NEXT_PUBLIC_LOGIN_API_HOST}/api/alarm`,{
            method : "POST",
            mode : "cors",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `${localStorage.getItem("iuni")}`
            },
            body : JSON.stringify(data)
        });
    }
    catch(e){
        throw e;
    }
}

//알람 불러오기
export async function load() : Promise<AlarmContents>{
    try{
        return await RequestApi.request(`${process.env.NEXT_PUBLIC_LOGIN_API_HOST}/api/alarm/load`, {
            method : "GET",
            mode : "cors",
            headers : {
                "Content-Type": "application/json",
                "Authorization" : `${localStorage.getItem("iuni")}`
            },
        });
    }
    catch(e){
        throw e;
    }
}

//알람 읽음 처리
export async function updateRead(id : number){
    try{
        return await RequestApi.request(`${process.env.NEXT_PUBLIC_LOGIN_API_HOST}/api/alarm`, {
            method : "PATCH",
            mode : "cors",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `${localStorage.getItem("iuni")}`
            },
            body : JSON.stringify({"id" : id})
        });
    }
    catch(e){
        throw e;
    }
}