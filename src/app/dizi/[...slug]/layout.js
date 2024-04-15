
import { Inter, Poppins } from 'next/font/google'




import Script from 'next/script'


const inter = Poppins({ subsets: ['latin'], weight: ['400', '700'], })



export default function RootLayout({ children }) {
  return (
    <html lang="en">
 
      <body className={inter.className}>
   


            {children}
       



     

        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9521301536686282" crossorigin="anonymous" />

      </body>
    </html>
  )
}


