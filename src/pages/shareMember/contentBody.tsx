import { iuniStyleState } from "@/app/globalStates";
import { useRecoilState } from "recoil";
import MemberBlock from "./memberBlock";
interface Props {
    setSelectMembers: React.Dispatch<React.SetStateAction<any>>;
    members: any;
    contentBodyDes : string;
}

export default function ContentBody(props: Props) {
    const [iuniStyle, setIuniStyle] = useRecoilState(iuniStyleState);

    return (
        <>
            {
                props.members?.length === 0 ?
                <>
                    <div className="member-empty">
                        <svg xmlns="http://www.w3.org/2000/svg" width="8rem" height="8rem" viewBox="0 0 48 48" style={{ margin: "0 auto", cursor:"pointer" }}>
                            <path data-name="background" d="M24 0A24 24 0 1 1 0 24 24 24 0 0 1 24 0" style={{ fill: iuniStyle.background }} />
                            <path data-name="body" d="M33.945 10.305h-2.42l-3.337 6.936h-8.375l-3.337-6.936h-2.421S5.275 22.35 1.391 32.058a24 24 0 0 0 45.219 0c-3.885-9.708-12.665-21.753-12.665-21.753" style={{ fill: iuniStyle.body }} />
                            <path data-name="nose" d="m24 37.624-1.39-1.54h2.78z" style={{ fill: iuniStyle.nose }} />
                            <path data-name="left-eye-white" d="M16.119 35.59a5.3 5.3 0 1 1 5.3-5.3 5.3 5.3 0 0 1-5.3 5.3" style={{ fill: iuniStyle.leftWhiteEye }} />
                            <path data-name="left-eye" d="M16.119 33.153a2.865 2.865 0 1 1 2.864-2.865 2.865 2.865 0 0 1-2.864 2.865" style={{ fill: iuniStyle.leftEye }} />
                            <path data-name="right-eye-white" d="M31.882 35.59a5.3 5.3 0 1 1 5.3-5.3 5.3 5.3 0 0 1-5.3 5.3" style={{ fill: iuniStyle.rightWhiteEye }} />
                            <path data-name="right-eye" d="M31.882 33.153a2.865 2.865 0 1 1 2.864-2.865 2.865 2.865 0 0 1-2.864 2.865" style={{ fill: iuniStyle.rightEye }} />
                            
                            <g xmlns="http://www.w3.org/2000/svg" data-name="그룹 14148" transform="translate(26.58 24.773)">
                                <path data-name="패스 10969" d="M0 5.3a5.3 5.3 0 0 1 10.6 0" style={{fill:"#7079ff"}}/>
                            </g>

                            <g xmlns="http://www.w3.org/2000/svg" data-name="그룹 14148" transform="translate(10.8 25)">
                                <path data-name="패스 10969" d="M0 5.3a5.3 5.3 0 0 1 10.6 0" style={{fill:"#7079ff"}}/>
                            </g>
                           
                        </svg>
                        <div className="empty-comment">
                            {props.contentBodyDes}
                        </div>                        
                    </div>
                </>
                :
                <>
                    <MemberBlock members={props.members} setSelectMembers={props.setSelectMembers}/>
                </>
            }
            <style jsx>{
                `
                .member-empty{
                    display: flex;
                    width:100%;
                    height:100%;
                    flex-direction: column;
                    margin-top: 1rem;
                    gap:15px;
                }
                .empty-comment{
                    text-align:center;
                    font-family: Pretendard;
                    font-size: 24px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: 1.33;
                    letter-spacing: -0.24px;
                    color: #222;
                  }
                }
              
                `
            }
            </style>
        </>
    )
}