import React, { useCallback, useState } from "react";

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
import FiltersAssistantDialog from "./FilterAssistantDialog/FiltersAssistantDialog";
import { useFilterContext } from "../context/Context";
import { resetFilters } from "../utils/helpers";



const Header = () => {
  const [openAboutDialog, setOpenDialogWindow] = useState(false);
  const [open, setOpen] = React.useState(false);
  const { context, setContext } = useFilterContext()

  const handleOpen = useCallback(() => {
    setOpenDialogWindow(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpenDialogWindow(false);
  }, []);

  const redirectToFeedback = useCallback(() => {
    window.open(
      'https://docs.google.com/forms/d/e/1FAIpQLSf1aD1Skpp4kV8w3cadMjdRdll3es9h3tj6b6jO8h0s1P9-iA/viewform',
      '_blank'
    )
  }, []);


  const onClearFilters = useCallback(() => {
    setContext({
      ...context,
      currentView: 'launch',
      filterValues: resetFilters(context.filters)
    })
    setOpen(true);
  }, [context, setContext]);

  const handleLogoClick = useCallback(() => {
    setContext({
      ...context,
      currentView: 'launch',
      filterValues: resetFilters(context.filters)
    });
  }, [context, setContext]);

  return (
    <AppBar position="static" sx={{ background: 'transparent', boxShadow: 'none' }}>
      <Container fixed>
        <Toolbar disableGutters>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }} width={1}>
            <Box sx={{ display: 'flex', mr: 1, cursor: 'pointer' }} onClick={handleLogoClick}>
              <img src={dknetlogo} alt="dknet logo" style={{ height: '40px', width: '40px' }} />
              <Typography variant="h6" component="div" ml={1.25}>
                dkNET
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', '& .MuiButton-root': { sx: { padding: '0.625rem .5rem' }, md: { padding: '0.625rem 1rem' } } }}>
              {context.currentView === 'repositories' &&
                <Button variant="text" onClick={onClearFilters}>Reset Query</Button>
              }
              <Button variant="text" onClick={() => setOpen(true)}>Open Guided Query</Button>
              <Button variant="text" onClick={redirectToFeedback}>Send us feedback</Button>
              <Button variant="outlined" onClick={handleOpen}>About dkNET Repo</Button>
              <AboutDialog open={openAboutDialog} onClose={handleClose} />
            </Box>

          </Box>

        </Toolbar>
        <FiltersAssistantDialog open={open} setOpen={setOpen} />
      </Container>
    </AppBar >
  );
};

export default Header;
