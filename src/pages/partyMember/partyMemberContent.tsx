import MemberBlock from "./memberBlock"

interface Props {
    members : any
}
export default function PartyMemberContent(props :Props){
    
    return(
        <>
        <div className="container">
            <div className="member-count">
                {props.members?.length}
            </div>
            {
                props.members?.map((member : any, index: number) => (
                    <MemberBlock member={member} key={`partymember-${index}`}/>
                ))
            }
        </div>
        <style jsx>
            {
                `
                    .container{
                        display : flex;
                        flex-direction : column;   
                    }
                    .member-count{
                        font-size: 16px;
                        font-weight: 600;
                        font-stretch: normal;
                        font-style: normal;
                        color: #a6a6a6;
                        padding-top:0.875rem;
                        padding-bottom:6px;
                        padding-left: 0.875rem;
                        padding-right: 0.875rem;
                    }
                `
            }
        </style>
        </>
    )
}