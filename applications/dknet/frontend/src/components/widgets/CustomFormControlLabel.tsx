import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';

const CustomFormControlLabel = ({ value, control, label, sx }: any) => {
  return (
    <FormControlLabel sx={{
      marginRight: 0,
      width: '100%',
      height: '100%',
      '& .MuiFormControlLabel-label': { flex: 1 },
      ...sx
    }} value={value} control={control} label={label} />
  );
}

export default CustomFormControlLabel
