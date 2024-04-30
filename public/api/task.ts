import * as RequestApi from "../api/request";

export async function load(boardId: number) {
    try {
        return await RequestApi.request(`${process.env.NEXT_PUBLIC_CONTENT_API_HOST}/conts/task/all?board=${boardId}`,
            {
                method: "GET",
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem("iuni")}`
                }
            });
    }
    catch (e) {
        throw e;
    }
}
export async function loadShareTask(){
    try{
        return await RequestApi.request(`${process.env.NEXT_PUBLIC_CONTENT_API_HOST}/conts/task/share`,
        {
            method: "GET",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem("iuni")}`
            }
        });
    }
    catch(e){
        throw e;
    }
}

export async function getMember(id: number) {
    try {
        return await RequestApi.request(`${process.env.NEXT_PUBLIC_CONTENT_API_HOST}/conts/taskMemberMap/load?taskId=${id}`,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem("iuni")}`
                },
            });
    }
    catch (e) {
        throw e;
    }
}
export async function get(id: number) {
    try {

        return await RequestApi.request(`${process.env.NEXT_PUBLIC_CONTENT_API_HOST}/conts/task?task=${id}`,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem("iuni")}`
                },
            });
    }
    catch (e) {
        throw e;
    }
}

export async function create(data: Object) {
    try {
        return await RequestApi.request(`${process.env.NEXT_PUBLIC_CONTENT_API_HOST}/conts/task`,
            {
                method: "POST",
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem("iuni")}`
                },
                body: JSON.stringify(data),
            });
    }
    catch (e) {
        throw e;
    }
}

export async function update(data: Object) {
    try {
        return await RequestApi.request(`${process.env.NEXT_PUBLIC_CONTENT_API_HOST}/conts/task`,
            {
                method: "PATCH",
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem("iuni")}`
                },
                body: JSON.stringify(data),
            });
    }
    catch (e) {
        throw e;
    }
}

export async function remove(id: number) {

    return await RequestApi.request(`${process.env.NEXT_PUBLIC_CONTENT_API_HOST}/conts/task/${id}`,
        {
            method: "DELETE",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem("iuni")}`
            },
        });

}

export async function initCreate(boardId: number) {
    return await RequestApi.request(`${process.env.NEXT_PUBLIC_CONTENT_API_HOST}/conts/task/init`,
    {
        method: "POST",
        mode: 'cors',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${localStorage.getItem("iuni")}`
        },
        body: JSON.stringify({
            name: "Task",
            description: "기본 할 일",
            createDate: Date.now(),
        })
    });
}