
import Link from "next/link";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function TopNavigation ({selected}){

    return  <div style={{marginTop:70,display:'flex'}}>
    <Tabs value={selected} variant="scrollable"   scrollButtons allowScrollButtonsMobile>
    <Tab label="Sponsor Kıyafeti" component ={Link} href="/" style={{ textTransform:'capitalize'}}/>
      <Tab label="Dizi Kıyafeti"  component ={Link} href="/dizikiyafeti" style={{ textTransform:'capitalize'}} />
      <Tab label="Dizi Sponsoru" component ={Link} href="/dizisponsoru" style={{ textTransform:'capitalize'}}/>
      <Tab label="Sponsor Kategori" component ={Link} href="/dizi-sponsor-kategori" style={{ textTransform:'capitalize'}}/>

    </Tabs>
    </div>
}