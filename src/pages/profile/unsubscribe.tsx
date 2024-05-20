import React, { useState } from "react";
import * as MemberApi from "../../../public/api/member";
import { Console } from "console";
interface Props {
    setIsUnscribe: React.Dispatch<React.SetStateAction<boolean>>
}
function Unsubscribe(props: Props) {
    const [isActive, setIsActive] = useState<boolean>(false);
    const router = useRouter();
    const reqUnscribe = async () => {
        if (!isActive) {
            alert("동의란에 체크를 해주세요!");
            return false;
        }
        const disconnectResult = await MemberApi.disconnectAllUser();
        console.log(disconnectResult);
        const unscribeResult = await MemberApi.unscribe();
        console.log(unscribeResult);
        window.localStorage.removeItem('iuni');
        window.localStorage.removeItem("iuni_refresh");
        router.push("/");

    }
    return (
        <>
            <div className="container">
                <div className="title">탈퇴하기</div>
                <div className="sub-title">
                    회원 탈퇴 신청에 앞서<br />
                    아래 내용을 반드시 확인해주세요.
                </div>

                <div className="item-container">
                    <div className="item">
                        <div className="item-title">
                            회원탈퇴 시 처리내용
                        </div>
                        <div className="item-description">
                            회원님의 모든 게시물과의 연결관계가 삭제 됩니다.<br />
                            동 개인정보는 법률에 의한 보유 목적 외에 다른 목적으로는 이용되지 않습니다.
                        </div>
                    </div>

                    <div className="item">
                        <div className="item-title">
                            회원탈퇴 시 게시물 관리
                        </div>
                        <div className="item-description">
                            회원탈퇴 후 iUniverse 서비스에 입력한 게시물 및 댓글은 삭제되지 않으며,<br />
                            회원 정보 삭제로 인해 작성자 본인을 확인할 수 없으므로 게시물 편집 및 삭제 처리가 원천적으로 불가능합니다.<br />
                            게시물 삭제를 원하시는 경우에는 먼저 해당 게시물을 삭제 하신 후, 탈퇴를 신청하시기 바랍니다.
                        </div>
                    </div>

                    <div className="item">
                        <div className="item-title">
                            회원탈퇴 후 재가입 규정
                        </div>
                        <div className="item-description">
                            탈퇴 회원이 재가입하더라도 기존의 정보 연결관계는 모두 삭제되었기 때문에<br />
                            복구가 불가능 합니다.
                        </div>
                    </div>
                </div>

                <div className="sign-content" onClick={() => setIsActive((prev: boolean) => !prev)}>
                    <img className="checkbox" src={isActive ? '/images/active/checkbox.webp' : '/images/default/checkbox.webp'}></img>
                    [필수]위 내용을 모두 확인하였습니다.
                </div>
                <div className="btn-contents">
                    <div className="unsubscribe-btn" onClick={() => reqUnscribe()}>
                        탈퇴 신청
                    </div>
                    <div className="unsubscribe-btn cancle" onClick={() => props.setIsUnscribe(() => false)}>
                        뒤로가기
                    </div>
                </div>

            </div>
            <style jsx>
                {
                    `
                    .container{
                        display: flex;
                        width: 100%;
                        flex-direction: column;
                        gap: 14px;
                        padding: 2.719rem 2.75rem;
                    }
                    .checkbox { 
                        width: 2rem;
                        height: 2rem;
                    }
                    .title{
                        font-size: 36px;
                        font-weight: 600;
                        letter-spacing: -0.36px;
                        text-align: left;
                        color: #222; 
                    }
                    .sub-title{
                        font-size: 24px;
                        font-weight: bold;
                        font-stretch: normal;
                        font-style: normal;
                        letter-spacing: -0.24px;
                        color: #222;
                        margin-top : 2.938rem;
                    }
                    .item-container{
                        margin-top:18px;
                        display: flex;
                        flex-direction : column;
                        gap: 24px;
                        padding:24px;
                        width:440px;
                        border: solid 1px #e5e5e5
                    }
                    .item{
                        display: flex;
                        flex-direction:column;
                        gap: 8px;
                    }
                    .item-title{
                        font-size: 18px;
                        font-weight: 500;
                        font-stretch: normal;
                        font-style: normal;
                        letter-spacing: -0.18px;
                        color: #222;
                    }
                    .item-description{
                        font-size: 12px;
                        letter-spacing: -0.12px;
                        color: #222;
                        background-color: #00e15a;
                        background-color: rgba( 0, 225, 90, 0.1 );
                    }
                    .sign-content{
                        display : flex;
                        margin-top:12px;
                        font-size: 18px;
                        letter-spacing: -0.18px;
                        text-align: left;
                        align-items : center;
                        color: #222;
                        cursor: pointer;
                    }
                    .btn-contents{
                        display : flex;
                        margin-top : 72px;
                        flex-direction : column;
                        gap:10px;
                    }
                    .unsubscribe-btn{
                        display :flex;
                        justify-content:center;
                        align-items:center;
                        width: 440px;
                        height: 48px;
                        background-color: #f5f5f5;
                        font-size: 18px;
                        font-weight: 500;
                        letter-spacing: -0.18px;
                        color: #636363;
                        border-radius: 24px;
                        cursor : pointer;
                    }
                    .unsubscribe-btn.cancle{
                        background-color: #1120ff;
                        color: #fff;
                    }
                `
                }
            </style>

        </>
    )
}

export default React.memo(Unsubscribe);