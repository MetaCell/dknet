import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';

const CustomFormControlLabel = ({ value, control, label }) => {
  return (
    <FormControlLabel sx={{ marginRight: 0, '& .MuiFormControlLabel-label': { flex: 1 } }} value={value} control={control} label={label} />
  );
}

export default CustomFormControlLabel
