export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
             <div className="iuni-grid-container">    
                {children}
            </div>
        </>
    )
}