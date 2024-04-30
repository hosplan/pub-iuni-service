import * as RequestApi from "../api/request";
export async function getMyIuni() {
    try {
        return await RequestApi.request(`${process.env.NEXT_PUBLIC_LOGIN_API_HOST}/api/iuniStyle`,
            {
                method: "GET",
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem("iuni")}`
                }
            }
        );
    }
    catch (e) {
        return false;
    }
}


export async function loadMemberIuni(ids : number[]) {
    const dataList = [];
    for(const id of ids){
        dataList.push({"memberId" : id});
    }

    try {
        return await RequestApi.request(`${process.env.NEXT_PUBLIC_LOGIN_API_HOST}/api/iuniStyle/loadJoinMember`,
            {
                method: "POST",
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem("iuni")}`
                },
                body : JSON.stringify(dataList)
            }
        );
    }
    catch (e) {
        return false;
    }
}

export async function getByCreator(id: number) {
    try {
        
        return await RequestApi.request(`${process.env.NEXT_PUBLIC_LOGIN_API_HOST}/api/iuniStyle/detail?id=${id}`,
            {
                method: "GET",
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem("iuni")}`
                }
            }
        );
    }
    catch (e) {
        return false;
    }
}
export async function getUserProfile() {
    try{
        return await RequestApi.request(`${process.env.NEXT_PUBLIC_LOGIN_API_HOST}/api/member/my`,
            {
                method: "POST",
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem("iuni")}`
                },
            }
        );
    }
    catch(e){
        throw e;
    }
    
}

export async function update(data: any) {
    try {
        return await RequestApi.request(`${process.env.NEXT_PUBLIC_LOGIN_API_HOST}/api/iuniStyle`,
            {
                method: 'PATCH',
                mode: 'cors',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem("iuni")}`
                }
            }
        );
    }
    catch (e) {
        console.log(e);
        return false;
    }
}

