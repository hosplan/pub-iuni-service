import Layout from "../../app/layout"

function Page(){
    return(
        <>
            <div>휴지통 입니다.</div>
        </>
    )
}

export default Page;
Page.getLayout = function getLayout(page: React.ReactElement) {
    return (<Layout>{page}</Layout>)
}