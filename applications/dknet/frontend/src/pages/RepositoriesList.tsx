import React, { useState, useEffect } from 'react'
import { useFilterContext } from '../context/Context'

//components
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Filters from "../components/Filters";
import SortWidget from '../components/widgets/Sort';
import RepositoryCard from '../components/RepositoryCard';
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';
import { vars } from '../theme/variables';
import { useResponsive } from '../hooks/useResponsive';
import { Button } from '@mui/material';

const { success500 } = vars;


const RepositoriesList = () => {
  const [showGeneralist, setShowGeneralist] = useState(false);
  const { context } = useFilterContext();
  const { screenSize } = useResponsive();

  // Responsive grid sizes
  const getGridSizes = () => {
    switch (screenSize) {
      case 'tooSmall':
        return { main: 12, filters: 12 };
      case 'tablet':
        return { main: 12, filters: 12 };
      case 'laptop':
        return { main: 8, filters: 4 };
      case 'desktop':
        return { main: 8, filters: 4 };
      default:
        return { main: 8, filters: 4 };
    }
  };

  const gridSizes = getGridSizes();

  useEffect(() => {
    if (showGeneralist) {
      setShowGeneralist(false);
    }
  }, [context.filterValues, context.results, showGeneralist]);

  // Scroll to top when component mounts or when results change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <Grid container spacing={screenSize === 'tooSmall' ? 2 : 4}>
      <Grid xs={12} md={gridSizes.main} item>
        <Grid spacing={2}>
          <Grid item display='flex' justifyContent='flex-end' mb={2}>
            <Grid container direction={'row'} justifyContent='space-between' alignItems='center'>
              <Typography variant='h2'><Typography component="span" variant='h2' color={vars.primary800}>{context.results.length} repositories</Typography> matching your criteria</Typography>
            </Grid>
            <SortWidget />
          </Grid>
          {
            context.results.length > 0
              ? context.results.map((repository, index) => <Grid item key={index} xs={12} justifyContent='flex-end'>
                <RepositoryCard resultIndex={index} key={repository.code} repository={repository} isBestMatch={index === 0 || repository.pctMatch === context.results[0].pctMatch} />
              </Grid>)
              : <>
                <Typography sx={{ textAlign: 'center', marginTop: '1.5rem' }} variant='h2'>No results found matching the filters criteria.</Typography>
                {showGeneralist === false
                  ? <>
                    <Typography
                      onClick={() => setShowGeneralist(true)}
                      sx={{
                        fontWeight: 'bold',
                        textDecoration: 'underline',
                        textAlign: 'center',
                        cursor: 'pointer',
                        marginTop: '0.75rem',
                        marginBottom: '5rem',
                        color: success500
                      }}
                      variant='h5'>
                      Try one of our generalist repository
                    </Typography>
                  </>
                  : context.allGeneralistRepositories.map((repository, index) => <Grid sx={{ marginTop: '4rem' }} item key={index} xs={12} justifyContent='flex-end'>
                    <RepositoryCard key={repository.code} repository={repository} isBestMatch={false} />
                  </Grid>)
                }
              </>
          }
        </Grid>
      </Grid>
      <Grid xs={12} md={gridSizes.filters} item>
        <Stack spacing={2}>
          <Filters />
          {(screenSize === 'laptop' || screenSize === 'desktop') && (
            <Box sx={{
              background: '#FCFCFD',
              borderRadius: '12px',
              padding: 3
            }}>
              <Stack spacing={2} alignItems='flex-start'>
                <Typography variant='h4' fontWeight={600}>Want to learn more on how we show you results?</Typography>
                <Typography variant='body2'>Discover the rules and algorithms that show you results that you see.</Typography>
                <Button variant="text">Learn more</Button>
              </Stack>
            </Box>
          )}
        </Stack>
      </Grid>
    </Grid>
  )
}
export default RepositoriesList;
