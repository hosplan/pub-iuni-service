import RecoilRootProvider from '@/app/recoilRootProvider'
import { Html, Head, Main, NextScript } from 'next/document'


export default function Document(title: any) {
  return (
    <Html>
      <Head>
        <link rel='icon' href='./images/favicon.ico' />
        <script defer src="https://developers.kakao.com/sdk/js/kakao.js"></script>
        <title>IUni</title>
        <meta name="description" content="나만의 업무 공간" />
        <meta http-equiv="Cross-Origin-Opener-Policy" content="same-origin-allow-popups" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}