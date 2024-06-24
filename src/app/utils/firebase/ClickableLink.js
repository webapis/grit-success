'use client'

import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Button from '@mui/material/Button';

const ClickableLink = ({ linkId, title, brand, rootPath, clickable = 0 }) => {
  const handleClick = async (e) => {

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

    return <Button onClick={handleClick} endIcon={<OpenInNewIcon />} component="a" target='_target' href={linkId}>
      {title}

    </Button>
  }


};

export default ClickableLink;
