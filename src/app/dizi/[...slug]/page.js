

import Application from "../../dizi-sponsoru/Application"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Suspense } from 'react'
import Link from "next/link";
import pageMetaObjects from './pageMetadata.json'
export async function generateMetadata(props) {
  const { params: {  slug } } = props

const selectedPageMeta = pageMetaObjects.find(f => f.slug === slug[0])
  return {
    title: selectedPageMeta.pageTitle ,
 
  }
}
export default async function Home(props) {


  const { params: {  slug } } = props

const selectedPageMeta = pageMetaObjects.find(f => f.slug === slug[0])

  return <Suspense fallback={<p style={{height:'100vh'}}>Loading....</p>}>
    <div style={{marginTop:70,display:'flex',justifyContent:'center'}}>
    <Tabs value={1}>
      <Tab label="Dizi Kıyafeti"  component ={Link} href="/"/>
      <Tab label="Dizi Sponsoru"/>
    </Tabs>
    </div>
    <Application {...props}   initialUiState={{
    dizisponsoru: {
      query: selectedPageMeta.search,
  
    },
  }}/>
  

  </Suspense>

}