'use client'

import { createClient } from '@supabase/supabase-js'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Button from '@mui/material/Button';
const supabaseUrl = 'https://pzzrgorwoofzvvrwuyqt.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
const ClickableLink = ({ linkId, title, brand, table, clickable = 0 }) => {



  const handleClick = async (e) => {


    await incrementCountByHref(table, linkId)

  };

  if (clickable === 0) {
    return (
      <div style={{ display: "flex" }}>
        <span style={{ fontWeight: 700, textTransform: 'uppercase' }}>{brand}:</span>
        <a href={linkId} onClick={handleClick} style={{ textTransform: 'capitalize', display: 'inline' }} target='_blank'>
          {title}
        </a>
      </div>
    );
  } else {

    return <Button onClick={handleClick}
      variant="outlined"
      color="primary"
      href={linkId}
      target="_blank"
      rel="noopener noreferrer"
      className="mobileSmallButton"
      sx={{
        mt: 2,
        alignSelf: 'flex-start',
        textTransform: 'none',
        fontSize: '0.875rem',
        padding: '6px 16px',
        '&.mobileSmallButton': {
          '@media (max-width: 600px)': {
            fontSize: '0.75rem',
            padding: '4px 10px',
            '& .MuiSvgIcon-root': {
              fontSize: '1rem',
            },
          },
        },
      }}
      endIcon={<OpenInNewIcon />}
    >
      {title}
    </Button>
  }


};

export default ClickableLink;



const incrementCountByHref = async (table, href) => {
  debugger
  const { data, error } = await supabase
    .rpc('inc', { p_x: 1, p_href_id: href, p_table_name: table })
  if (error) {
    debugger
    console.error('Error incrementing count:', error)
  } else {
    debugger
    console.log('Count incremented successfully:', data)
  }
}