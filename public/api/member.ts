import * as RequestApi from "../api/request";

//회원가입
export async function signUp(email: string, pw : string){
    try{
        const result = await fetch(`${process.env.NEXT_PUBLIC_LOGIN_API_HOST}/api/signIn`,{
            method : "POST",
            headers : { "Content-Type" : "application/json"},
            body : JSON.stringify({
                "email": email,
                "password": pw 
            })
        }); 
        return result.json();
    }
    catch(e){
       throw e;
    }
} 

//탈퇴
export async function unscribe(){
    try{
        return await RequestApi.request(`${process.env.NEXT_PUBLIC_LOGIN_API_HOST}/api/member/unscribe`, {
            method : "PATCH",
            headers : {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem("iuni")}`
            }
        });
    }
    catch(e){
        throw e;
    }
}

export async function disconnectAllUser(){
    try{
        return await RequestApi.request(`${process.env.NEXT_PUBLIC_CONTENT_API_HOST}/conts/member/unscribe`, {
            method : "DELETE",
            headers : {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem("iuni")}`
            }
        });
    }

    catch(e){
        throw e;
    }
}

export async function getCertification(){
    try{
        return await RequestApi.request(`${process.env.NEXT_PUBLIC_LOGIN_API_HOST}/api/member/my`, {
            method : "POST",
            headers : {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem("iuni")}`
            }
        });
    }
    catch(e){
        throw e;
    }
}

//카카오 토큰 정보 가져오기
export async function getTokenInfo(code: string){
    try{
        const result = await fetch(`${process.env.NEXT_PUBLIC_LOGIN_API_HOST}/api/signIn/kakao`,
            {
                method: "POST",
                mode: "cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    "credential": code,
                })
            });
        return result.json();
    }
    catch(e){
        throw e;
    }
}

//구글 로그인
export async function loginGoogleOAuth(userInfo: any) {
    try{
        const result = await fetch(`${process.env.NEXT_PUBLIC_LOGIN_API_HOST}/api/signIn/google`, {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "credential" : userInfo.id,
                "email": userInfo.email,
                "nickName": userInfo.name,
            })
        });
        return result.json();
    }
    catch(e){
        throw e;
    }
}

//구글 유저 정보 가져오기
export async function getGoogleUserInfo(accessToken: any) {
    const result = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`, {
            method: 'GET',
        });
    return result.json();
}

//카카오 로그인창으로 이동
export async function getKakaoCode(){
    const url = 'https://kauth.kakao.com/oauth/authorize?client_id=' +
        process.env.NEXT_PUBLIC_KAKAO_LOCAL_CLIENT_ID +
        '&redirect_uri=' +
        process.env.NEXT_PUBLIC_KAKAO_LOCAL_REDIRECT +
        '&response_type=code&scope=account_email,profile_nickname';
    window.location.href = url;
}

//토큰 주입
export function setToken(accessToken: string, refreshToken: string){
    window.localStorage.setItem("iuni", accessToken);
    window.localStorage.setItem("iuni_refresh", refreshToken);
    return true;
}

//accessToken 가져오기
export function getAccessToken(){
    return window.localStorage.getItem("iuni");
}

//refreshToken 가져오기
export function getRefreshToken(){
    return window.localStorage.getItem("iuni_refresh");
}