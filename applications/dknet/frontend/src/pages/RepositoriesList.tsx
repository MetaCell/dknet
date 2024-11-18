import React from 'react'
import { useFilterContext } from '../context/Context'

//components
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Filters from "../components/Filters";
import SortWidget from '../components/widgets/Sort';
import RepositoryCard from '../components/RepositoryCard';
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';


const RepositoriesList = () => {
  const { context } = useFilterContext();

  return (
    <Grid container spacing={4} sx={{
      background: '#FFFFFF',
      minHeight: '60%',
      borderRadius: '24px 24px 0px 0px',
      border: '1px solid #fff'
    }}>
      <Grid md={8} item>
        <Grid spacing={2}>
          <Grid item display='flex' justifyContent='flex-end' mb={2}>
            <SortWidget/>
          </Grid>
          {
            context.results.length > 0 ? context.results.map((repository, index) => <Grid item key={index}  xs={12} justifyContent='flex-end'>
              <RepositoryCard key={repository.code} repository={repository} isBestMatch={index === 0 || repository.pctMatch === context.results[0].pctMatch}/>
            </Grid>) : <Typography variant='h5'>No results found matching the filter criterias</Typography>
          }
        </Grid>
      </Grid>
      <Grid md={4} item>
        <Stack spacing={2}>
          <Filters />
          <Box sx={{
            background: '#FCFCFD',
            borderRadius: '12px',
            padding: 3
          }}>
            <Stack spacing={2}>
              <Typography variant='h5'>Want to learn more on how we show you results?</Typography>
              <Typography variant='h4'>Discover the rules and algorithms that show you results that you see.</Typography>
              <Typography variant='h5'>Learn more</Typography>
            </Stack>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  )
}
export default RepositoriesList;
