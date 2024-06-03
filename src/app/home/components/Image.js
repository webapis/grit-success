

import React from "react";
import { Box } from '@mui/material';

function Image({  fotografUrl,  alt }) {







  return (
<Box sx={{ borderRadius:10,paddingRight:2,paddingLeft:2, border: {xs:"",md:"0px solid"}, borderColor:{xs:"none",md:"#e0e0e0"}, padding: {xs:0,md:1}}}>
    <img
    src={fotografUrl}

      className="image"
      style={{ width:'100%',height:250,  borderRadius: 10,  objectFit: 'contain',backgroundColor:'#eeeeee' }}
  
  loading="lazy"

      alt={alt}
    />
</Box>
  );
}
//backgroundColor:'#eeeeee'

export default Image

