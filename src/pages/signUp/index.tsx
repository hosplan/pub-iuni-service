import Link from "next/link";
import { useState } from "react";
import StepOne from "./step_one";
import StepTitle from "./step_title";
import StepTwo from "./step_two";
import Complete from "./complete";
import { useRouter } from "next/router";
import Image from "next/image";
export default function Page(){
    //step
    const [step, setStep] = useState<number>(1);
    const router = useRouter();
    const stepRender = (step: number) => {
        if (step === 1) {
            return <StepOne setStep={setStep} />;
        } else if (step === 2) {
            return <StepTwo setStep={setStep} />;
        } else {
            return <Complete />;
        } 
    }
    
    return (
        <>
            <main>
                <section className={step !== 3 ? "home-info-container" : "home-info-container complete"}>
                    <div className="logo-container">
                        <img className="iuni-logo" src={'/logo/logo.iuni.svg'} alt={'iuniverse logo'}></img>
                    </div>

                    <div className={step === 3 ? "complete-title-container" : "title-container"}>
                        {
                            step !== 3 &&
                            <>
                            <div className="step-container">
                                <div>
                                    <div className={step === 1 ? "step active" : "step"}>Step 1</div>
                                    <div className={`step-indicator ${step === 1 ? "active" : ""}`}></div>
                                </div>
                                <div>
                                    <div className={step === 2 ? "step active" : "step"}>Step 2</div>
                                    <div className={`step-indicator ${step === 2 ? "active" : ""}`}></div>
                                </div>
                            </div>
                            </>
                        }

                        <StepTitle
                            step={step} />
                        {
                            step !== 3 &&
                            <>
                            <div className="iuni-google-login-btn">
                                <div>
                                    <Image 
                                        width={"34px"}
                                        height={"34px"}
                                        alt={"google login"}
                                        src={"/images/google-icon.webp"} />
                                    <div>구글로 회원가입</div>
                                </div>
                            </div>
                            <div className="iuni-login-split">
                                <div>
                                    또는
                                </div>
                            </div>
                            </>
                        }
                    </div>
                    <div className="login-container">
                        {stepRender(step)}
                    </div>

                    {
                        step !== 3 &&
                        <>
                        <div className="sign-up-box">
                            <div className="sign-up-text">이미 회원이시라구요?</div>
                            <Link href="/">
                                <div className="sign-up-btn">
                                    로그인
                                </div>
                            </Link>
                        </div>
                        </>
                    }

                </section>
                <section className="home-img-container">
                    <img className="main-img" src={'/images/img.iuni_main.png'}></img>
                </section>
            </main>
            <style jsx>{`
                main {
                    display : grid;
                    padding : 2.5rem 1.25rem;
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
                    display : grid;
                    width : 100%;
                    height : 100%;
                    padding-left: 2.75rem;
                    padding-right: 2.75rem; 
                }
                .home-info-container.complete{
                    display:block;
                }
                .banner-container{
                    width : 100%;
                    height : 12.188rem;
                }
                .iuni-logo{
                    width : 3rem;
                    height: 3rem;
                }
                .title-container{
                    width : 100%;
                    height : fit-content;
                    display : grid;                    
                    gap : 0.75rem;
                }
                .complete-title-container{
                    padding-top:7.5rem;
                }
                .iuni-google-login-btn{
                    display:grid;
                    width:100%;
                    padding-top: 14px;
                    padding-bottom: 14px;
                    border-radius: 24px;
                    border: solid 1px #e5e5e5;
                    justify-self : center;
                    cursor: pointer;
                    margin-top:18px;   
                    font-size: 18px;
                    font-weight: 500;
                }
                .iuni-google-login-btn>div{
                    display: grid;
                    justify-self : center;
                    align-items : center;
                    grid-template-columns : 2rem auto; 
                    gap : 8px;
                }
           
                .iuni-login-split{
                    position : relative;
                    width : 100%; 
                    font-size : 0.75rem;
                    color : #e5e5e5;
                    border : 1px solid #e5e5e5;
                    justify-self : center;
                    margin-top:1.5rem;
                }
                .iuni-login-split>div{
                    position : absolute;
                    left : calc(50% - 1.875rem);
                    top : -5px;
                    width : 3.75rem;
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
                    grid-template-columns: repeat(auto-fill, 4rem);
                    grid-template-rows : 1fr; 
                    gap : 3px;
                    text-align:center;
                }
                .step{
                    font-size: 0.875rem;
                    font-stretch: normal;
                    font-style: normal;
                    letter-spacing: -0.14px;
                    text-align : center;
                    opacity : 0;
                }
                .step.active{
                    font-weight: bold;
                    color: #1120ff;
                    opacity : 1;
                }
                .step-indicator{
                    width: 4rem;
                    height: 0.375rem;
                    border-radius: 3px;
                    border: none;
                    outline: none;
                    background-color: #e5e7ff;
                    margin-top:5px;
                }
                .step-indicator.active{
                    background-color : #1120FF;
                }
               
                .sign-up-box{
                    display : grid;
                    grid-template-columns : auto auto;
                    align-items : center
                    gap: 6px;ƒ
                }
                .login-container{
                    
                }
                .sign-up-text{
                    display :grid;
                    justify-items : end;
                }
                .sign-up-btn{
                    margin-left: 0.625rem;
                    color: #878fff;
                    text-decoration : underline;
                    cursor:pointer;
                }
                .find-info-container{
                    display : grid;
                    grid-template-columns : auto 18px auto;
                    justify-items : center;
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
                    width : 1.125rem;
                    height: 1.125rem;
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

// Page.getLayout = function getLayout(page: React.ReactElement) {
//     return (<LoginLayout>{page}</LoginLayout>)
// };