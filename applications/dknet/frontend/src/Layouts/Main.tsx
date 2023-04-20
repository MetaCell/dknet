import React from 'react';

//components
import Header from "../components/Header";
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Box, Grid, Typography } from "@mui/material";
import Search from "../components/Search";
import FiltersAssistantDialog from "../components/FiltersAssistantDialog";


const MainLayout = ({ children }) => {
  const [open, setOpen] = React.useState(false);

  const viewFilterAssistant = () => {
    setOpen(true);

  }
  return (
    <Box sx={{
      backgroundImage: 'url("/gridBg.svg")',
      backgroundRepeat: 'np-repeat',
      backgroundSize: 'cover',
      minHeight: '100vh',
      overflow: 'auto'
    }}>
      <Container>
        <Header />
        <Grid container spacing={2} justifyContent='center' textAlign='center' mt={8}>
          <Grid item xs={12} sm={8}>
            <Typography variant='h1'>Find the right repository for your data.</Typography>
            <Typography variant='subtitle1'>Explore, filter and find the best repositories for your data and needs.</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Search/>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Box display='flex' alignItems='center' justifyContent='center' width={1}>
              <Typography variant='subtitle2' mr={1}>Need help setting up filters? </Typography>
              <Button variant='text' sx={{ fontWeight: 600, color: '#088E75' }} onClick={viewFilterAssistant} >Try our Filtering Assistant</Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Box
        pt={9}
        pb={9}
        sx={{
          background: '#FFFFFF',
          minHeight: '60%',
          borderRadius: '24px 24px 0px 0px',
          border: '1px solid #fff'
        }}>
        {children}
      </Box>
      <FiltersAssistantDialog open={open} setOpen={setOpen} />
    </Box>

  )
}

export default MainLayout;
