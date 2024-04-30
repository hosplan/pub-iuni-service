import Layout from "../../app/layout";
import Card from "./card";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dev from "./developer.module.scss";
import Image from "next/image";
function Page() {
    const [innerWidth, setInnerWidth] = useState<number>(0);
    const router = useRouter();
    const data_list = [
        {
            "role": "PM",
            "creator": "김태호",
            "description": "리더",
            "email": "xogh940821@gmail.com"
        },
        {
            "role": "디자인",
            "creator": "박수현",
            "description": "디자인 총괄",
            "email": "tngus1779@naver.com"
        },
        {
            "role": "개발",
            "creator": "안예진",
            "description": "개발",
            "email": "jekr16@naver.com",
        },
        {
            "role": "개발",
            "creator" : "안건우",
            "description" : "개발",
            "email": "agw0524@gmail.com"
        },
        {
            "role" : "기획",
            "creator" : "박윤지",
            "description" : "기획",
            "email" : "dbswl0391@naver.com"
        }
        
    ];

    const resizeListener = () => {
        setInnerWidth(window.innerWidth);
    };


    useEffect(() => {
        setInnerWidth(window.innerWidth);
        window.addEventListener("resize", resizeListener);
        return () => {
            window.removeEventListener("resize", resizeListener);
        };

    }, []);

    useEffect(() => {
        const jwt = window.localStorage.getItem('iuni');      
        if(jwt === null){
            router.push("/");
        }
    },[]);
    return (
        <>

            <div className="container">
                <div id={dev.smallStars}></div>
                <div id={dev.middleStars}></div>
                <div id={dev.bigStars}></div>
                <div className="box">
                    <img 
                        className="mobile-image-logo"
                        style={{width:"170px", height:"40px"}}
                        src={"/images/mobile-logo.webp"} />

         
                    <div className="header">
                        <div className="header-name">Developer</div>
                        <div className="header-description">만든 사람</div>
                    </div>
                    <div className="body">
                        {
                            (innerWidth && innerWidth > 770) 
                            ?
                            <>
                            {
                                data_list.map((data, index) => (
                                    <>
                                        <Card
                                            width={innerWidth}
                                            data={data}
                                            key={index}
                                        />
                                    </>
                                ))
                            } 
                            </>
                            :
                            <>
                            <Swiper
                                key={"iuni-swiper-thing"}
                                slidesPerView={1}
                                spaceBetween={30}
                                centeredSlides={true}
                                pagination={{
                                    clickable: true,
                                }}
                                modules={[Pagination]}
                                className="mySwiper"
                            >
                                {
                                    data_list.map((data, index) => (
                                        <>
                                            <SwiperSlide key={index}>
                                                <Card
                                                    width={innerWidth}
                                                    data={data}
                                                    key={index}
                                                />
                                            </SwiperSlide>
                                        </>
                                    ))
                                }
                            </Swiper>
                            </>
                        }
                    </div>
                </div>
            </div>
            <style jsx>
                {
                    `
                    .mobile-image-logo{
                        display: none;
                    }
                    .container{
                        position: relative;
                        display: flex;
                        justify-content: center;
                        width: 100%;
                        height: 100%;
                        background-image: linear-gradient(to bottom, #b7bbff, #ffdffa);
                        overflow:auto;
                    }
                    .box{
                        padding-top: 2.813rem;
                        display: flex;
                        flex-direction: column;
                        width: 67%;
                        height: fit-content;
                    }
                    .header{
                        display : flex;
                        width: 100%;
                        flex-direction: column;
                        justify-content: flex-start;
                        gap: 10px;
                        z-index:15;
                    }
                    .header-name{
                        font-size: 4rem;
                        font-weight: 600;
                    }
                    .header-description{
                        font-size: 1.5rem;
                        font-weight: normal;
                        color: #030633;
                    }
                    .body{
                        display: flex;
                        justify-content: center;
                        padding-top: 17px;
                        width: 100%;
                        height: 100%;
                        gap: 18px;
                        flex-wrap: wrap;
                        padding-bottom: 130px;
                    }
                    @media(max-width: 770px){
                        .box{
                            width:100%;
                            height: 100%;
                            padding-top: 0.75rem;
                        }
                        .header{
                            margin-top: 5%;
                            gap: 6px;
                        }
                        .header-name{
                            text-align: center;
                            font-size:2.25rem;
                            font-weight:600;
                        }
                        .header-description{
                            text-align: center;
                            font-size: 1.125rem;
                        }
                        .body{
                            overflow-x: auto;
                            flex-wrap:nowrap;
                            height: 70%;
                            margin-top: 3%;
                            padding-left: 0.75rem;
                            padding-right: 0.75rem;
                            justify-content: start;
                            padding-bottom:0;
                        }
                        .mobile-image-logo{
                            display: block;
                        }
                    }
                `
                }
            </style>
        </>
    )
}

export default Page;
Page.getLayout = function getLayout(page: React.ReactElement) {
    return (<Layout>{page}</Layout>)
}