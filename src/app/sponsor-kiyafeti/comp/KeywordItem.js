import * as React from 'react';

import Box from '@mui/material/Box';
import keywordLabels from '../comp/keywordLabels';

//import Link from 'next/link';
import Typography from '@mui/material/Typography';


export default function KeywordItem({ imageUrl, label, selected, href, keyword }) {


  return (
    <a href={href} style={{ textDecoration: "none" }}>
      <Box sx={{ display: 'flex', backgroundColor: selected ? "#e8f0fe" : "white", color: selected ? "#1A73E8" : "black", border: selected ? "1px solid #1A73E8" : '1px solid #bdbdbd', borderRadius: 1 }}>
        <img
          component="img"
          style={{ height: 50, borderRadius: 3, width: 30, objectFit: 'fill' }}
          src={imageUrl}
          alt=""
        />

        <Box sx={{ minWidth: 70, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography component="div" variant="h7" style={{ textTransform: 'capitalize', fontFamily: 'inherit' }}>
            {keywordLabels[keyword] ? keywordLabels[keyword] : keyword}
          </Typography>



        </Box>

      </Box>
    </a>
  );
}
