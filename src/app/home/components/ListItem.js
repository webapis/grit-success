import { Typography } from "@mui/material";

export default function ListItem({hit}) {
    const  {brand, title, url, imageUrl} =hit
    const origin = new URL(url).origin;

    function handler(e) {
      
       window.open(url, "_blank");
    }

    const borderStyles = {
        border: '2px solid #3498db', // Border width and color
        borderRadius: '8px', // Border radius for rounded corners
        padding: '2px', // Padding inside the border
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', // Box shadow for a subtle effect
      };
    

    return <div onClick={handler} style={{ display: 'flex', cursor: 'pointer',...borderStyles,width:'100%',paddingTop:5 }}>
        <div  style={{ paddingRight: 5 }}>
            <img src={`/favicons/${brand}.png`} width="32" height="32" style={{ backgroundColor: '#e0e0e0', borderRadius: '50%' }} alt={`${brand} marka favicon`}/>
        </div>
        <div style={{display:'flex',justifyContent:'space-between' ,width:'100%'}}>
        <div>
        <Typography sx={{fontSize:{xs:14,md:18},textTransform:'capitalize' }}>{brand}</Typography>
            <Typography sx={{ textDecoration: 'none',fontSize:{xs:12,md:18},overflow:'hidden' }} component="a" href={url}>{origin+'>'}...</Typography>
            <Typography sx={{fontSize:{xs:14,md:18} }}>{title}</Typography>
        </div>
        <div  style={{ paddingLeft:2 }}>
            <img src={imageUrl} width="80" height="100" style={{  borderRadius: '10%', objectFit:'contain' }} alt={title}/>
        </div>
        
        </div>
     
    </div>
}