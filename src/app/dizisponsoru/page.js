

import Application from "./Application"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Suspense } from 'react'
import Link from "next/link";
export async function generateMetadata() {

  return {
    title: 'Dizi Sponsoru',

  }
}

export default async function Home(props) {




  return <Suspense fallback={<p style={{height:'100vh'}}>Loading....</p>}>
    <div style={{marginTop:70,display:'flex',justifyContent:'center'}}>
    <Tabs value={1} variant="scrollable"   scrollButtons allowScrollButtonsMobile>
      <Tab label="Dizi Kıyafeti"  component ={Link} href="/"/>
      <Tab label="Dizi Sponsoru"/>
      <Tab label="Sponsor Kıyafeti" component ={Link} href="/sponsor-kiyafeti"/>
    </Tabs>
    </div>
    <Application {...props}/>
  

  </Suspense>

}