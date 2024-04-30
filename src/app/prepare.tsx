import { useEffect, useRef } from "react";
import Image from "next/image";
interface Props{
    setPrepare : React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Prepare(props: Props) {
    const close = () => props.setPrepare(() => false);

    const prepareRef = useRef<any>();
    useEffect(() => {
        function handleFocus(e : any) {
            if(prepareRef.current && !prepareRef.current.contains(e.target)){
                props.setPrepare(() => false);
            }
        }
        document.addEventListener("mouseup", handleFocus);
        return () => { document.removeEventListener("mouseup", handleFocus) }
    }, [prepareRef]);

    
    return(
        <>
            <div className="container" ref={prepareRef}>
                <div className="thumbnail">
                       <Image 
                            src={"/images/prepare.webp"}
                            width={"100%"}
                            height={"100%"} />
                </div>
                <div className="title">
                    <div className="title-content">아직 준비중이에요.</div>
                </div>
                <div className="description">
                    <div className="description-content">빠른 시일안에 완성하도록 할게요!</div>
                </div>
                <div className="btn">
                    <div className="btn-content" onClick={() => close()}>확인</div>
                </div>
            </div>
            <style jsx>
                {
                    `
                        .container{
                            position: absolute;
                            display: flex;
                            flex-direction:column;
                            align-items : center;
                            justify-contents: center;
                            width: 480px;
                            top:25%;
                            left:40%;
                            height: 301px;
                            padding: 40px;
                            border-radius: 24px;
                            box-shadow: 0 0 12px 0 rgba(34, 34, 34, 0.18);
                            background-color: #fff;
                            z-index: 9999;
                        }
                        .thumbnail{
                            width:100px;
                            height:100px;
                        }
                        .title{
                            padding-top:20px;
                            font-size: 18px;
                            color: #222;
                        }
                        .description{
                            padding-top:8px;
                            font-size: 12px;
                            color: #7a7a7a;
                        }
                        .btn{
                            display: flex;
                            justify-items: center;
                            padding-top:16px;
                        }
                        .btn-content{
                            border-radius:6px;
                            padding: 10px;
                            width: 100px;
                            font-size: 18px;
                            font-weight: 500;
                            color: #fff;
                            background-color: #1120ff;
                            text-align:center;
                        }
                        @media (max-width: 770px){
                            .container{
                                left:5%;
                                width: 90%;
                            }
                            
                        }
                    `
                }
            </style>
        </>
    )
}