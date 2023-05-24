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
import { LogoIcon } from '../assets/icons';



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
      'https://docs.google.com/forms/d/1STDRw2utI994HViAmTTjvKQvr7PDf_7KGNXRbdZwLGM/edit?ts=646dd444',
      '_blank'
    )
  }

  return (
    <AppBar position="static" sx={{ background: 'transparent', boxShadow: 'none' }}>
      <Container fixed>
        <Toolbar disableGutters>
          <Box sx={{ display: 'flex',  justifyContent: 'space-between' }} width={1}>
            <Box sx={{  display: 'flex',  mr: 1 }}>
              <LogoIcon fontSize="large" />
              <Typography variant="h6" component="div" ml={1.25}>
                Dknet
              </Typography>
            </Box>

            <Box sx={{  display: 'flex' }}>
              <Button variant="text" onClick={redirectToFeedback}>Send us feedback</Button>
              <Button variant="outlined" onClick={handleOpen}>About Dknet Repo</Button>
              <AboutDialog open={openAboutDialog} onClose={handleClose}/>
            </Box>

          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
