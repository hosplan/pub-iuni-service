import * as RequestApi from "../api/request";
export async function load() {
    try {
        
        return await RequestApi.request(`${process.env.NEXT_PUBLIC_CONTENT_API_HOST}/conts/board/all`,
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
        throw e;
    }
}

export async function get(id: number) {
    try {
        return await RequestApi.request(
            `${process.env.NEXT_PUBLIC_CONTENT_API_HOST}/conts/board`,
            {
                method: "GET",
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Iuni${localStorage.getItem("iuni")}`
                },
            }
        )
    }
    catch (e) {
        throw e;
    }
}

export async function create(data: Object) {
    try {
        return await RequestApi.request(
            `${process.env.NEXT_PUBLIC_CONTENT_API_HOST}/conts/board`,
            {
                method: "POST",
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Iuni${localStorage.getItem("iuni")}`
                },
                body: JSON.stringify(data)
            }
        )

    }
    catch (e) {
        throw e;
    }
}

export async function update(data: Object) {
    try {
        return await RequestApi.request(
            `${process.env.NEXT_PUBLIC_CONTENT_API_HOST}/conts/board`,
            {
                method: "PATCH",
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem("iuni")}`
                },
                body: JSON.stringify(data),
            }
        )

    }
    catch (e) {
        throw e;
    }

}

export async function moveTrash(id : number){
    const data ={"id" : id};
    return await RequestApi.request(
        `${process.env.NEXT_PUBLIC_CONTENT_API_HOST}/conts/board/trash`,
        {
            method : "PATCH",
            mode : "cors",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `${localStorage.getItem("iuni")}`
            },
            body : JSON.stringify(data)
        }
    )
}
export async function remove(id: number) {
    return await RequestApi.request(
        `${process.env.NEXT_PUBLIC_CONTENT_API_HOST}/conts/board?id=${id}`,
        {
            method: "DELETE",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem("iuni")}`
            },
        }
    )
}

export async function initCreate() {
    return await RequestApi.request(
        `${process.env.NEXT_PUBLIC_CONTENT_API_HOST}/conts/board/init`,
        {
            method: "POST",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem("iuni")}`
            },
            body: JSON.stringify({
                name: "할 일 목록",
                description: "기본 할일 목록 입니다.",
                boardOrder: 0,
            })
        }
    )
}