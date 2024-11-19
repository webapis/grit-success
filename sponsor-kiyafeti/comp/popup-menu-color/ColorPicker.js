
import React from 'react';
import { Grid } from '@mui/material';
import './ColorPicker.css';


const ColorPicker = ({ onChange, selectedColor,colors }) => {

    const handleColorChange = (colorValue) => {
     
        if (onChange) {
            onChange(colorValue)
        }
    };

    return (
        <Grid container  className="color-picker" style={{display:'flex',justifyContent:'center', marginTop:10}}>
            {colors.filter((f,i)=>i<20).map((color,i) => (
                <Grid item className={`color-squire-container ${(color.index === selectedColor && selectedColor!==20) ? 'active' : ''}`} >
                    <div
                        key={color.value}
                        className={`color-square`}
                        style={{ backgroundColor: color.value }}
                        onClick={() => handleColorChange(i)}
                    />
                </Grid>
            ))}
        </Grid>

    );
};

export default ColorPicker;