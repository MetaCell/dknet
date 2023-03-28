import React from "react";

//components
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

//icons
import { LogoIcon } from '../../assets/icons';

const Header = () => {
  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
    >
      <Toolbar disableGutters>
        <Box display="flex" alignItems="center" justifyContent='space-evenly' width={1}>
          <Box display="flex" alignItems="center">
            <LogoIcon fontSize="large"/>
            <Typography variant="h6" component="div" ml={1.25}>
              Dknet
            </Typography>
          </Box>
          <Box display='flex' gap={0.5}>
            <Button variant="text">Send us feedback</Button>
            <Button variant="contained">About Dknet Repo</Button>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
