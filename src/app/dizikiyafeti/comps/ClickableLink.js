'use client'
import { useState, useEffect } from 'react';
import { db, ref, increment, update, onValue } from './firebase';

const ClickableLink = ({ linkId, url,title,brand }) => {
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const clickRef = ref(db, `dizikiyafeti/${linkId}/count`);
    onValue(clickRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setClickCount(data);
      }
    });
  }, [linkId]);

  const handleClick = async () => {
    const clickRef = ref(db, `dizikiyafeti/${linkId}`);
    await update(clickRef, { count: increment(1) });
  };

  return (
    <div style={{display:"flex"}}>
<span style={{fontWeight:700,textTransform:'uppercase'}}>{brand}:</span>
      <a href={url} onClick={handleClick} style={{textTransform:'capitalize', display:'inline'}} target='_blank'>
       {title}
      </a>
  
    </div>
  );
};

export default ClickableLink;
