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
    return allRepositories.filter((repository) => repository.attributes[filterKey].includes(filterValueObject.code))
  }

  useEffect(() => {
    const latestMatchedRepos = context.allRepositories

    Object.keys(context.filterValues).forEach(key => {
  
      if(context.filterValues[key] !== undefined){
        let rows = [];
        if(Array.isArray(context.filterValues[key]) && context.filterValues[key].length > 0){
          rows = context.filterValues[key]
        }
        else if(!Array.isArray(context.filterValues[key]) && context.filterValues[key].code){
          rows.push(context.filterValues[key])
        }
        console.log("rows: ", rows)
        // rows.forEach(row => {
        //   latestMatchedRepos = filterReposByOneFilterValue(latestMatchedRepos, key, row)
        // })

        // console.log("rows: ", rows)
        // latestMatchedRepos = latestMatchedRepos.filter(repository => {
        //   console.log("repository.attributes ", repository.attributes)
        //   repository.attributes[key].forEach(row => {
        //     console.log("row: ", row)
        //     console.log("repository.attributes[key][row]: ", repository.attributes[key][row] )
        //     return rows.includes(row)
        //   }
        //   )
        // })
      }
    })
    setRepositories(latestMatchedRepos)
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
