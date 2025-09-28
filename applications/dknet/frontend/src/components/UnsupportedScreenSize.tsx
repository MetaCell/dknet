import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { vars } from '../theme/variables';

const { grey700, grey500, primary600, grey50 } = vars;

const UnsupportedScreenSize: React.FC = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: grey50,
        padding: 2
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          textAlign: 'center',
          maxWidth: '400px',
          borderRadius: '12px'
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: primary600,
            fontWeight: 600,
            marginBottom: 2
          }}
        >
          Screen Too Small
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: grey700,
            marginBottom: 2,
            lineHeight: 1.6
          }}
        >
          This application requires a minimum screen resolution of 768px width to function properly.
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: grey500,
            fontStyle: 'italic'
          }}
        >
          Please use a tablet, laptop, or desktop computer to access the full application experience.
        </Typography>
      </Paper>
    </Box>
  );
};

export default UnsupportedScreenSize;
