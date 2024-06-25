import { GoogleTagManager } from '@next/third-parties/google'
import { Inter, Poppins } from 'next/font/google'
import ScrollToTopButton from './components/ScrollToTopButton';
import './globals.css'

import Footer from './components/Footer';
import Script from 'next/script'


const inter = Poppins({ subsets: ['latin'], weight: ['400', '700'], })



export default function RootLayout({ children }) {
  return (
    <html lang="en">
 <meta name="fo-verify" content="8de09664-17ab-4040-a646-0c5652e5e37d" />
      <body className={inter.className}>
  
            {children}
<ScrollToTopButton />
        <Footer />
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1960990522971470" crossorigin="anonymous" />

        <GoogleTagManager gtmId="GTM-WVW74LTW" />
      </body>
    </html>
  )
}


