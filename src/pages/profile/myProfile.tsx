import { useEffect, useState } from "react";
import * as IuniStyleApi from "../../../public/api/iuniStyle";
import ChangePw from "./changePw";
import { changePw } from "../../../public/api/losePw";
interface User {
    nickName : string,
    email : string,
    name : string
}
export default function MyProfile(){
    const [user, setUser] = useState<User | undefined>();
    const [isChangePw, setIsChangePw] = useState<boolean>(false);

    const getMyInfo = async () => {
        const userInfo = await IuniStyleApi.getUserProfile();
        
        setUser((props : User | undefined) => {
            const result = {
                "email" : userInfo.email,
                "nickName" : userInfo.nickName,
                "name" : userInfo.name
            }
            return {...result};
        });
    }

    useEffect(() => {
        getMyInfo();
    }, []);
    return(
        <>
            <div className="content">
                <div className="content-header">
                    <div className="content-title">내 정보 변경</div>
                </div>
                <div className="content-body">
                    <div className="basic-info">
                        <div className="item">
                            <div className="item title">이메일</div>
                            <div className="item description">
                                {user?.email}
                            </div>
                        </div>
                        
                        <div className="item">
                            <div className="item title">비밀번호</div>
                            <div className="item description">
                                *******
                                {
                                    !isChangePw && 
                                    <div className="pw-change-btn" onClick={() => setIsChangePw(() => true)}>변경하기</div>
                                }
                            </div>
                        </div>
                        {
                            isChangePw &&
                            <ChangePw setIsChangePw={setIsChangePw}/>
                        }
                        <div className="item">
                            <div className="item title">닉네임</div>
                            <div className="item description">
                                {user?.nickName}
                            </div>
                        </div>

                        <div className="item">
                            <div className="item title">이름</div>
                            <div className="item description">
                                {user?.name}
                            </div>
                        </div>

                        <div className="item unSubscribe">
                            <div className="unSubscribe">탈퇴하기</div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>
                {
                    `
                    .content{
                        display: flex;
                        width: 100%;
                        flex-direction: column;
                        gap: 14px;
                        padding: 2.719rem 2.75rem;
                    }
                    .content-title{
                        font-size: 36px;
                        font-weight: 600;
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
                    .content-body{
                        padding-top: 2.563rem;
                        width: 100%;
                    }
                    .basic-info{
                        display: flex;
                        gap: 1.938rem;
                        flex-direction: column;
                        width: 440px;
                        height: 80vh;
                    }
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
                    .item.description{
                        display: flex;
                        flex-direction : row;
                        align-items : center;
                        font-size: 18px;
                        width: 100%;
                        height: 48px;
                        border-bottom: 2px solid #1120ff;
                    }
                    .unSubscribe{
                        margin : auto 0 0;
                        color : #ff0062;
                        text-decoration: underline;
                    }
                    `
                }
            </style>
        </>
    )
}