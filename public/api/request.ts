import * as IuniToken from "../api/iuniToken";

//토큰 재발급
async function tokenRefresh(): Promise<string>{
    if(localStorage.getItem("iuni") === null || localStorage.getItem("iuni_refresh") === null){
        return "expiredToken";
    }    

    return await IuniToken.useRefreshToken();
}


//reponse 인터셉터
async function interceptResponse(response : any, url: string, config:any) : Promise<any>{

    if(response.status === 401){
        const tokenInfo = await tokenRefresh();   
        if(tokenInfo !== "expiredToken"){
            config.headers.Authorization = `${localStorage.getItem("iuni")}`;
            return await fetch(url, config);
        } else {
            return response;
        }
    } else{
        return response;
    }
   
}

export async function request(url: string, config : any) :  Promise<any>{
    let response = await fetch(url, config);
    response = await interceptResponse(response, url, config);
    return response.json();
}


