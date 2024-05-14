import { useState } from "react";
import Layout from "../../app/layout";
import * as RequestApi from "../../../public/api/request";
import Image from "next/image";
import { ERROR_CASE } from "../../../public/common/error_case";
interface Props {
    setIsChangePw: React.Dispatch<React.SetStateAction<boolean>>
}
function ChangePw(props: Props) {
    const [isChangePwShow, setIsChangePwShow] = useState<boolean>(false);
    const [isChangePwCheckShow, setIsChangePwCheckShow] = useState<boolean>(false);
    const [currentPwStatus, setCurrentPwStatus] = useState<string>("normal");
    const [changePwStatus, setChangePwStatus] = useState<string>("normal");

    const [currentPw, setCurrentPw] = useState<string>("");
    const [changePw, setChangePw] = useState<string>("");
    const [checkChangePw, setCheckChangePw] = useState<string>("");

    //비밀번호 변경 요청 -> 요청후 토큰 재발급
    const reqChangePw = () => {

    }

    //변경된 비밀번호,비밀번호 확인 비교
    const comparePw = () => {
        return changePw === checkChangePw ? "success" : "same_error";
    }

    //현재 비밀번호 확인
    const checkCurrentPw = async () => {
        const data = {
            password : currentPw
        }
        return await RequestApi.request(`${process.env.NEXT_PUBLIC_LOGIN_API_HOST}/api/member/checkPw`,
        {
            method: "PATCH",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem("iuni")}`
            },
            body: JSON.stringify(data)
        }
    );
    }

    //비밀번호 정규식 확인
    const checkRegex = () => {
        let reg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/
        return reg.test(changePw) ? "success" : "reg_password";
    }

    //비밀번호 변경
    const updatePw = () => {
        const result = checkCurrentPw();
        console.log(result);
        // checkRegex();
        // comparePw();
        // reqChangePw();
        props.setIsChangePw(() => false);
    }

    return (
        <>
            <div className="item">
                <div className="item title">현재 비밀번호</div>
                <div className={changePwStatus === "normal" ? "item description" : "item description disabled"}>
                    <input type="password" className="pw-text" />
                    <div className="pw-change-cancle-btn" onClick={() => props.setIsChangePw(false)}>취소</div>
                </div>
                {
                    currentPwStatus !== "normal" &&
                    <div className="item disabled">
                        {ERROR_CASE["currentPw"]}
                    </div> 
                }
            </div>
            <div className="item">
                <div className="item title">비밀번호 변경</div>
                <div className={changePwStatus === "normal" ? "item description" : "item description disabled"}>
                    <input type={isChangePwShow ? "text" : "password"} className="pw-text" />
                    <Image src={isChangePwShow ? "/images/eye-open.webp" :"/images/eye-close.webp"} 
                        width={"32px"} 
                        height={"32px"} 
                        style={{cursor:"pointer"}}
                        onClick={() => setIsChangePwShow((props : boolean) => !props)}/>
                </div>
                {
                    changePwStatus !== "normal" &&
                    <div className="item disabled">
                        {ERROR_CASE[changePwStatus]}
                    </div> 
                }
                
            </div>
            <div className="item">
                <div className="item title">한번 더 입력해주세요.</div>
                <div className="item description">
                    <input type={isChangePwCheckShow ? "text" : "password"} className="pw-text" />
                    <Image src={isChangePwCheckShow ? "/images/eye-open.webp" :"/images/eye-close.webp"} 
                        width={"32px"} 
                        height={"32px"} 
                        style={{cursor:"pointer"}}
                        onClick={() => setIsChangePwCheckShow((props : boolean) => !props)}/>
                </div>
            </div>
            <div className="item">
                <div className="pw-change-btn" onClick={() => updatePw()}>변경 완료</div>
            </div>
            <style jsx>
                {
                    `
                    .item{
                        display: flex;
                        flex-direction: column;
                        width: 100%;
                    }
                    .item.title{
                        font-family: Pretendard;
                        font-size: 18px;
                        font-weight: bold;
                        font-stretch: normal;
                        font-style: normal;
                        letter-spacing: -0.18px;
                        text-align: left;
                    }
                    .item.disabled{
                        margin-top: 4.5px;
                        font-family: Pretendard;
                        font-size: 12px;
                        font-weight: 500;
                        font-stretch: normal;
                        font-style: normal;
                        line-height: 1.17;
                        letter-spacing: -0.12px;
                        text-align: left;
                        color: #ff0062;
                    }
                    .item.description{
                        display: flex;
                        flex-direction : row;
                        align-items : center;
                        font-size: 18px;
                        width: 100%;
                        height: 48px;
                        border-bottom: 2px solid #1120ff;
                    }
                    .item.description.disabled{
                        border-bottom: 2px solid #ff0062;
                    }
                    .pw-change-cancle-btn{
                        width: 60px;
                        margin : 0 0 0 auto;
                        font-size: 14px;
                        padding: 5px 16px;
                        color: 636363;
                        border-radius: 15px;
                        background-color: #f5f5f5;
                        cursor: pointer;   
                    }
                    .pw-text {
                        width: 100%;
                        font-size: 18px;
                        border:none;
                    }
                    .pw-text:focus {
                        outline-width: 0;
                    }
                    .pw-change-btn{
                        margin : 0 0 0 auto;
                        font-size: 14px;
                        padding: 5px 16px;
                        color: white;
                        border-radius: 15px;
                        background-color: #222;
                        cursor: pointer;
                    }
                    `
                }
            </style>
        </>
    )
}

export default ChangePw;

ChangePw.getLayout = function getLayout(page: React.ReactElement) {
    return (<Layout>{page}</Layout>)
}