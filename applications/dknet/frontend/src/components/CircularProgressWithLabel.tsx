import React from "react";

//components 
import Box from '@mui/material/Box';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

function CircularProgressWithLabel ( props: CircularProgressProps & { value: number } ) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex', borderRadius: 6 }} className="goodProgress">
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
        >{Math.round(props.value)}</Typography>
      </Box>
    </Box>
  );
}
export default CircularProgressWithLabel;

