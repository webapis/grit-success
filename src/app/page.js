

import Application from "../app/home/components/Application"
import { Suspense } from 'react'

export async function generateMetadata() {

  return {
    title: 'Dizi Kıyafetleri',

  }
}

export default async function Home(props) {



  return <Suspense fallback={<p style={{height:'100vh'}}>Loading....</p>}>
    <Application {...props}/>
  </Suspense>

}


