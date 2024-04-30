
import { useEffect, useRef, useState } from "react";
import Certification from "../certification/certification";
interface Props {
    setModal : React.Dispatch<React.SetStateAction<boolean>>
}
export default function ProfileModal(props :Props){
    const [certification, setCertification] = useState<boolean | undefined> ();
    const modalRef = useRef<any>();

    useEffect(() => {
        function handleFocus(e: any) {
         
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                props.setModal(() => false);
            }
        }
        document.addEventListener("mouseup", handleFocus);
        return () => { document.removeEventListener("mouseup", handleFocus) }
    }, [modalRef]);

    useEffect(() => {
        if(certification){
            props.setModal(false);
        }
    }, [certification]);
    
    return (
        <>
            <div className="modal-container" ref={modalRef}>
                <Certification setComplete={setCertification}/>
            </div>
            <style jsx>
                {
                    `
                        .modal-container{
                            display:flex;
                            flex-direction: column;
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            width:480px;
                            height:560px;
                            padding: 20px;
                            border-radius: 14px;
                            box-shadow: 0 0 12px 0 rgba(34, 34, 34, 0.14);
                            background-color: #fff;
                            z-index:999;
                        }
                    `
                }
            </style>
        </>
    )
}