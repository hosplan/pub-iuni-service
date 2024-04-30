import Image from "next/image";
import Layout from "../../app/layout"
import { useEffect, useState } from "react";
import React from "react";
import { useRecoilValue } from "recoil";
import { emailState } from "../../app/globalStates";
interface Props{
    setComplete: React.Dispatch<React.SetStateAction<boolean | undefined>>
}
function Certification(props : Props) {
    const [code, setCode] = useState<string>();  
    const [status, setStatus] = useState<string>("ready");
    const [email, setEmail] = useState<String>("");
    const getBasicInfo = async () => {    
        try{
            const result = await fetch(`${process.env.NEXT_PUBLIC_LOGIN_API_HOST}/api/member/my`,{
                method : "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem("iuni")}`
                },
            }); 
            return result.json();
        }
        catch(e){
            throw e;
        }
    }


    const getEmail = async () => {
        const result = await getBasicInfo();
        setEmail(() => result.email);
    }

    const STATUS_TITLE :any = {
        "start" : "가입한 이메일로 인증코드를 보냈어요.",
        "ready" : "",
        "done" : "이메일 인증을 완료했어요",
        "error" : "인증코드가 틀렸어요.",
        "emailError" : "인증코드를 보내는 도중 오류가 발생했어요."
    }
        
    const reqEmail = async() => {
        try{
            
            const result = await fetch(`${process.env.NEXT_PUBLIC_LOGIN_API_HOST}/api/member/certification`, {
                method: "POST",
                mode : "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem("iuni")}`
                },
                body : JSON.stringify({
                    email: email
                })
            });
            return result.json();
        }
        catch(e){
            throw e;
        }
    }

    //인증코드 보내기
    const send = async() => {
        const result = await reqEmail();
        if(result){
            setStatus(() => "start");
        } else {
            setStatus(() => "emailError");
        }
    }

    const reqSubmit = async() => {
        try{

            const result = await fetch(`${process.env.NEXT_PUBLIC_LOGIN_API_HOST}/api/member/checkCode`, {
                method: "POST",
                mode : "cors",
                headers : { 
                    "Content-Type" : "application/json",
                    "Authorization": `${localStorage.getItem("iuni")}`
                },
                body : JSON.stringify({
                    email : email,
                    code : code
                })
            });
            return result.json();
        }
        catch(e){
        
            throw e;
        }
    }
    //인증코드 확인
    const submit = async() => {
        try{
            const result = await reqSubmit();
            if(result.result === "error"){
                setStatus(() => "error");
                props.setComplete(() => false);
            }else{
                window.localStorage.setItem("iuni", result.result);
                setStatus(() => "done");
                props.setComplete(() => true);
            }  
        }
        catch(e){
            throw e;
        }
        
    }

    useEffect(() => {
        getEmail();
    }, [])
    return (
        <>
            <div className="container">
                <div className="certification-box">
                    <div>
                        <Image width={400} height={250} src={"/images/iuni-hula.webp"} />
                    </div>
                    <div className="title">
                        <p>앗! 아직 이메일 인증을</p>
                        <p>하지 않으셨군요?</p>
                    </div>
                    <div className="code-box"> 
                        <input className="code" type="text" placeholder="인증코드" value={code} onChange={(e) => setCode(e.target.value)} />
                        {
                            status === "start" ?
                            <div className="ok-btn" onClick={() => submit()}>확인</div>
                            :
                            <div className="ok-btn" onClick={() => send()}>전송</div>
                        }        
                    </div>
                  
                    <div className={status === "error" ? "sub-title error" : "sub-title"}>
                        {STATUS_TITLE[status]}
                    </div>
                </div>
            </div>

            <style jsx> {
                `
                .code-box{
                    display: flex;
                    gap: 10px;
                }
                .ok-btn{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 20px;
                    border-radius: 8px;
                    background-color: #1120ff;
                    font-size: 18px;
                    font-weight: 500;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: 0.78;
                    letter-spacing: -0.18px;
                    text-align: center;
                    color: #fff;
                    cursor: pointer;
                }
                .code{
                    font-size: 24px;
                    padding: 12px;
                    font-weight: 500;
                    border-radius: 8px;
                }
                .container{
                    width: 100%;
                    height: 100%;
                    margin-top: 10%;
                }
                .sub-title.error{
                    color: #ff0062;
                }
                .certification-box{
                    display: flex;
                    margin: 0 auto;
                    flex-direction: column;
                    align-items: center;
                    width: fit-content;
                    border-radius: 14px;
                    gap:14px;
                }
                .certification-box>div{
                    width: fit-content;
                }
                .title{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    text-align: center;
                    font-size: 36px;
                    font-weight: 600;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: 1.17;
                    letter-spacing: -0.36px;
                    text-align: left;
                    color: #1120ff;
                }
                .title>p{
                    text-align:center;
                }
                .sub-title{
                    display: flex;
                    flex-direction: column;
                    font-size: 18px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: 1.33;
                    letter-spacing: -0.18px;
                    text-align: left;
                    color: #7079ff;
                }
                .sub-title>p{
                    text-align:center;
                }
                `
            }
            </style>
        </>
    )
}

export default Certification;
