import type { AppProps } from 'next/app'
import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'
import '../app/globals.css';
import '../../public/css/CalendarCustom.css';
import RecoilRootProvider from '@/app/recoilRootProvider';
import Side from '@/app/side';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useRouter } from 'next/router';
type NextPageWithLayout = NextPage & {
    getLayout? : (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component : NextPageWithLayout
}



export default function App({ Component, pageProps }: AppPropsWithLayout) {

    const getLayout = Component.getLayout ?? ((page) => page);
    
    return getLayout( 
        <RecoilRootProvider>
            <GoogleOAuthProvider clientId={String(process.env.NEXT_PUBLIC_GOOGLE_LOCAL_CLIENT_ID)}>
                <Side />
                <Component {...pageProps}/>
            </GoogleOAuthProvider>
        </RecoilRootProvider>
    );

}
