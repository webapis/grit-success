

import React from "react";
import  Box  from '@mui/material/Box';

function Image({  fotografUrl,  alt }) {

  return (
<Box sx={{ borderRadius:10,paddingRight:2,paddingLeft:2, padding: {xs:0,md:1}}}>
    <img
    src={fotografUrl}

      className="image"
      style={{ width:'100%',height:250,  borderRadius: 10,  objectFit: 'contain' }}
  
  loading="lazy"

      alt={alt}
    />
</Box>
  );
}


export default Image

