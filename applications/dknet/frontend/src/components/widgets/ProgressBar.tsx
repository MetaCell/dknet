import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import { vars } from '../../theme/variables';

export default function ProgressBar({ progress }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }} pt={2}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress sx={{ borderRadius: '.5rem', background: vars.grey200, height: '0.5rem' }} value={progress} variant="determinate" />
      </Box>
      <Box>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          progress,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
