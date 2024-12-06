'use client'
import React, { useState, memo, useCallback } from 'react';
import Box from '@mui/material/Box';
import { ChevronDown, ChevronUp } from 'lucide-react';
import NavItem from './NavItem';

const NavList = memo(({ items }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeHref, setActiveHref] = useState(null);

  const visibleItems = isExpanded ? items : items.slice(0, 8);

  const onItemClick = useCallback((href) => {
    setActiveHref(href);
  }, []);

  const toggleExpand = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  return (
    <Box 
      component="nav" 
      sx={{ 
        bgcolor: 'background.paper', 
        borderRadius: 1, 
        overflow: 'hidden', 
        boxShadow: 1,
        transition: 'all 0.2s ease-in-out'
      }}
    >
      {visibleItems.map((item) => (
        <NavItem
          key={item.keyword}
          {...item}
          isActive={item.href === activeHref}
          onClick={() => onItemClick(item.href)}
        />
      ))}
      {items.length > 8 && (
        <Box
          component="button"
          onClick={toggleExpand}
          sx={{
            width: '100%',
            border: 'none',
            padding: 2,
            textAlign: 'center',
            color: 'primary.main',
            bgcolor: 'background.paper',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.2s ease',
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
        >
          {isExpanded ? (
            <>
              <span>Daha Az Göster</span>
              <ChevronUp style={{ marginLeft: 8, width: 16, height: 16 }} />
            </>
          ) : (
            <>
              <span>Daha Fazla Göster</span>
              <ChevronDown style={{ marginLeft: 8, width: 16, height: 16 }} />
            </>
          )}
        </Box>
      )}
    </Box>
  );
});

NavList.displayName = 'NavList';

export default NavList;