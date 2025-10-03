import React from 'react';

//components
import Header from "../components/Header";
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Box, Grid, Typography } from "@mui/material";
import FiltersAssistantDialog from "../components/FilterAssistantDialog/FiltersAssistantDialog";
import { useFilterContext } from "../context/Context";
import { useResponsive } from "../hooks/useResponsive";

const MainLayout = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const { context } = useFilterContext();
  const { allRepositories, allFilters } = context;
  const { screenSize } = useResponsive();

  const viewFilterAssistant = () => {
    setOpen(true);
  }

  return (
    <Box sx={{
      backgroundImage: 'url("/gridBg.svg")',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      minHeight: '100vh',
      overflow: 'auto',
      backgroundAttachment: 'fixed',
    }}>
      <Container>
        <Header />
        <Grid container spacing={2} justifyContent='center' textAlign='center' mt={8}>
          <Grid item xs={12} sm={8}>
            <Typography variant='h1'>Find the right repository for your data.</Typography>
            <Typography fontWeight='normal' fontSize='1rem' variant='subtitle1'>Explore, filter and find the best repositories for your data and needs.</Typography>
          </Grid>
          {
            (allRepositories.length === 0 && allFilters.length === 0 ? <></> : (
              <>
                <Grid item xs={12} display="flex" justifyContent="center">
                  <Button variant='contained' onClick={viewFilterAssistant} sx={{ width: '16.5rem', height: '3.75rem', fontSize: '1rem' }}>Click Here To Get Started</Button>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Box mt={2} display='flex' alignItems='center' flexDirection='column' gap={1.5} justifyContent='center' width={1}>
                    <Typography variant='subtitle2' mr={1}>You will be asked a series of questions based on your data requirements and priorities</Typography>
                  </Box>
                </Grid>
              </>
            ))
          }
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
