import { useEffect, useState } from "react"
import { prettyDate } from "../../../public/common/common"
import * as TaskAPI from "../../../public/api/task";
import * as IuniStyle from "../../../public/api/iuniStyle";
import Image from "next/image";
import React from "react"
interface IuniMember{
    "id": number,
    "memberId": number
    "mapType": string
    "nickName": string
    "name": string
    "taskId": number
}

interface MemberInfo {
    "mapType" : string
    "member" : IuniMember
    "avatar" : Avatar
}
// interface memberFieldInfo {
//     "mapType" : string
//     "memberInfo" : MemberInfo
// }

interface Props{
    task: Task,
    setTask: React.Dispatch<React.SetStateAction<Task>>
    update: () => void
}

function MemberField(props: Props){
    
    const [createIuni, setCreateIuni] = useState<any>();
    const [editorIuni, setEditorIuni] = useState<any>();
    const [creator, setCreator] = useState<any>();
    const [editor, setEditor] = useState<any>();

    const [members, setMembers] = useState<any>();
    //테스크 멤버정보 
    const getMember = async (id: number) => {
        return await TaskAPI.getMember(id);
    }

    
    const getCreateIuni = async () => {
        const result = await getMember(props.task.id);
        const creator : IuniMember = result.find((e:any) => e.mapType === "owner");
        const editor : IuniMember = result.find((e:any) => e.mapType === "editor");
        
        const creatorIuniStyle : Avatar = await IuniStyle.getByCreator(creator?.memberId);
        const editorIuniStyle : Avatar = editor ? await IuniStyle.getByCreator(editor.memberId) : undefined;
        setMembers(() => {
            const result : {[key: string] : MemberInfo} = {
                "owner" :{
                    "mapType" : "owner",
                    "member" : creator,
                    "avatar" : creatorIuniStyle
                },
                "editor" : {
                    "mapType" : "editor",
                    "member" : editor !== undefined ? editor : creator,
                    "avatar" : editorIuniStyle !== undefined ? editorIuniStyle : creatorIuniStyle
                }
            }
            return {...result};
        });
    }

    useEffect(() => {
        getCreateIuni();
    }, []);

    return (
        <>
            <div className="user-space">
                <div className="creator-field">
                    <div className="label field">생성자</div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 48 48" style={{ margin: "0 auto", cursor: "pointer" }}>
                        <path data-name="background" d="M24 0A24 24 0 1 1 0 24 24 24 0 0 1 24 0" style={{ fill: members?.owner?.avatar?.background }} />
                        <path data-name="body" d="M33.945 10.305h-2.42l-3.337 6.936h-8.375l-3.337-6.936h-2.421S5.275 22.35 1.391 32.058a24 24 0 0 0 45.219 0c-3.885-9.708-12.665-21.753-12.665-21.753" style={{ fill: members?.owner?.avatar?.body }} />
                        <path data-name="nose" d="m24 37.624-1.39-1.54h2.78z" style={{ fill: members?.owner?.avatar?.nose }} />
                        <path data-name="left-eye-white" d="M16.119 35.59a5.3 5.3 0 1 1 5.3-5.3 5.3 5.3 0 0 1-5.3 5.3" style={{ fill: members?.owner?.avatar?.leftWhiteEye }} />
                        <path data-name="left-eye" d="M16.119 33.153a2.865 2.865 0 1 1 2.864-2.865 2.865 2.865 0 0 1-2.864 2.865" style={{ fill: members?.owner?.avatar?.leftEye }} />
                        <path data-name="right-eye-white" d="M31.882 35.59a5.3 5.3 0 1 1 5.3-5.3 5.3 5.3 0 0 1-5.3 5.3" style={{ fill: members?.owner?.avatar?.rightWhiteEye }} />
                        <path data-name="right-eye" d="M31.882 33.153a2.865 2.865 0 1 1 2.864-2.865 2.865 2.865 0 0 1-2.864 2.865" style={{ fill: members?.owner?.avatar?.rightEye }} />
                    </svg>
                    <div className="label name">{members?.owner?.member?.nickName}</div>
                </div>

                <Image width={"18px"} height={"18px"} src={"/images/division.webp"} />

                <div className="updator-field">
                    <div className="label field">편집자</div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 48 48" style={{ margin: "0 auto", cursor: "pointer" }}>
                        <path data-name="background" d="M24 0A24 24 0 1 1 0 24 24 24 0 0 1 24 0" style={{ fill: members?.editor?.avatar?.background }} />
                        <path data-name="body" d="M33.945 10.305h-2.42l-3.337 6.936h-8.375l-3.337-6.936h-2.421S5.275 22.35 1.391 32.058a24 24 0 0 0 45.219 0c-3.885-9.708-12.665-21.753-12.665-21.753" style={{ fill: members?.editor?.avatar?.body }} />
                        <path data-name="nose" d="m24 37.624-1.39-1.54h2.78z" style={{ fill: members?.editor?.avatar?.nose }} />
                        <path data-name="left-eye-white" d="M16.119 35.59a5.3 5.3 0 1 1 5.3-5.3 5.3 5.3 0 0 1-5.3 5.3" style={{ fill:members?.editor?.avatar?.leftWhiteEye }} />
                        <path data-name="left-eye" d="M16.119 33.153a2.865 2.865 0 1 1 2.864-2.865 2.865 2.865 0 0 1-2.864 2.865" style={{ fill: members?.editor?.avatar?.leftEye }} />
                        <path data-name="right-eye-white" d="M31.882 35.59a5.3 5.3 0 1 1 5.3-5.3 5.3 5.3 0 0 1-5.3 5.3" style={{ fill: members?.editor?.avatar?.rightWhiteEye }} />
                        <path data-name="right-eye" d="M31.882 33.153a2.865 2.865 0 1 1 2.864-2.865 2.865 2.865 0 0 1-2.864 2.865" style={{ fill: members?.editor?.avatar?.rightEye }} />
                    </svg>
                    <div className="label name">{members?.editor?.member?.nickName}</div>

                </div>
                <div className="update-date">{prettyDate(new Date(props.task?.createDate), ".")} 최종편집</div>
                <div className="ver">{"ver " + props.task?.majorVersion + "." + props.task?.minorVersion}</div>
            </div>
            <style jsx>
                {
                    `
                    .user-space{
                        display: flex;
                        align-items:center;
                        width: 100%;
                        font-size: 14px;
                        font-stretch: normal;
                        font-style: normal;                        
                        letter-spacing: -0.14px;
                        padding-top : 20px;
                    }
             
                    .label{
                        display: flex;
                        align-items:center;
                    }
                    .label.field{
                        font-weight: 600;
                        color: #222;
                    }
                    .creator-field{
                        display: flex;
                        gap:8px;
                    }
                    .updator-field{
                        display: flex;
                        gap:8px;
                    }
                    .ver{
                        color: #909090;
                        margin-left: 3px;
                    }
                    .update-date{
                        color: #909090;
                        padding-left: 8px;
                    }
                    @media(max-width: 770px){
                        .user-space{
                            flex: 1fr 1fr 1fr;
                            flex-wrap: wrap;
                        }
                        .ver{
                            margin-top: 3px;
                        }
                        .update-date{
                            margin-left: 0;
                            margin-top: 3px;
                        }
                    }
                `
                }
            </style>
        </>
    )
}

export default React.memo(MemberField);