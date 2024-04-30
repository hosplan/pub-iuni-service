import Image from "next/image";

interface Props{
    taskId : number;
    disconnectShare : any;
    openPartyMemberTab: any;
}

export default function ShareTaskTab(props: Props){

    return(
        <>
            <div className="card-other-tab" onClick={(e) => {
                e.stopPropagation();
                props.disconnectShare(props.taskId);
            }}>
                <Image
                    src={"/images/default/trash.webp"}
                    width={"24px"}
                    height={"24px"} />
                연결 끊기
            </div>

            <div className="card-other-tab" onClick={(e) => {
                e.stopPropagation();
                props.openPartyMemberTab();
            }}>
                <Image
                    src={"/images/profile.webp"}
                    width={"24px"}
                    height={"24px"} />
                공유인원
            </div>
            <style jsx>
            {
                `
                .card-other-tab{
                    display: flex;
                    justify-content: left;
                    align-item: center;
                    padding : 14px;
                    min-width: 9rem;
                    width: 100%;
                    gap: 6px;
                }

                .card-other-tab:hover{
                    background-color: #e5e5e5;
                    font-weight: bold;
                }
                `
            }
            </style>
        </>
    )
}