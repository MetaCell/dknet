import React from 'react';
import { Box, Typography } from '@mui/material';
import { SmallScreenIcon } from '../assets/icons';

const UnsupportedScreenSize: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        backgroundRepeat: 'repeat',
        backgroundSize: '48px 48px',
        zIndex: 9999,
        overflow: 'auto',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          textAlign: 'center',
          zIndex: 10,
          background: 'rgba(255, 255, 255, 0.25)',
          backdropFilter: 'blur(40px)',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <SmallScreenIcon />
          <Typography
            variant="h2"
            mt={1}
          >
            Your browser is too small
          </Typography>
          <Typography variant="subtitle2" color="grey.600" textAlign="center">
            This application requires a minimum width and height <br /> of 768px. Please adjust your window to continue.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default UnsupportedScreenSize;