//시리얼 코드 보내기
export async function sendSerialCode(email: string) : Promise<any> {
    const data = {
        "email" : email,
        "type" : "losePw"
    }
    try{
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_LOGIN_API_HOST}/api/member/certificatecode`,
            {
                method : "POST",
                mode : 'cors',
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(data)
            }
        );        
        return response.json();
    }
    catch(e){
        throw e;
    }
}

//시리얼 코드 확인하기
export async function checkSerialCode(email: string, code : string) : Promise<any>{
    const data = {
        "email" : email,
        "code" : code,
        "type" : "losePw"
    }

    try{
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_LOGIN_API_HOST}/api/member/checkcertification`,
            {
                method : "POST",
                mode : "cors",
                headers : {
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify(data)
            }
        )
        return response.json();
    }
    catch(e){
        throw e;
    }
}

//유저 비밀번호 변경
export async function changePw(email:string, pw: string){
    try{
        const data = {
            "email" : email,
            "password" : pw
        }
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_LOGIN_API_HOST}/api/member/changepw`,
            {
                method: "POST",
                mode: "cors",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(data)
            }
        )

        return response.json();
    }
    catch(e){
        throw e;
    }
}