import React from "react";
import { useState } from "react";
import * as LosePwApi from "../../../public/api/losePw";
import { ERROR_CASE } from "../../../public/common/error_case";
import { useRouter } from "next/router";

interface Props {
    setStep: React.Dispatch<React.SetStateAction<number>>
    step: number
}

export default function StepContents(props: Props) {
    const [email, setEmail] = useState<string>("");
    const [errorCase, setErrorCase] = useState<string>("");
    const [pw, setPw] = useState<string>("");
    const [code, setCode] = useState<string>("");
    const [isSend, setIsSend] = useState<boolean>(false);
    const router = useRouter();
    //비밀번호 정규식
    const checkRegPW = (pw: string) => {
        let reg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/
        return reg.test(pw);
    }
    //이메일 정규식
    const checkRegEmail = (email: string) => {
        let reg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
        return reg.test(email);
    }

    //전송 코드 보내기
    const send = async () => {
        if(!checkRegEmail(email)){
            setErrorCase(() => ERROR_CASE["reg_email"]);
            return false;
        }

        const result = await LosePwApi.sendSerialCode(email);
        if (result.result === "success") {
            setIsSend(() => true);
        } else {
            setErrorCase(() => "인증코드를 보내는 도중 오류가 발생했어요.");
        }
    }

    //인증 확인
    const certificate = async () => {
        const result = await LosePwApi.checkSerialCode(email, code);
        if (result.result === "success") {
            props.setStep(() => 2);
        } else {
            setErrorCase(() => "인증코드가 틀려요.");
        }
    }
    //비밀번호 업데이트
    const changePw = async () => {
        if (!checkRegPW(pw)) {
            setErrorCase(() => ERROR_CASE["reg_password"]);
            return false;
        }
        const result = await LosePwApi.changePw(email, pw);
        if (result.result === "success") {
            props.setStep(() => 3);
        } 
        else if(result.result === "kakao"){
            setErrorCase(() => "해당 회원은 카카오 계정으로 가입 되있어요!");
            return false;
        }
        else if(result.result === "google"){
            setErrorCase(() => "해당 회원은 구글 계정으로 가입 되있어요!");
            return false;
        }
        else if (result.result === "NotExistEmail") {
            setErrorCase(() => "존재하지 않는 회원이네요.");
            return false;
        } else {
            alert("비밀번호 변경을 다시 시도해주세요.");
            return false;
        }
    }
    //첫번쨰 스탭
    const StepOne = () => {
        const [focus, setFocus] = useState<boolean>(false);
        return <>
            {
                isSend ?
                    <>
                        <div className={focus ? "text-input-box focus" : "text-input-box"}>
                            <input type="text" className="text-input" value={code} 
                                onFocus={() => setFocus(!focus)}
                                onBlur={() => setFocus(false)}
                                onChange={(e) => setCode(e.target.value)}  placeholder="전송 코드를 입력하세요." />
                        </div>
                        <div className="error-case">{errorCase}</div>
                        <div className="send-btn"  onClick={() => certificate()}>
                            인증 확인
                        </div>
                    </> :
                    <>
                        <div className={focus ? "text-input-box focus" : "text-input-box"}>
                            <input type="text" className="text-input"  value={email} 
                                onFocus={() => setFocus(!focus)}
                                onBlur={() => setFocus(false)}
                                onChange={(e) => setEmail(e.target.value)}  placeholder="가입한 이메일 주소를 입력하세요." />
                        </div>
                        <div className="error-case">{errorCase}</div>

                        <div className="send-btn" onClick={() => send()}>
                            인증 코드 받기
                        </div>
                    </>
            }
            <style jsx>
                {
                    `
                    .send-btn{
                        display : grid;
                        width : 100%;
                        height : 48px;
                        justify-items : center;
                        align-items : center;
                        background-color: #1120ff;
                        border-radius : 50px;
                        color : white;
                        cursor : pointer;
                        margin-top: 1rem;
                    }
                    
                    .text-input-box{
                        display: grid;
                        border-bottom : 1px solid #e5e5e5;
                        width: 100%;
                        height: 3rem;
                    }
                    .text-input-box.focus{
                        border-bottom: 1px solid #1120ff;
                    }
                    .text-input{
                        font-size : 1.125rem;
                        border :none;
                        outline: none;
                    }
                    .text-input::placeholder{
                        color : #a6a6a6;
                    }
                    .error-case{
                        margin-top:6.5px;
                        font-size: 0.75rem;
                        font-weight: 500;
                        font-stretch: normal;
                        font-style: normal;
                        line-height: 1.17;
                        letter-spacing: -0.12px;
                        text-align: left;
                        color: #ff0062;
                    }
                    `
                }
            </style>
        </>
    }
    //두번째 스탭
    const StepTwo = () => {
        const [focus, setFocus] = useState<boolean>(false);
        return <>
            <div className={focus ? "text-input-box focus" : "text-input-box"}>
                <input type="password" className="text-input"  value={pw}  
                    onFocus={() => setFocus(!focus)}
                    onBlur={() => setFocus(false)}
                    onChange={(e) => setPw(e.target.value)}  placeholder="새로운 비밀번호 입력하세요." />
            </div>
            <div className="error-case">{errorCase}</div>
            <div className="send-btn" onClick={() => changePw()}>
                확인
            </div>
            <style jsx>
                {
                    `
                    .send-btn{
                        display : grid;
                        width : 100%;
                        height : 48px;
                        justify-items : center;
                        align-items : center;
                        background-color: #1120ff;
                        border-radius : 50px;
                        color : white;
                        cursor : pointer;
                        margin-top: 1rem;
                    }
                    
                    .text-input-box{
                        display: grid;
                        border-bottom : 1px solid #e5e5e5;
                        width: 100%;
                        height: 3rem;
                    }
                    .text-input-box.focus{
                        border-bottom: 1px solid #1120ff;
                    }
                    .text-input{
                        font-size : 1.125rem;
                        border :none;
                        outline: none;
                    }
                    .text-input::placeholder{
                        color : #a6a6a6;
                    }
                    .error-case{
                        margin-top:6.5px;
                        font-size: 0.75rem;
                        font-weight: 500;
                        font-stretch: normal;
                        font-style: normal;
                        line-height: 1.17;
                        letter-spacing: -0.12px;
                        text-align: left;
                        color: #ff0062;
                    }
                    `
                }
            </style>
        </>
    }
    //세번째 스탭
    const StepThree = () => {
        return <>
            <div className="send-btn" onClick={() => router.push("/")}>
                로그인
            </div>
            <style jsx>
                {
                    `
                    .send-btn{
                        display : grid;
                        width : 100%;
                        height : 48px;
                        justify-items : center;
                        align-items : center;
                        background-color: #1120ff;
                        border-radius : 50px;
                        color : white;
                        cursor : pointer;
                    }
                    `
                }
            </style>
        </>
    }

    const STEP_CONTENTS : any = {
        1 : StepOne(),
        2 : StepTwo(),
        3 : StepThree()
    }
    return (
        <>
            <div className="box">
                {
                    STEP_CONTENTS[props.step]
                }
            </div>
            <style jsx>
                {
                    `
                    .box{
                        display: grid;
                        width:100%;
                        height: 3rem;
                        margin-top:0.3rem;
                    }
                    .login-box{
                        display: grid;
                        width: 100%;
                        height: 48px;
                    }
                    .login-input{
                        font-size:1.125rem;
                        border: none;
                        outline : none;
                    }
                    .send-btn{
                        display : grid;
                        width : 100%;
                        height : 48px;
                        justify-items : center;
                        align-items : center;
                        background-color: #1120ff;
                        border-radius : 50px;
                        color : white;
                        cursor : pointer;
                    }
                    `
                }

            </style>
        </>
    )
}