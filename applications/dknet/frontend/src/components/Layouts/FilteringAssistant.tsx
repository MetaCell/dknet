import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { vars } from '../../theme/variables'
//components
import Container from '@mui/material/Container';

const { grey500,   grey50 } = vars

const FilteringAssistantLayout = ({ children }) => {
  return (
    <React.Fragment>
      <AppBar position="static" sx={{ backgroundColor: 'transparent', borderBottom: '1px solid #EAECF0',
        boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)' }}>
        <Toolbar sx={{ minHeight: 56, backgroundColor: 'transparent', boxShadow: 'none' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Filtering Assistant
          </Typography>
          <CloseRoundedIcon sx={{ color: grey500 }} />
        </Toolbar>
      </AppBar>
      <Box sx={{ backgroundColor: grey50, minHeight: '100vh', overflow: 'auto' }}>
        <Container>
          {children}
        </Container>
      </Box>
    </React.Fragment>

  )
}

export default FilteringAssistantLayout;
