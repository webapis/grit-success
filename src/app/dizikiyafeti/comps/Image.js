

import React from "react";
import { Box } from '@mui/material';

function Image({  fotografUrl,  alt }) {







  return (
<Box sx={{ borderRadius:10,paddingRight:2,paddingLeft:2, border: {xs:"",md:"2px solid"}, borderColor:{xs:"none",md:"#e0e0e0"}, padding: {xs:0,md:1}}}>
    <img
    src={'https://ik.imagekit.io/mumrjdehaou/'+fotografUrl}

      className="image"
      style={{ width:'100%',height:250,  borderRadius: 10,  objectFit: 'contain' }}
  
  loading="lazy"

      alt={alt}
    />
</Box>
  );
}
//backgroundColor:'#eeeeee'

export default Image

