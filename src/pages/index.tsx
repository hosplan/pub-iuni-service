"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import OauthLogin from './signUp/oauthLogin';
import { useRecoilState } from 'recoil';
import { emailState } from '../app/globalStates';
import * as MemberApi from "../../public/api/member";

export default function Home() {
    const [email, setEmail] = useState<string>("");
    const [pw, setPw] = useState<string>("");
    const router = useRouter();
    
    const signUpProcess = async () =>{
        const token = await MemberApi.signUp(email, pw);
    
        if(token.result !== "Success"){
            alert("회원정보가 일치하지 않습니다.");
            return false;
        }

        const result = await MemberApi.setToken(token.accessToken, token.refreshToken);
        if(result){
            router.push("/task");
        }
        
    }
    
    const pressEnter = (e : any) => {
        if(e.code === "Enter"){
            signUpProcess();
        }
    }

    useEffect(() => {
        const jwt = window.localStorage.getItem('iuni');
        if(jwt !== null){
            router.push("/task");
        }
    }, []);

    return (    
        <>  
            <main>
                <section className="home-info-container">
                    <div className="login-logo-container">
                        <img className="iuni-logo" src={'/logo/logo.iuni.svg'} alt={'iuniverse logo'}></img>
                    </div>

                    <div className="title-container">
                        <div className="iuni-login-title">로그인</div>
                        <div className="iuni-login-description">
                            아이유니버스에 오신걸 환영합니다.
                            <br />
                            로그인후 아이유니버스를 즐겨보세요.
                        </div>
                        
                        <OauthLogin />
                        <div className="iuni-login-split">
                            <div>
                                또는
                            </div>
                        </div>
                    </div>
         
                    <form onKeyUp={(e) => pressEnter(e)}>
                        <div className="login-container">
                            <div className="login-box">
                                <input type="text" placeholder="아이디" value={email} className="login-input" onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className="login-box">
                                <input type="password" placeholder="비밀번호" value={pw} className="login-input" onChange={(e) => setPw(e.target.value)} />
                            </div>
                            <div className="login-btn" onClick={() => signUpProcess()}>
                                로그인
                            </div>
                        </div>
                    </form>
                    
                    <div className="sign-up-box">
                        <div className="sign-up-text">아직 계정이 없으신가요?</div>
                        <Link href="/signUp">
                            <div className="sign-up-btn">
                                회원가입
                            </div>
                        </Link>
                    </div>

                    <div className="find-info-container">
                        <Link href="/lossPw">
                            <div className="find-info-password">
                                비밀번호 찾기
                            </div>
                        </Link>
                    </div>
                </section>
                <section className="home-img-container">
                    <img className="main-img" src={'/images/img.iuni_main.png'}></img>
                </section>
            </main>

            <style jsx>{`
               
                
                main {
                    display : grid;
                    padding : 2.08vw 1.04vw;
                    width : 100%;
                    height : 100%;
                    grid-template-columns : 1fr 2.84fr; 
                }
                .home-img-container{
                    width : 100%;
                    height: 100%;
                }
                .main-img{
                    width : 100%;
                    height: 100%;
                }
                .home-info-container{
                    display :grid;
                    width : 100%;
                    height : 100%;
                    padding-left: 2.29vw;
                    padding-right: 2.29vw; 
                }
                .banner-container{
                    width : 100%;
                    height : 10.15vw;
                }
                .iuni-logo{
                    width : 39px;
                    height: 39px;
                }
                .title-container{
                    width : 100%;
                    height : fit-content;
                    display : grid;                    
                    gap : 0.62vw;
                }
                .iuni-login-title{
                    font-size: 24px;
                    font-weight : 600;
                    letter-spacing: -0.36px;
                }
                .iuni-login-description{
                    font-size:18px;
                    letter-spacing: -0.18px;   
                }
                .iuni-login-split{
                    position : relative;
                    width : 100%; 
                    font-size : 12px;
                    color : #e5e5e5;
                    border : 1px solid #e5e5e5;
                    justify-self : center;
                    margin-top:24px;
                }
                .iuni-login-split>div{
                    position : absolute;
                    left : calc(50% - 30px);
                    top : -5px;
                    width : 60px;
                    text-align : center;                    
                    background-color : white;
                }
                .container{
                    display : grid;
                }
                .w-100{
                    width : 100%;
                }
                .step-container{
                    display : grid;
                    grid-template-columns: repeat(auto-fill, 64px);
                    grid-template-rows : 1fr; 
                    gap : 3px;
                    
                }
                .step{
                    text-align : center;
                }
                .step-indicator{
                    width: 64px;
                    height: 6px;
                    border-radius: 3px;
                    border: none;
                    outline: none;
                    background-color: #e5e7ff;
                    margin-top:5px;
                }
                .step-indicator.active{
                    background-color : #1120FF;
                }
                .login-box{
                    display:grid;
                    width: 100%;
                    height:48px;
                }
                .login-input{
                    font-size:18px;
                    border:none;
                    border-bottom : 1px solid #e5e5e5;
                    background-color: #fff;
                    outline : none;
                }
                .login-input::placeholder{
                    color : #a6a6a6;
                }
                .login-input:focus{
                    border-bottom: 1px solid #1120ff;
                    background-color: #fff;
                }
               
                .sign-up-box{
                    display : grid;
                    grid-template-columns : auto auto;
                    align-items : center
                    gap: 6px;
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
                    cursor : pointer;
                }
                .login-container{
                    display : grid;
                    gap:30px;
                }
                .sign-up-text{
                    display :grid;
                    justify-items : end;
                }
                .sign-up-btn{
                    margin-left: 10px;
                    color: #878fff;
                    text-decoration : underline;
                    cursor:pointer;
                }
                .find-info-container{
                    display : grid;
                    grid-template-columns : 100%;
                    justify-self : center;
                    letter-spacing: -0.18px;
                }
                .find-info-email{
                    display : grid;
                    justify-self : end;
                    cursor:pointer;
                }
                .find-info-password{
                    display : grid;
                    justify-self : start;
                    cursor:pointer;
                }
                .find-info-divide-img{
                    width : 18px;
                    height: 18px;
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
            `}</style>
        </>
    );
}
