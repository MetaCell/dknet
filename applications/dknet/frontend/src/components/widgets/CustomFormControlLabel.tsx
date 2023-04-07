import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';

const CustomFormControlLabel = ({ value, control, label }) => {
  return (
    <FormControlLabel value={value} control={control} label={label} />
  );
}

export default CustomFormControlLabel
