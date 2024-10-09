'use client'
import React, { useState } from 'react';
import { Tabs, Tab, Box, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import navData from '../nav/navigation.json';

const CategoryNode = ({ category }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Typography variant="h6" gutterBottom>
        {category.title}
      </Typography>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {category.children.map((item) => (
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
    </Grid>
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
          <Grid container spacing={3}>
            {navData[selectedGender].children.map((category) => (
              <CategoryNode key={category.title} category={category} />
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default GenderTabbedNavigation;