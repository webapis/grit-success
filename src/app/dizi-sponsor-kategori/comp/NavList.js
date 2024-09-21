'use client'
import React, { useState } from 'react';
import { Box } from '@mui/material';
import { ChevronDown, ChevronUp } from 'lucide-react';
import NavItem from './NavItem';

const NavList = ({ items }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleItems = isExpanded ? items : items.slice(0, 5);
  const [activeHref, setActiveHref] = useState(null);

  const onItemClick = (href) => {
    setActiveHref(href);
    // You can add additional logic here, such as updating the URL or fetching related data
  };

  return (
    <Box sx={{ bgcolor: 'background.paper', borderRadius: 1, overflow: 'hidden', boxShadow: 1 }}>
      {visibleItems.map((item) => (
        <NavItem
          key={item.keyword}
          {...item}
          isActive={item.href === activeHref}
          onClick={() => onItemClick(item.href)}
        />
      ))}
      {items.length > 5 && (
        <Box
          component="button"
          onClick={() => setIsExpanded(!isExpanded)}
          sx={{
            width: '100%',
            border: 'none',
            padding: 2,
            textAlign: 'center',
            color: 'primary.main',
            bgcolor: 'background.paper',
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
        >
          {isExpanded ? (
            <>
              <span>Daha Az Göster</span>
              <ChevronUp style={{ marginLeft: 4, width: 16, height: 16 }} />
            </>
          ) : (
            <>
              <span>Daha Fazla Göster</span>
              <ChevronDown style={{ marginLeft: 4, width: 16, height: 16 }} />
            </>
          )}
        </Box>
      )}
    </Box>
  );
};

export default NavList;