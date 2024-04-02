
import { Grid } from "@mui/material"

import Link from "next/link";

export default function ChipContainer({ dizi, keyword }) {

 

    return <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>

        <Grid container gap={1} sx={{ display: 'flex', justifyContent: 'center' }}>
        <CustomLink href={`/dizisponsoru/${dizi}/tum/page/1`} isSelected={keyword==='tum'}>tümü</CustomLink>
            <CustomLink href={`/dizisponsoru/${dizi}/kiyafet/page/1`} isSelected={keyword==='kiyafet'}>kıyafet</CustomLink>
            <CustomLink href={`/dizisponsoru/${dizi}/kadin-kiyafeti/page/1`} isSelected={keyword==='kadin-kiyafeti'}>kadın kıyafeti</CustomLink>
            <CustomLink href={`/dizisponsoru/${dizi}/erkek-kiyafeti/page/1`} isSelected={keyword==='erkek-kiyafeti'}>erkek kıyafeti</CustomLink>
            <CustomLink href={`/dizisponsoru/${dizi}/taki-mujevher/page/1`} isSelected={keyword==='taki-mujevher'}>takı,mücevher</CustomLink>
            <CustomLink href={`/dizisponsoru/${dizi}/mobilya/page/1`} isSelected={keyword==='mobilya'}>mobilya</CustomLink>
        </Grid>
    </Grid>
}


const CustomLink = ({ href, children,isSelected }) => (
    <div style={{ display: 'inline-block',
    padding: '6px 12px',
    margin: '4px',
    backgroundColor: isSelected ? '#1976D2' : '#f0f0f0',
    borderRadius: '16px',
    color: isSelected ? '#fff' : '#333',
    cursor: 'pointer'
   }}>
        <Link href={href} style={{ backgroundColor: isSelected ? '#1976D2' : '#f0f0f0',color: isSelected ? '#fff' : '#333',textDecoration:'none'}}>{children}</Link>
    </div>
);
