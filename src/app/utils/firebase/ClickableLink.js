'use client'
import { useState, useEffect } from 'react';
import { db, ref, increment, update, onValue } from './firebase';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Button from '@mui/material/Button';
import { sanitizeFirebasePath } from './sanitizeFirebasePath';
const ClickableLink = ({ linkId, title, brand, rootPath, clickable = 0 }) => {
  const [clickCount, setClickCount] = useState(0);
  const sanitizedLinkId = sanitizeFirebasePath(linkId);
  useEffect(() => {
    const clickRef = ref(db, `${rootPath}/${sanitizedLinkId}/count`);
    onValue(clickRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setClickCount(data);
      }
    });
  }, [sanitizedLinkId]);

  const handleClick = async (e) => {
    e.preventDefault();
    const clickRef = ref(db, `${rootPath}/${sanitizedLinkId}`);
    await update(clickRef, { count: increment(1) });

debugger
    window.open(linkId, '_blank', 'noopener,noreferrer');
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

    return <Button  onClick={handleClick} endIcon={<OpenInNewIcon />} >
      {title}

    </Button>
  }


};

export default ClickableLink;
