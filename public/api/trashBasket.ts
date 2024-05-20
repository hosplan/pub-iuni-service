import * as RequestApi from "../api/request";
export async function load() {       
    try {
        const result = await fetch(`${process.env.NEXT_PUBLIC_CONTENT_API_HOST}/conts/trashBasket/all`, {
            method: "GET",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem("iuni")}`
            },
        });
        return result.json();
    }
    catch (e) {
        return false;
    }
}

export async function remove(id : number){
    try {
        return await RequestApi.request(`${process.env.NEXT_PUBLIC_CONTENT_API_HOST}/conts/trashBasket/remove?id=${id}`,
            {
                method: "PATCH",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem("iuni")}`
                },
            }
        );
    }
    catch (e) {
        console.log(e);
        throw e;
    }
}

export async function restore(id : number){
    try {
        return await RequestApi.request(`${process.env.NEXT_PUBLIC_CONTENT_API_HOST}/conts/trashBasket/restore?id=${id}`,
            {
                method: "PATCH",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem("iuni")}`
                },
            }
        );
    }
    catch (e) {
        console.log(e);
        throw e;
    }
}