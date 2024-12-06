'use client'
import React, { useState, memo, useCallback, useMemo } from 'react';
import Box from '@mui/material/Box';
import { ChevronDown, ChevronUp } from 'lucide-react';
import NavItem from './NavItem';

// Move styles outside component to prevent recreation
const navStyles = {
  bgcolor: 'background.paper', 
  borderRadius: 1, 
  overflow: 'hidden', 
  boxShadow: 1,
  transition: 'all 0.2s ease-in-out'
};

const buttonStyles = {
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
};

// Separate memoized button component
const ExpandButton = memo(({ isExpanded, onClick }) => (
  <Box
    component="button"
    onClick={onClick}
    sx={buttonStyles}
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
));

ExpandButton.displayName = 'ExpandButton';

// Add proper memo comparison
const NavList = memo(({ items }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeHref, setActiveHref] = useState(null);

  // Memoize visibleItems calculation
  const visibleItems = useMemo(() => 
    isExpanded ? items : items.slice(0, 8),
    [isExpanded, items]
  );

  const onItemClick = useCallback((href) => {
    setActiveHref(href);
  }, []);

  const toggleExpand = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  return (
    <Box component="nav" sx={navStyles}>
      {visibleItems.map((item) => (
        <NavItem
          key={item.keyword}
          {...item}
          isActive={item.href === activeHref}
          onClick={() => onItemClick(item.href)}
        />
      ))}
      {items.length > 8 && (
        <ExpandButton 
          isExpanded={isExpanded} 
          onClick={toggleExpand}
        />
      )}
    </Box>
  );
}, (prevProps, nextProps) => {
  // Custom comparison function for memo
  return (
    prevProps.items.length === nextProps.items.length &&
    prevProps.items.every((item, index) => 
      item.keyword === nextProps.items[index].keyword &&
      item.href === nextProps.items[index].href
    )
  );
});

NavList.displayName = 'NavList';

export default NavList;