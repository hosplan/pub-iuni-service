'use client'
import { useRouter } from "next/router";
import { emailState, nameState, nickNameState, pwState } from "../../app/globalStates";
import { Dispatch, SetStateAction } from "react";

import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";

interface Props {
    setStep : Dispatch<SetStateAction<number>>
}

export default function StepTwo(props: Props){
    const [nickName, setNickName] = useRecoilState(nickNameState);
    const [name, setName] = useRecoilState(nameState);
    const email = useRecoilValue(emailState);
    const pw = useRecoilValue(pwState);
    
    const signUp = async () => {        
        try{

            const result = await fetch(`${process.env.NEXT_PUBLIC_LOGIN_API_HOST}/api/member`,
            {
                method : "POST",
                mode:"cors",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify({
                    "email" : email,
                    "password" : pw,
                    "name" : name,
                    "nickName" : nickName,
                    "isSocial" : false
                })
            });
            return result.json();
        }
        catch(e){
            console.log(e);
        }
    }
    const resetEmail = useResetRecoilState(emailState);
    const resetPw = useResetRecoilState(pwState);
    const resetNickName = useResetRecoilState(nickNameState);
    const resetName = useResetRecoilState(nameState);
    
    const recoilReset = () => {
        resetEmail();
        resetPw();
        resetNickName();
        resetName();
    }
    
    const router = useRouter();
    const signUpProcess = async () => {
        let result = await signUp();
       
        if(result.result === true){
            recoilReset();
            props.setStep(() => 3);
        } else {
            alert("회원가입을 하는 도중 문제가 발생했습니다. 잠시후에 다시 시도해주세요.");
        }
    }
    
    return (
        <>
            <div className="login-box">
                <input type="text" placeholder="닉네임" value={nickName} onChange={(e) => setNickName(e.target.value)} className="login-input"></input>
            </div>

            <div className="login-box" style={{marginTop:"35px"}}>
                <input type="text" placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} className="login-input"></input>
            </div>
            <div className="login-btn" style={{marginTop:"30px"}}
                onClick={() => signUpProcess()}>
                회원가입 계속하기
            </div>
            <style jsx> {`
                .login-box{
                    display:grid;
                    border-bottom : 1px solid #e5e5e5;
                    width: 100%;
                    height:48px;
                }
                .login-input{
                    font-size:18px;
                    height:100%;
                    border: none;
                    outline : none;
                }
                .login-input::placeholder{
                    color : #a6a6a6;
                }
                 .login-btn{
                    display : grid;
                    width : 100%;
                    height : 48px;
                    justify-items : center;
                    align-items : center;
                    background-color: #1120ff;
                    border-radius : 50px;
                    color : white;
                    cursor:pointer;
                }
                @media (max-width: 1200px) {
                    main {
                        display : grid;
                        width:100%;
                        height:100%;
                        grid-template-columns: 1fr;
                        padding : 32px 28px;
                    }
                    .home-img-container{
                        display: none;
                    }
                }
            `
            }
            </style>
        </>
    )
}