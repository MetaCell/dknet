import React from 'react';

//components
import Header from "../Header";
import Container from '@mui/material/Container';
import { Box, Grid, Typography } from "@mui/material";
import Search from "../Search/Search";


const MainLayout = ({ children }) => {
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
            <Typography variant='h4'>Find the right repository for your data.</Typography>
            <Typography variant='subtitle1'>Explore, filter and find the best repositories for your data and needs.</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Search/>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Box display='flex' alignItems='center' justifyContent='center' width={1}>
              <Typography variant='subtitle2' mr={1}>Need help setting up filters? </Typography>
              <Typography variant='body2' color="secondary" sx={{ fontWeight: 600 }} >Try our Filtering Assistant</Typography>
            </Box>
          </Grid>
        </Grid>
        {children}
      </Container>
    </Box>

  )
}

export default MainLayout;
