"use client"
import Link from "next/link";
import Image from "next/image";
export default function Complete(){
    return(
        <>
            <div className="complete-img-box">
                <img className="sign_up_complete" src="/images/sign_up_complete.webp" />
            </div>
            <Link href="/">
                <div className="login-btn">
                    로그인
                </div>
            </Link>

            <style jsx>{`
                .login-btn{
                    display : grid;
                    width : 100%;
                    height :3rem;
                    justify-items : center;
                    align-items : center;
                    background-color : #1120ff;
                    border-radius : 50px;
                    color : white;
                    cursor : pointer;
                }
                .sign_up_complete{
                    width : 10.625rem;
                    height : 10.625rem;
                    margin-top : 2.25rem;
                }
                .complete-img-box{
                    display:grid;
                    justify-items : center;
                    height:16.25rem;
                }
            `}
            </style>
        </>
    );
}