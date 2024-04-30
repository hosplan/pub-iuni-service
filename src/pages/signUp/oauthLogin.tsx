import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/router";
import { useEffect } from "react";
import KakaoLogin from "react-kakao-login";
import * as MemberApi from "../../../public/api/member";

export default function OauthLogin() {
    const router = useRouter();

    const startGoogleLogin = useGoogleLogin({
        onSuccess: async (response) => {
            const userInfo = await MemberApi.getGoogleUserInfo(response.access_token)
            const token = await MemberApi.loginGoogleOAuth(userInfo);
            MemberApi.setToken(token.accessToken, token.refreshToken);
            router.push("/task");
        },
        onError: (error) => {
            console.log(error);
        },
    });

    const loginKakaoOauth = async (code: string) => {
        const token = await MemberApi.getTokenInfo(code);
        MemberApi.setToken(token.accessToken, token.refreshToken);
        router.push("/task");
    }

    const startKaKaoLogin = async () => MemberApi.getKakaoCode();

    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get("code");
        if (code !== null) {
            loginKakaoOauth(code);
        }
    }, []);

    return (
        <>
            <div className="social-login-btn-list">
                <div className="oauth-btn" onClick={() => startGoogleLogin()}>
                    <img className="sns-logo" src={'/images/google-icon.webp'} alt="google login" />
                    구글로 계속하기
                </div>
                <div className="oauth-btn" onClick={() => startKaKaoLogin()}>
                    <img className="sns-logo" src={'/images/kakaotalk-login-btn.png'} alt="kakao login" />
                    카카오톡으로 계속하기
                </div>

                <img className="sns-logo mobile" onClick={() => startGoogleLogin()} src={'/images/google-login-btn.png'} alt="google login" />
                <img className="sns-logo mobile" onClick={() => startKaKaoLogin()} src={'/images/kakaotalk-login-btn.png'} alt="kakao login" />
            </div>

            <style jsx>
                {
                    `
                .social-login-btn-list{
                    margin-top:18px;
                    display: flex;
                    justify-content: center;
                    flex-direction: column;
                    gap:10px;
                }
                .sns-logo{
                    width : 32px;
                    height: 32px;
                    cursor: pointer;
                }
                .sns-logo.mobile{
                    display : none;
                }
                .oauth-btn{
                    display: flex;
                    justify-content: center;
                    font-size: 18px;
                    font-weight: 500;
                    letter-spacing: -0.18px;
                    width:100%;
                    gap: 8px;
                    padding-top:8px;
                    padding-bottom:8px;
                    border-radius: 24px;
                    border: solid 1px #e5e5e5;
                    background-color: #fff;
                    align-items: center;
                    cursor: pointer;
                }
                @media(max-width: 770px){
                    .social-login-btn-list{
                        flex-direction: row;
                    }
                    .oauth-btn{
                        display: none;
                    }    
                    .sns-logo.mobile{
                        display: block;
                    }
                    .sns-logo{
                        width: 48px;
                        height: 48px;
                    }
                }
                `
                }
            </style>
        </>
    )
}