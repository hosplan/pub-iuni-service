import MemberIcon from "./memberIcon"

interface Props{
    avatars : any
}
export default function MemberIconContainer(props : Props){

    return(
        <>
            {
                props.avatars?.map((avatar : any, index : number) => (
                    <MemberIcon avatar={avatar} order={index} count={index+300} key={`share-${avatar.id}`} left={index*15}/>
                ))
            }
            
        </>
    )
}