import { Html, Head, Main, NextScript } from 'next/document'

export default function Document () {
   return <Html lang={'en'}>
      <Head>
         <link rel={'icon'} href={'/favicon.ico'} />

         <meta name="theme-color" content="#000000" />
         <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:300&display=swap" />
      </Head>
      <body>
         <Main />
         <NextScript />
      </body>
   </Html>
}
