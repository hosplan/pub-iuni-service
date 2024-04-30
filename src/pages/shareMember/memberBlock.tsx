interface Props{
    members : any;
    setSelectMembers: React.Dispatch<React.SetStateAction<any>>;
}
export default function MemberBlock(props : Props){
    const select = (member: any) => {
        props.setSelectMembers((props : any) => {
            const result = props.find((e : any) => e.id === member.id);
            return result ? [...props] : [member, ...props];
        })
    }
    return(
        <>
            {
                props.members?.map((member: any) => (
                    <>
                        <div className="member-info" onClick={() => select(member)} key={member.email}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" viewBox="0 0 48 48">
                                <path data-name="background" d="M24 0A24 24 0 1 1 0 24 24 24 0 0 1 24 0" style={{ fill: member.avatar.background }} />
                                <path data-name="body" d="M33.945 10.305h-2.42l-3.337 6.936h-8.375l-3.337-6.936h-2.421S5.275 22.35 1.391 32.058a24 24 0 0 0 45.219 0c-3.885-9.708-12.665-21.753-12.665-21.753" style={{ fill: member.avatar.body }} />
                                <path data-name="nose" d="m24 37.624-1.39-1.54h2.78z" style={{ fill: member.avatar.nose }} />
                                <path data-name="left-eye-white" d="M16.119 35.59a5.3 5.3 0 1 1 5.3-5.3 5.3 5.3 0 0 1-5.3 5.3" style={{ fill: member.avatar.leftWhiteEye }} />
                                <path data-name="left-eye" d="M16.119 33.153a2.865 2.865 0 1 1 2.864-2.865 2.865 2.865 0 0 1-2.864 2.865" style={{ fill: member.avatar.leftEye }} />
                                <path data-name="right-eye-white" d="M31.882 35.59a5.3 5.3 0 1 1 5.3-5.3 5.3 5.3 0 0 1-5.3 5.3" style={{ fill: member.avatar.rightWhiteEye }} />
                                <path data-name="right-eye" d="M31.882 33.153a2.865 2.865 0 1 1 2.864-2.865 2.865 2.865 0 0 1-2.864 2.865" style={{ fill: member.avatar.rightEye }} />
                            </svg>
                            
                            <div className="member-nickName">
                                {member.nickName}
                            </div>
                            <div className="member-email">
                                {member.email}
                            </div>
                        </div>
                        <style jsx>{
                            `
                            .member-info{
                                display : flex;
                                flex-direction:row;
                                padding-top: 8px;
                                padding-bottom : 8px;
                                padding-left: 0.875rem;
                                padding-right: 0.875rem;
                                gap: 11px;
                                align-items : center;
                                cursor:pointer;
                                border-radius:6px;
                            }
                            .member-info:hover{
                                background-color : #e5e5e5;
                            }
                            .member-email{
                                color: #BCBCBC;
                            }
                            `
                        }

                        </style>
                    </>
                ))
            }
        </>
    )
}