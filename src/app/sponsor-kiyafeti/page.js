

import Application from "./Application"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Link from "next/link";
export async function generateMetadata() {

  return {
    title: 'Dizi Sponsoru',

  }
}

export default async function Home(props) {


  return <>  <div style={{marginTop:70,display:'flex',justifyContent:'center'}}>
    <Tabs value={2}  variant="scrollable"   scrollButtons allowScrollButtonsMobile>
      <Tab label="Dizi Kıyafeti"  component ={Link} href="/"/>
      <Tab label="Dizi Sponsoru"  href="/dizisponsoru"/>
      <Tab label="Sponsor Kıyafeti" />
    </Tabs>
    </div>
    <Application {...props} gender="kadın"/>
</>

}