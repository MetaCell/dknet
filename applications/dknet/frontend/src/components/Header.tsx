import React, { useState } from "react";

//components
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AboutDialog from "./AboutDialog";

//icons
import dknetlogo from '../assets/dknetlogo.png';



const Header = () => {
  const [ openAboutDialog, setOpenDialogWindow ] = useState(false);

  const handleOpen = () => {
    setOpenDialogWindow(true);
  };

  const handleClose = () => {
    setOpenDialogWindow(false);
  };

  const redirectToFeedback = () => {
    window.open(
      'https://docs.google.com/forms/d/e/1FAIpQLSf1aD1Skpp4kV8w3cadMjdRdll3es9h3tj6b6jO8h0s1P9-iA/viewform',
      '_blank'
    )
  }

  return (
    <AppBar position="static" sx={{ background: 'transparent', boxShadow: 'none' }}>
      <Container fixed>
        <Toolbar disableGutters>
          <Box sx={{ display: 'flex',  justifyContent: 'space-between' }} width={1}>
            <Box sx={{  display: 'flex',  mr: 1 }}>
              <img src={dknetlogo} alt="dknet logo" style={{ height: '40px', width: '40px' }} />
              <Typography variant="h6" component="div" ml={1.25}>
                dkNET
              </Typography>
            </Box>

            <Box sx={{  display: 'flex' }}>
              <Button variant="text" onClick={redirectToFeedback}>Send us feedback</Button>
              <Button variant="outlined" onClick={handleOpen}>About dkNET Repo</Button>
              <AboutDialog open={openAboutDialog} onClose={handleClose}/>
            </Box>

          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
