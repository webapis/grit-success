'use client'
import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import navData from '../nav/navigation.json';

const GenderTabbedNavigation = () => {
  const [selectedGender, setSelectedGender] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedGender(newValue);
  };

  const renderNavItem = (item) => {
    return (
      <li key={item.uid || item.title} className="mb-2">
        <div className="flex items-center">
          {item.children && item.children.length > 0 && (
            <ChevronDown size={16} className="mr-2" />
          )}
          {item.uid ? (
            <Link href={`/category/${item.uid}`}>
              <span className="text-blue-600 hover:underline">{item.title}</span>
            </Link>
          ) : (
            <span>{item.title}</span>
          )}
        </div>
        {item.children && item.children.length > 0 && (
          <ul className="ml-4 mt-2">
            {item.children.map(child => renderNavItem(child))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <Tabs value={selectedGender} onChange={handleChange} aria-label="gender navigation tabs">
        {navData.map((gender, index) => (
          <Tab key={gender.title} label={gender.title} />
        ))}
      </Tabs>
      <Box sx={{ p: 3 }}>
        {navData[selectedGender] && (
          <ul>
            {navData[selectedGender].children.map(item => renderNavItem(item))}
          </ul>
        )}
      </Box>
    </div>
  );
};

export default GenderTabbedNavigation;