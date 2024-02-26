import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RowRadioButtonsGroup({setInterviewType}) {
    const handleChange = (event) => {
        if(event && event.target) {
            setInterviewType(event.target.value);
        }
    };
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label"></FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={(event) => handleChange(event)}
      >
        <FormControlLabel className='px-4' value="Technical Round" control={<Radio size='medium'/>} label="Technical" />
        <FormControlLabel className='px-4'  value="HR Round" control={<Radio size='medium' />} label="HR" />
        <FormControlLabel className='px-4' value="AA Round" control={<Radio size='medium' />} label="AA" />
      </RadioGroup>
    </FormControl>
  );
};