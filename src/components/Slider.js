import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
  return value;
}

export default function DiscreteSlider({setDifficultyLevel}) {
    const handleChange = (event, newValue) =>
    {
        setDifficultyLevel(newValue)
    }
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        aria-label="Difficulty Level"
        defaultValue={50}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        shiftStep={30}
        step={20}
        marks
        min={0}
        max={100}
        sx={{color:'black'}}
        onChange={handleChange}
      />
    </Box>
  );
}