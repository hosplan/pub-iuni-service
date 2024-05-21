import TrashContent from "../trashBasket/trashContent";

export default function Trashbasket(){
    return (
        <>
             <div className="content">
                <div className="content-header">
                    <div className="content-title">휴지통</div>
                </div>
                <div className="content-body">
                    <TrashContent />
                </div>
            </div>
            <style jsx>
                {
                `
                .content{
                    display : flex;
                    width : 100%;
                    flex-direction : column;
                    gap: 14px;   
                    padding: 2.719rem 2.75rem;
                }
                .content-title{
                    font-size: 36px;
                    font-weight: 600;
                }
                .content-body{
                    padding-top: 2.563rem;
                    width: 100%;
                }
                `
                }
            </style>
        </>
    )
}