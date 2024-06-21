'use client'
// components/ViewCount.js
import { useState, useEffect } from 'react';
import { db, ref, onValue } from './firebase';
import { sanitizeFirebasePath } from './sanitizeFirebasePath';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';

const ViewCount = ({ linkId }) => {
  const [viewCount, setViewCount] = useState(0);
  const sanitizedLinkId = sanitizeFirebasePath(linkId);

  useEffect(() => {
    const viewRef = ref(db, `dizikiyafeti/${sanitizedLinkId}/count`);
    onValue(viewRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setViewCount(data);
      }
    });
  }, [sanitizedLinkId]);


    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton disabled >
            <VisibilityIcon />
            <span style={{ marginLeft: '8px', fontSize:14 }}> {viewCount}</span>
          </IconButton>
      
        </div>
      );

 



};

export default ViewCount;
