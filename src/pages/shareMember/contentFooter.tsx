import Image from "next/image";

interface Props{
    setSelectMembers : React.Dispatch<React.SetStateAction<any>>;
    selectMembers : any;
}
export default function ContentFooter(props: Props){
    const remove = (e: any, selectMember: any) => {
        e.stopPropagation();
        props.setSelectMembers((props:any) => {
            const result = props.filter((e:any) => e.id !== selectMember.id);
            return [...result];
        });
    }
    return(
        <>
            {
                props.selectMembers?.map((selectMember: any) => (
                    <>  
                        <div className="block" key={selectMember.email}>
                            <div className="name">
                                {selectMember.nickName} 
                            </div>
                            <div className="email">
                                {selectMember.email}
                            </div>
                            <Image 
                                    src={"/images/remove-btn.webp"}
                                    width={"20px"}
                                    height={"20px"}
                                    style={{"cursor":"pointer"}}
                                    onClick={(e) => remove(e, selectMember)}
                               />
                        </div>
                        
                        <style jsx>
                        {
                            `
                                .block{
                                    display : flex;
                                    justify-content: center;
                                    align-content:center;
                                    width: fit-content;
                                    height: 25px;
                                    padding:2px 8px;
                                    background-color:#7079ff;
                                    color: #fff;
                                    font-size: 12px;
                                    border-radius: 6px;
                                    gap: 3px;
                                }
                                .name{
                                    align-self:center;
                                }
                                .email{
                                    align-self:center;
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