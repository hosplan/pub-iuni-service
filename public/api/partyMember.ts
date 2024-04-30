import * as RequestApi from "./request";

//참여인원 불러오기
export async function loadPartyMember(id : number){
    try{
        return await RequestApi.request(`${process.env.NEXT_PUBLIC_CONTENT_API_HOST}/conts/taskMemberMap/loadMembers?taskId=${id}`, {
            method : "GET",
            mode : "cors",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `${localStorage.getItem("iuni")}`
            },
        });
    }
    catch(e){
        throw e;
    }  
}

//참여인원 빼기
export async function removePartyMember(taskId: number, memberId:number){
    try{
        const data = {"taskId" : taskId, "memberId" : memberId};
        return await RequestApi.request(`${process.env.NEXT_PUBLIC_CONTENT_API_HOST}/conts/taskMemberMap`, {
            method : "DELETE",
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