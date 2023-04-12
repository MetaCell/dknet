import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress  from '@mui/material/LinearProgress';

export default function ProgressBar({ progress }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }} mt={4}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress sx={{ borderRadius: '6px', background: '#EAECF0', height: '8px' }} value={progress} variant="determinate" />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          progress,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
