import React, { useEffect, useState } from "react";


interface Creator{
    "role": string;
    "creator": string;
    "description": string;
    "email": string;
}
interface Props{
    data : Creator;
    width: number;
}
function Card(props: Props) {
    
    const [status, setStatus] = useState<string>("none");
    // useEffect(() => {
    //     if(props.width){
    //         console.log(props.width/3);
    //     }
    // }, []);
    
    return (
        <>
            <div className="card" 
                onMouseEnter={() => setStatus(() => "active")} 
                onMouseLeave={() => setStatus(() => "none")} >
                <div className="card-container">
                    <svg xmlns="http://www.w3.org/2000/svg" width={props.width > 770 ? "13.625rem" : props.width / 2} height={props.width > 770 ? "13.625rem" : props.width / 2} viewBox="0 0 48 48" style={{"margin": "0 auto"}}>
                        <path data-name="background" d="M24 0A24 24 0 1 1 0 24 24 24 0 0 1 24 0" style={{ "fill": "rgb(183, 187, 255)" }}></path>
                        <path data-name="body" d="M33.945 10.305h-2.42l-3.337 6.936h-8.375l-3.337-6.936h-2.421S5.275 22.35 1.391 32.058a24 24 0 0 0 45.219 0c-3.885-9.708-12.665-21.753-12.665-21.753" style={{ "fill": "rgb(87, 98, 255)" }}></path>
                        <path data-name="nose" d="m24 37.624-1.39-1.54h2.78z" style={{ "fill": "rgb(255, 255, 255)" }}></path>
                        <path data-name="left-eye-white" d="M16.119 35.59a5.3 5.3 0 1 1 5.3-5.3 5.3 5.3 0 0 1-5.3 5.3" style={{ "fill": "rgb(255, 255, 255)" }}></path>
                        <path data-name="left-eye" d="M16.119 33.153a2.865 2.865 0 1 1 2.864-2.865 2.865 2.865 0 0 1-2.864 2.865" style={{ "fill": "rgb(2, 9, 24)" }}></path>
                        <path data-name="right-eye-white" d="M31.882 35.59a5.3 5.3 0 1 1 5.3-5.3 5.3 5.3 0 0 1-5.3 5.3" style={{ "fill": "rgb(255, 255, 255)" }}></path>
                        <path data-name="right-eye" d="M31.882 33.153a2.865 2.865 0 1 1 2.864-2.865 2.865 2.865 0 0 1-2.864 2.865" style={{ "fill": "rgb(2, 9, 24)" }}></path>
                    </svg>

                    <div className="badge">
                        {props.data?.role}
                    </div>
                    <div className="creator-name">
                        {props.data?.creator}
                    </div>
                    <div className="description">
                        {props.data?.description}
                    </div>
                </div>

                <div className={`container-backdrop ${status}`}>
                    <p className="p-email">{props.data?.creator}</p>
                    <p className="p-description">{props.data?.email}</p>
                </div>

            </div>
            <style jsx>
            {
                `
                .p-email{
                    font-family: Pretendard;
                    font-size: 24px;
                    font-weight: 600;
                }
                .p-description{
                    font-family: Pretendard;
                    font-size: 18px;
                    letter-spacing: -0.18px;
                }
                .card{
                    position: relative;
                    flex-grow:1;
                    min-width:24.375rem;
                    max-width: 24.375rem;
                    height: 30rem;
                    background-color: #fff;
                    border-radius: 24px;
                    margin-top: 13px;
                    cursor: pointer;
                    
                }
                .container-backdrop{
                    display : flex;
                    opacity: 0;
                    position: absolute;
                    gap: 16px;
                    align-items:center;
                    justify-content:center;
                    flex-direction: column;
                    border-radius: 24px;
                    width: 100%;
                    height: 100%;
                    z-index: 999;
                    top:50%;
                    left:50%;
                    transform: translate(-50%, -50%);
                    -webkit-backdrop-filter: blur(33px);
                    backdrop-filter: blur(33px);
                    transition: opacity 0.5s ease 
                }
                .container-backdrop.active{
                    opacity: 1;
                }
                .container-backdrop.none{
                    border-radius: 24px;
                }
                .card-container{
                    display: flex;
                    justify-content: center;
                    flex-direction: column;
                    width: 100%;
                    height: 100%;
                }
                .badge{
                    margin: 0 auto;
                    width: 100px;
                    padding: 5px;
                    font-size: 18px;
                    font-weight: 600;
                    border-radius: 15px;
                    background-color: #f2f3ff;
                    text-align: center;
                    color: #08107f;
                    margin-top:24px;
                }
                .creator-name{
                    margin-top: 11px;
                    font-size: 36px;
                    font-weight: 600;
                    text-align:center;
                }
                .description{
                    margin-top: 20px;
                    font-size: 18px;
                    font-weight: 600;
                    color: #9fa5ff;
                    text-align:center;
                }
          
                @media(max-width: 770px){
                    .card{
                        min-width: 80%;
                        height: 100%;
                        margin-top: 0px;
                        margin:0 auto;
                    }
                }
                `
            }
            </style>
        </>
    )
}


export default React.memo(Card);