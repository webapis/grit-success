'use client'
import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import Link from 'next/link';
import navData from '../nav/navigation.json';

const CategoryNode = ({ category }) => {
  const sortedChildren = [...category.children].sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        {category.title}
      </Typography>
      <Box component="ul" sx={{ listStyleType: 'none', p: 0, m: 0 }}>
        {sortedChildren.map((item) => (
          <Box component="li" key={item.uid || item.title} sx={{ mb: 1 }}>
            {item.uid ? (
              <Link href={`/category/${item.uid}`} passHref>
                <Typography
                  color="primary"
                  sx={{
                    cursor: 'pointer',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  {item.title}
                </Typography>
              </Link>
            ) : (
              <Typography>{item.title}</Typography>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const GenderTabbedNavigation = () => {
  const [selectedGender, setSelectedGender] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const handleChange = (event, newValue) => {
    setSelectedGender(newValue);
  };

  const getColumnCount = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 4;
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs
        value={selectedGender}
        onChange={handleChange}
        aria-label="gender navigation tabs"
        centered
        variant={isMobile ? 'fullWidth' : 'standard'}
        sx={{
          mb: 2,
          '& .MuiTabs-flexContainer': {
            flexWrap: 'wrap',
          },
        }}
      >
        {navData.map((gender, index) => (
          <Tab
            key={gender.title}
            label={gender.title}
            sx={{
              fontSize: { xs: '0.8rem', sm: '1rem' },
              minWidth: { xs: '100%', sm: 'auto' },
            }}
          />
        ))}
      </Tabs>
      <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
        {navData[selectedGender] && (
          <Box
            sx={{
              columnCount: getColumnCount(),
              columnGap: '20px',
              '& > div': {
                breakInside: 'avoid-column',
                pageBreakInside: 'avoid',
                WebkitColumnBreakInside: 'avoid',
              },
            }}
          >
            {navData[selectedGender].children.map((category) => (
              <CategoryNode key={category.title} category={category} />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default GenderTabbedNavigation;