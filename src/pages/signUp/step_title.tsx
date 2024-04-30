interface Props{
    step : number
}
export default function StepTitle(props : Props) {
    return (
        <>
            {
                props.step === 1 ? 
                <>
                    <div className="iuni-login-title">아이유니버스에 <br />오신걸 환영합니다.</div>
                    <div className="iuni-login-description">
                        가입을 위해 아래 소셜 로그인을 하거나,
                        <br />
                        아이디와 비밀번호를 입력해주세요.
                    </div>
                </>
                :
                props.step === 2 ?
                <>
                    <div className="iuni-login-title">회원가입이 <br />거의 끝나가요.</div>
                    <div className="iuni-login-description">
                        더욱 편리한 서비스 이용을 위해
                        <br />
                        개인정보를 입력해주세요.
                    </div>
                </>
                :
                <>
                    <div className="iuni-login-title">회원가입 완료!</div>
                    <div className="iuni-login-description">
                        이제 아이유니버스 서비스를
                        <br />
                        이용하실 수 있어요.
                    </div>
                </>
            }
            
            <style jsx> {`
                .iuni-login-title{
                    font-size: 2.25rem;
                    font-weight : 600;
                    letter-spacing: -0.36px;
                }
                .iuni-login-description{
                    font-size:1.125rem;
                    letter-spacing: -0.18px;
                    padding-top: 0.874rem;
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
            `}
            </style>
        </>
    )
}