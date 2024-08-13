import React from 'react';

//components
import Header from "../components/Header";
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Box, Grid, Typography } from "@mui/material";
import Search from "../components/Search";
import FiltersAssistantDialog from "../components/FilterAssistantDialog/FiltersAssistantDialog";


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
            <Typography fontWeight='normal' fontSize='1rem' variant='subtitle1'>Explore, filter and find the best repositories for your data and needs.</Typography>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="center">
            <Search/>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Box mt={2} display='flex' alignItems='center' flexDirection='column' gap={1.5} justifyContent='center' width={1}>
              <Button variant='contained' color='secondary' onClick={viewFilterAssistant}>Edit inputs in Filtering Assistant</Button>
              <Typography variant='subtitle2' mr={1}>Results was the outcome of Filtering Assistant.</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Box
        pt={9}
        pb={9}
      >
        {children}
      </Box>
      <FiltersAssistantDialog open={open} setOpen={setOpen} />
    </Box>

  )
}

export default MainLayout;
