import { useState } from "react";
import { useRouter } from "next/router";
import StepTitle from "./stepTitle";
import StepContents from "./stepContents";
import Image from "next/image";
export default function Page(){
    //step
    const [step, setStep] = useState<number>(1);
    const router = useRouter();
   
    return (
        <>
            <main>
                <section className="home-info-container">
                    <div className="logo-container">
                        <Image 
                            alt={'iuniverse logo'}
                            height={"3rem"}
                            width={"3rem"}
                            src={"/logo/logo.iuni.svg"} />
                    </div>
                    <div className="content-container">                    
                        <StepTitle step={step} />
                        <StepContents setStep={setStep} step={step}/>
                    </div>
                    
                </section>
                <section className="home-img-container">
                    <Image
                        width={"100%"}
                        height={"100%"}
                        src={"/images/img.iuni_main.png"} />
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
                    grid-template-rows: 0.5fr 1fr;
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
  
                .content-container{
                    width : 100%;
                    height : 100%;
                    display : grid;                    
                    gap : 0.75rem;
                    grid-template-rows: 0.1fr 0.1fr auto;
                }
                
                .container{
                    display : grid;
                }
                .w-100{
                    width : 100%;
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
                    .home-info-container{
                        grid-template-rows: 1fr;
                    }
                    .content-container{
                        grid-template-rows: 0.3fr 0.1fr auto;
                    }
                }
            `}</style>
        </>
    );
}

// Page.getLayout = function getLayout(page: React.ReactElement) {
//     return (<LoginLayout>{page}</LoginLayout>)
// };