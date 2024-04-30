//리프레쉬 토큰을 이용한 엑세스 토큰 갱신
export async function useRefreshToken() : Promise<string>{
    const token = await getRenewToken();
    
    //리프레쉬 토큰 까지 만료 되었을때
    if(token.result === "expired"){
        return "expiredToken";
    } else {
        window.localStorage.setItem("iuni", token.accessToken);
        window.localStorage.setItem("iuni_refresh", token.refreshToken);
        return "successRefresh";
    }
}

//갱신된 엑세스 토큰 가져오기
async function getRenewToken(){

    const response = await fetch(`${process.env.NEXT_PUBLIC_LOGIN_API_HOST}/api/iunitoken`, {
       method: "POST",
       mode: "cors",
       headers: {
            "Content-Type" : "application/json",
       },
       body : JSON.stringify({
            "refreshToken" : window.localStorage.getItem("iuni_refresh")
        })
    });

    return response.json();
}