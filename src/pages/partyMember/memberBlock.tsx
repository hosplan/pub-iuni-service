import { useEffect, useState } from "react";
import * as IuniStyleApi from "../../../public/api/iuniStyle";
import Avatar from "../avatar/avatar";

interface Props{
    member : any
}
export default function MemberBlock(props : Props){
    const [avatar, setAvatar] = useState<any>({});
    const MAP_TYPE : any = {
        "owner" : "대표자",
        "JOIN" : "참여자",
        "REQ" : "참여 요청중"
    }
    const getAvatar = async () => {
        const result : any =  await IuniStyleApi.getByCreator(props.member?.memberId);

        setAvatar(() => {
            return {...result};
        });
    }

    useEffect(() => {
        getAvatar();
    }, []);

    return(
        <>
            <div className="content">
                <Avatar avatar={avatar} width={"32px"} height={"32px"}/>
                <div className="member-nickName">
                    {props.member?.nickName}
                </div>
                <div className="member-email">
                    {props.member?.email}
                </div>
                <div className="member-type">
                    {MAP_TYPE[`${props.member?.mapType}`]}
                </div>
            </div>
            <style jsx>
            {
                `
                    .content{
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
    )
}