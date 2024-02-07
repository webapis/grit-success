import Application from "../app/home/components/Application"
import { Suspense } from 'react'
import Categories from "./home/components/categories"
export async function generateMetadata() {

  return {
    title: 'Kıyafet Markaları',

  }
}

export default async function Home(props) {



  return <Suspense fallback={<p style={{height:'100vh'}}>Loading feed....</p>}>
    <Application {...props}/>
  </Suspense>

}


