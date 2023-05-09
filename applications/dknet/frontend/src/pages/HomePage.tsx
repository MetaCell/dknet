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
  const [ repositories, setRepositories ] = useState([]);

  function areEqual(array1, array2) {
    if (array1.length === array2.length) {
      return array1.every(element => {
        if (array2.includes(element)) {
          return true;
        }
  
        return false;
      });
    }
  
    return false;
  }

  useEffect(() => {
    // apply context.filterValues on the allFilters + allRepositories
    const foundRepositories = context.allRepositories.filter((repository) => {
  
      for (const key in context.filterValues) {
        if (context.filterValues[key] === undefined) {
          continue; 
        }
        
        if (Array.isArray(context.filterValues[key]) && context.filterValues[key].length !== 0) {
          console.log("I am ano arr: ", context.filterValues[key])
          let match  = false

          const tempCodes = context.filterValues[key].map((item) => item.code)
          const filteredCodes = repository.attributes[key].filter((item) => item !== "")

          if(areEqual(tempCodes, filteredCodes)){
            match = true;
          }
          if (!match){ return false; }
        }

        if(context.filterValues[key].code ==="no-restrictions" || context.filterValues[key].code ==="minimal-restrictions" || context.filterValues[key].code ==="significant-restrictions" || context.filterValues[key].code ==="significant-but-not-justified-restrictions"){
          if(repository.attributes[key][0] !== context.filterValues[key].code){
            return false;
          }
        }
        // if(!Array.isArray(context.filterValues[key])){
        //   if(repository.attributes[key][0] !== context.filterValues[key].code){
        //     return false;
        //   }
        // }

      }
      return true
    });

    setRepositories(foundRepositories)
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
