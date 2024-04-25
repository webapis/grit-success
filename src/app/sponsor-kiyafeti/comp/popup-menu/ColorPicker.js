
import React, { useState } from 'react';
import { Box,Grid } from '@mui/material';
import './ColorPicker.css';
const colors = [
    { value: '#FFA500', label: 'turuncu' },
    { value: '#A020F0', label: 'mor' },
    { value: '#0000FF', label: 'mavi' },
    { value: '#40E0D0', label: 'turkuvaz' },
    { value: '#FFC0CB', label: 'pembe' },
    { value: '#FF0000', label: 'kırmızı' },
    { value: '#FFFF00', label: 'sarı' },
    { value: '#00FF00', label: 'yeşil' },
    { value: '#000080', label: 'lacivert' },
    { value: '#000000', label: 'siyah' },
    { value: '#FFFFFF', label: 'beyaz' },
    { value: '#808080', label: 'gri' },
    { value: '#FF00FF', label: 'fuşya' },
    { value: '#FAD9D2', label: 'pudra' },
    { value: '#800020', label: 'bordo' },
    { value: '#FFFDD0', label: 'krem' },
    { value: '#F5F5DC', label: 'bej' },
    { value: '#A52A2A', label: 'kahverengi' },
    { value: '#FFC87C', label: 'somon' },
    { value: '#FFDB58', label: 'hardal' }
    // Add more colors as needed
];

const ColorPicker = ({ onChange, selectedColor }) => {
   // const [selectedColor, setSelectedColor] = useState(colors[0].value); // Initial selected color

    const handleColorChange = (colorValue,i) => {
        setSelectedColor(colorValue);
        if (onChange) {
            onChange(colorValue); // Optional callback for external color change handling
        }
    };

    return (
        <Grid container  className="color-picker" style={{display:'flex',justifyContent:'center', marginTop:10}}>
            {colors.map((color,i) => (
                <Grid item className={`color-squire-container ${color.value === selectedColor ? 'active' : ''}`} >
                    <div
                        key={color.value}
                        className={`color-square`}
                        style={{ backgroundColor: color.value }}
                        onClick={() => handleColorChange(color.value)}
                    />
                </Grid>
            ))}
        </Grid>

    );
};

export default ColorPicker;