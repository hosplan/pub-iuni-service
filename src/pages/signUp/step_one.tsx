import { Dispatch, SetStateAction, useState } from "react"
import * as Member from "../../../public/model/member";
import { useRecoilState } from "recoil";
import { emailState, pwState } from "../../app/globalStates";
import { ERROR_CASE } from "../../../public/common/error_case";

interface Props {
    setStep : Dispatch<SetStateAction<number>>
}

export default function StepOne(props: Props) {

    const [email, setEmail] = useRecoilState(emailState);
    const [errorEmailCase, setErrorEmailCase] = useState<string>(""); 
    const [errorPwCase, setPwCase] = useState<string>("");
    const [focus, setFocus] = useState<string>("");
    const [pw, setPw] = useRecoilState(pwState);
    const alertfunc = (message : string) => {
        alert(message);
    }
    const checkRegEmail = (email: string) => {
        let reg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
        return reg.test(email);
    }
    
    const checkRegPW = (pw: string) => {
        let reg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/
        return reg.test(pw);
    }
    const stepProcess = async () => {
        if(!email){
            setErrorEmailCase(() => "empty_email");
            return false;
        }
        else if(!pw){
            setPwCase(() => "empty_password");
            return false;
        }   
        else if(!checkRegEmail(email)){
            setErrorEmailCase(() => "reg_email");
            return false;
        }
        else if(!checkRegPW(pw)){
            setPwCase(() => "reg_password");
            return false;
        } 
        else if(await Member.duplicationCheck(email)) {
            setErrorEmailCase(() => "duplicate_email");
            return false;
        } else {
            props.setStep(() => 2);
        }
        
        //!await Member.duplicationCheck(email) ? props.setStep(() => 2) : setErrorEmailCase("duplicate_email"); 
    }

    return (
        <>
            <div className={focus === "email" ? "login-box focus" : errorEmailCase !== "" ? "login-box error" : "login-box"}>
                <input type="text" 
                    placeholder="이메일 주소" 
                    value={email} 
                    className="login-input" 
                    onChange={(e) => setEmail(e.target.value)} 
                    onFocus={() => setFocus("email")}/>
            </div>
            
            <div className="error-case">{errorEmailCase !== "" ? ERROR_CASE[errorEmailCase] : "" }</div>

            <div className={focus === "password" ? "login-box focus" : errorPwCase !== "" ? "login-box error" : "login-box"}
                style={{marginTop:"35px"}}>
                <input type="password" 
                    placeholder="비밀번호" 
                    value={pw} 
                    onChange={(e) => setPw(e.target.value)}
                    onFocus={() => setFocus("password")} 
                    className="login-input" />
            </div>
            
            <div className="error-case">{errorPwCase !== "" ? ERROR_CASE[errorPwCase] : "" }</div>
            
            <div className="login-btn"
                 style={{marginTop:"30px"}}
                 onClick={() => stepProcess()}>
                회원가입 계속하기
            </div>
            
            <style jsx> {`
                .login-box{
                    display:grid;
                    border-bottom : 1px solid #e5e5e5;
                    width: 100%;
                    height:3rem;
                }
                .login-box.focus{
                    border-bottom: 1px solid #1120ff;
                }
                .login-box.error{
                    border-bottom : 1px solid #ff0062;
                }
                .login-input{
                    font-size:1.125rem;
                    border: none;
                    outline : none;
                }
                
                .login-input::placeholder{
                    color : #a6a6a6;
                }
                .login-btn{
                    display : grid;
                    width : 100%;
                    height : 3rem;
                    justify-items : center;
                    align-items : center;
                    background-color: #1120ff;
                    border-radius : 50px;
                    color : white;
                    cursor:pointer;
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