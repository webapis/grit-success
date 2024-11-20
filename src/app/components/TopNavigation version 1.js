

/*
when tab is clicked ca we give use feedback by showing spinning bar. use mui components.
this component is used with nextjs 14. please do not break code
*/


import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function TopNavigation ({selected}){

    return  <div style={{marginTop:70,display:'flex'}}>
    <Tabs  value={selected} variant="scrollable"   scrollButtons allowScrollButtonsMobile>
    <Tab label="Sponsor Kıyafeti" component ='a' href="/" style={{ textTransform:'capitalize'}}/>
      <Tab  label="Dizi Kıyafeti"  component ='a' href="/dizikiyafeti" style={{ textTransform:'capitalize'}} />
      <Tab label="Dizi Sponsoru" component ='a' href="/dizisponsoru" style={{ textTransform:'capitalize'}}/>
      <Tab label="Sponsor Kategori" component ='a' href="/dizi-sponsor-kategori" style={{ textTransform:'capitalize'}}/>
      <Tab label="Yapım Şirketleri" component ='a' href="/turk-dizi/yapim-sirketleri" style={{ textTransform:'capitalize'}}/>

    </Tabs>
    </div>
}