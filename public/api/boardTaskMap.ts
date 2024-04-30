import * as RequestApi from "../api/request";
export async function create(data: Object) {
    try {
        return await RequestApi.request(`${process.env.NEXT_PUBLIC_CONTENT_API_HOST}/conts/boardTaskMap`,
            {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem("iuni")}`
                },
                body: JSON.stringify(data)
            }
        );
    }
    catch (e) {
        throw e;
    }
}

export async function updateTaskOrder(data: Array<any>) {
    try {
        return await RequestApi.request(`${process.env.NEXT_PUBLIC_CONTENT_API_HOST}/conts/boardTaskMap/order`,
            {
                method: "PATCH",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem("iuni")}`
                },
                body: JSON.stringify(data)
            }
        );

    }
    catch (e) {
        throw e;
    }
}

//태스크 보드 이동
export async function updateMove(data: object) {
    try {

        return await RequestApi.request(`${process.env.NEXT_PUBLIC_CONTENT_API_HOST}/conts/boardTaskMap/move`,
            {
                method: "PATCH",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem("iuni")}`
                },
                body: JSON.stringify(data)
            }
        );
    }
    catch (e) {
        throw e;
    }
}

export async function update(data: Object) {
    try {
        return await RequestApi.request(`${process.env.NEXT_PUBLIC_CONTENT_API_HOST}/conts/boardTaskMap`,
            {
                method: "PATCH",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem("iuni")}`
                },
                body: JSON.stringify(data)
            }
        );
    }
    catch (e) {
        throw e;
    }
}

export async function remove(id: number) {
    try {
        return await RequestApi.request(`${process.env.NEXT_PUBLIC_CONTENT_API_HOST}/conts/boardTaskMap?id=${id}`,
            {
                method: "DELETE",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem("iuni")}`
                },
            }
        );
    }
    catch (e) {
        throw e;
    }
}

//보드 아이디 기준으로 삭제
export async function removeByBoardId(boardId: number) {
    try {
        return await RequestApi.request(`${process.env.NEXT_PUBLIC_CONTENT_API_HOST}/conts/boardTaskMap/board?id=${boardId}`,
            {
                method: "DELETE",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem("iuni")}`
                },
            }
        );
    }
    catch (e) {
        throw e;
    }
}

//태스크 아이디 기준으로 삭제
export async function removeByTaskId(taskId: number) {
    try {
        return await RequestApi.request(`${process.env.NEXT_PUBLIC_CONTENT_API_HOST}/conts/boardTaskMap/task?id=${taskId}`,
            {
                method: "DELETE",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem("iuni")}`
                },
            }
        );
    }
    catch (e) {
        throw e;
    }
}