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

  const filterReposByOneFilterValue = (allRepositories, filterKey, filterValueObject) => {
    return allRepositories.reduce((matchedRepos, repository) => {
      if (repository.attributes[filterKey].includes(filterValueObject.code)) {
        matchedRepos.push(repository)
      }
      return matchedRepos
    }, [])
  }

  useEffect(() => {
    let latestMatchedRepos = context.allRepositories
    Object.keys(context.filterValues).forEach(key => {
      if (context.filterValues[key] !== undefined) {
        if ((Array.isArray(context.filterValues[key]) && context.filterValues[key].length > 0)
          || (!Array.isArray(context.filterValues[key]) && context.filterValues[key].code)) {
          latestMatchedRepos = filterReposByOneFilterValue(latestMatchedRepos, key, context.filterValues[key])
        }
      }
    })
    setRepositories(latestMatchedRepos)
  }, [context])

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <Grid container spacing={2}>
            <Grid item xs={12} display='flex' justifyContent='flex-end'>
              <SortWidget/>
            </Grid>
            {
              repositories && repositories.map((repository, index) => <Grid item key={index}  xs={12} justifyContent='flex-end'>
                <RepositoryCard key={repository.code} repository={repository} />
              </Grid>)
            }
          </Grid>
        </Grid>
        <Grid item xs={5}>
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
