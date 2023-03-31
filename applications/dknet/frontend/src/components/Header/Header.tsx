import React,{ useState } from "react";

//components
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AboutDialog from "../AboutDialog/AboutDialog";

//icons
import { LogoIcon } from '../../assets/icons';

const Header = () => {

  const [ openAboutDialog, setOpenDialogWindow ] = useState(false);

  const handleOpen = () => {
    setOpenDialogWindow(true);
  };

  const handleClose = () => {
    setOpenDialogWindow(false);
  };
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
            <Button variant="contained" onClick={handleOpen}>About Dknet Repo</Button>
            <AboutDialog open={openAboutDialog} onClose={handleClose}/>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
