export async function findByEmail(email : string){
    try{
        const queryString = new URLSearchParams({"email" : email}).toString();
        const result = await fetch(`${process.env.NEXT_PUBLIC_LOGIN_API_HOST}/api/member?${queryString}`,{
            method : "GET",
            mode : "cors",
        });
        return result.json();
    }
    catch(e){
        throw e;
    }
}

/* 이메일 중복 체크 */
export async function duplicationCheck(email : string){
    return await findByEmail(email);
}

export async function save(data : any){
    try{
        const result = await fetch(`${process.env.NEXT_PUBLIC_LOGIN_API_HOST}/api/member`, {
            method : "POST",
            mode : "cors",
            headers : { "Content-Type" : "application/json" },
            body : JSON.stringify({
                "email" : data.email,
                "password" : data.password,
                "name" : data.name,
                "isSocial" : data.isSocial
            })
        });
        return result.json();
    }
    catch(e){
        throw e;
    }
}

/* 회원가입 */
export async function signUp(data : any){
    const result = await save(data);
    if(result["result"]){
        return { "result" : true, "message" : "가입이 완료 되었습니다."};
    } else {
        return { "result" : false, "message" : "가입 하는 도중 문제가 발생했어요. 잠시후 다시 시도해주세요."}
    }
}


