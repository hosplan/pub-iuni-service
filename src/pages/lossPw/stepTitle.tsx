interface Props{
    step: number
}
export default function StepTitle(props : Props){
    return(
        <>
           <div className="iuni-loss-pw-title">
                비밀번호 찾기
           </div>
         
           <div className="iuni-loss-pw-description">
                {
                    props.step === 3 ?
                    <>
                    비밀번호 변경 작업을 완료했어요!
                    <br />
                    이제 로그인을 해볼까요?
                    </>
                    
                    :
                    <>
                    비밀번호를 잃어버리셨군요?
                    <br />
                    금방 찾아 드릴께요.
                    </>
                }       
           </div>
           <style jsx>
            {
                `
                    .iuni-loss-pw-title{
                        font-size: 2.25rem;
                        font-weight : 600;
                        letter-spacing: -0.36px;
                    }
                    .iuni-loss-pw-description{
                        font-size:1.125rem;
                        letter-spacing: -0.18px;
                        padding-top: 0.874rem;
                    }
                    
                    @media(max-width: 1200px){
                        main{
                            display: grid;
                            width:100%;
                            height:100%;
                            grid-template-columns: 1fr;
                            padding: 32px 28px;
                        }
                        .hom-img-container{
                            display: none;
                        }
                        .iuni-loss-pw-description{
                            justify-self:center;
                            text-align:center;
                        }
                        .iuni-loss-pw-title{
                            justify-self:center;
                            align-self:center;
                        }
                    }
                `
            }
           </style>
        </>
    )
}