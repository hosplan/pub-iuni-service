import * as RequestApi from "../api/request";

//친구 목록 불러오기
export async function loadFriends(){
    
}
//이메일 찾기
export async function find(email: string, relatedId: number, alarmType:string){
    try{
        return await RequestApi.request(`${process.env.NEXT_PUBLIC_LOGIN_API_HOST}/api/member/share?email=${email}&relateId=${relatedId}&alarmType=${alarmType}`,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem("iuni")}`
                },
            }
        )
    }
    catch(e){
        throw e;
    }
}
async function makeTaskMemberMapData(dataList : SignIn[], taskId: number){
    const result : TaskMemberMap[] = [];
    for(const data of dataList){
        const taskMemberMap : TaskMemberMap = {
            "id" : 0,
            "memberId" : data.id,
            "taskId" : taskId,
            "mapType" : "REQ"
        };
        result.push(taskMemberMap);
    }
    return result;
}

//요청 보내기
export async function send(signIn: SignIn[], taskId : number){
    try{
        const data = await makeTaskMemberMapData(signIn, taskId);
        return await RequestApi.request(`${process.env.NEXT_PUBLIC_CONTENT_API_HOST}/conts/taskMemberMap/reqShare`,{
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem("iuni")}`
            },
            body : JSON.stringify(data)
        });
    }
    catch(e){
        throw e;
    }
}

//공유하기 응답 업데이트
export async function updateShareTask(data: any){
    try{
        return await RequestApi.request(`${process.env.NEXT_PUBLIC_CONTENT_API_HOST}/conts/taskMemberMap/share`,{
            method : "PATCH",
            mode: "cors",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `${localStorage.getItem("iuni")}`
            },
            body : JSON.stringify(data)
        });
    }catch(e){
        throw e;
    }
}


//공유 보드 활성화
export async function createShareBoard(data: any){
    try{
        return await RequestApi.request(`${process.env.NEXT_PUBLIC_CONTENT_API_HOST}/board/share`, {
            method : "POST",
            mode : "cors",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `${localStorage.getItem("iuni")}`
            },
            body : JSON.stringify(data)
        })
    }
    catch(e){
        throw e;
    }
}

//공유 태스크 끊기
export async function disconnect(taskId: number){
    try{
        return await RequestApi.request(`${process.env.NEXT_PUBLIC_CONTENT_API_HOST}/conts/taskMemberMap`, {
            method : "DELETE",
            mode : "cors",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `${localStorage.getItem("iuni")}`
            },
            body : JSON.stringify({"taskId": taskId})
        })
    }
    catch(e){
        throw e;
    }
}


