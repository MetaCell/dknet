import React from "react";

//components
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

//icons
import { LogoIcon } from '../assets/icons';



const Header = () => {


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
              <Button variant="text">Send us feedback</Button>
              <Button variant="contained">About Dknet Repo</Button>
            </Box>

          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
