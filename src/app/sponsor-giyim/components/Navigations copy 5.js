'use client'
import React, { useState } from 'react';
import { Tabs, Tab, Box, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import navData from '../nav/navigation.json';

const CategoryNode = ({ category }) => {
  // Sort the children alphabetically by title
  const sortedChildren = [...category.children].sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  return (
    <div style={{ breakInside: 'avoid' }}>
      <Typography variant="h6" gutterBottom>
        {category.title}
      </Typography>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {sortedChildren.map((item) => (
          <li key={item.uid || item.title}>
            {item.uid ? (
              <Link href={`/category/${item.uid}`}>
                <Typography color="primary" style={{ cursor: 'pointer' }}>
                  {item.title}
                </Typography>
              </Link>
            ) : (
              <Typography>{item.title}</Typography>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const GenderTabbedNavigation = () => {
  const [selectedGender, setSelectedGender] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedGender(newValue);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs
        value={selectedGender}
        onChange={handleChange}
        aria-label="gender navigation tabs"
        centered
      >
        {navData.map((gender, index) => (
          <Tab key={gender.title} label={gender.title} />
        ))}
      </Tabs>
      <Box sx={{ p: 3 }}>
        {navData[selectedGender] && (
          <div
            style={{
              columnCount: 4,
              columnGap: '20px',
            }}
          >
            {navData[selectedGender].children.map((category) => (
              <CategoryNode key={category.title} category={category} />
            ))}
          </div>
        )}
      </Box>
    </Box>
  );
};

export default GenderTabbedNavigation;