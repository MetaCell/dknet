import React, { useEffect, useState } from 'react'
import { useFilterContext } from '../context/Context'

//components
import withLayout from "../useLayout";
import Box from '@mui/material/Box';
import MainLayout from "../Layouts/Main";
import Grid from "@mui/material/Grid";
import Filters from "../components/Filters";
import Container from "@mui/material/Container";
import SortWidget from '../components/widgets/Sort';
import RepositoryCard from '../components/RepositoryCard';
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';


const HomePage = () => {
  const { context, setContext } = useFilterContext();
  const [ repositories, setRepositories ] = useState([])



  useEffect(() => {
    const newFilterValues = {}
    const filterValuesClone = Object.assign({}, context.filterValues)
    Object.keys(filterValuesClone).filter(key => filterValuesClone[key] !== undefined).forEach(key => {
      if(!Array.isArray(filterValuesClone[key])) {
        filterValuesClone[key] = [filterValuesClone[key]]
      }
      newFilterValues[key] = []
      filterValuesClone[key].forEach(valueObj => {
        newFilterValues[key].push(valueObj.code)
      })
    })
    const match = []
    for (const repository of context.allRepositories) {
      for(const key of Object.keys(newFilterValues)){
        if (repository.attributes[key].some(val => newFilterValues[key].includes(val))) {
          match.push(repository)
          break
        }
      }
    }

    setRepositories(match)
  }, [context])

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid md={8.5} item>
          <Grid spacing={2}>
            <Grid item display='flex' justifyContent='space-between' alignItems='center' mb={2}>
              <Typography variant='h5' lineHeight='unset' color='grey.900'>{repositories.length} repositories matching your criteria</Typography>
              <SortWidget/>
            </Grid>
            {
              repositories && repositories.map((repository, index) => <Grid item key={index}  xs={12} justifyContent='flex-end'>
                <RepositoryCard key={repository.code} repository={repository} />
              </Grid>)
            }
          </Grid>
        </Grid>
        <Grid md={3.5} item>
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
    </Container>
  )
}
const HomePageWithLayout = withLayout(MainLayout)(HomePage);
export default HomePageWithLayout;
