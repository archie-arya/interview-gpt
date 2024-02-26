import React from 'react';
import { FormControl } from '@mui/material';
import { MenuItem } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Select } from '@mui/material';
import { useState } from 'react';

const Field = ({ setArea }) => {
    const [field, setField] = useState(""); // Use state for the selected field

    const handleFieldChange = (event) => {
        setField(event.target.value);
        setArea(event.target.value); // Set the selected field in the parent component
    };

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 400 }}>
                {field ? null : <InputLabel id="demo-simple-select-label">Select your Field</InputLabel>}
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={field}
                    onChange={handleFieldChange}
                    label="Field"
                >
                    <MenuItem value={"Software Developer"}>Software Developer</MenuItem>
                    <MenuItem value={"Product"}>Product</MenuItem>
                    <MenuItem value={"DevOps"}>DevOps</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
};

export default Field;
