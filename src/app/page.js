

import Application from "../app/home/components/Application"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Suspense } from 'react'
import Link from "next/link";
export async function generateMetadata() {

  return {
    title: 'Dizi Kıyafetleri',

  }
}

export default async function Home(props) {




  return <>
    <div style={{marginTop:70,display:'flex',justifyContent:'center'}}>
    <Tabs value={0} variant="scrollable"   scrollButtons allowScrollButtonsMobile>
      <Tab label="Dizi Kıyafeti"/>
      <Tab label="Dizi Sponsoru" component ={Link} href="/dizisponsoru"/>
      <Tab label="Sponsor Kıyafeti" component ={Link} href="/sponsor-kiyafeti"/>
    </Tabs>
    </div>
    <Application {...props}/>
  

  </>

}


