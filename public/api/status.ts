export async function load(){
    try{
        const result = await fetch(`${process.env.NEXT_PUBLIC_CONTENT_API_HOST}/conts/status/all`, {
            method: "GET",
            mode : 'cors',
            headers :{
                "Content-Type" : "application/json",
                "Authorization" : `${localStorage.getItem("iuni")}`
            }
        });
        return result.json();
    }
    catch(e){
        return false;
    }
}

export async function loadByType(type: string){
    try{
        const result = await fetch(`${process.env.NEXT_PUBLIC_CONTENT_API_HOST}/conts/status/type?type=${type}`, {
            method : "GET",
            mode : "cors",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `${localStorage.getItem("iuni")}`
            }
        });
        return result.json();
    }
    catch(e){
        throw e;
    }
}

export async function get(id : number){

}

export async function create(data: Object){

}

export async function update(data: Object){

}

export async function remove(id: number){

}