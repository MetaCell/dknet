import React from 'react';

//components
import { Box, Typography } from '@mui/material';
import Header from '../components/Header/Header';
import Search from '../components/Search/Search';
import RepositoryCard from '../components/RepositoryCard/RepositoryCard';


const HomePage = () => {
  return (
    <>
      <Header/>
      <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' gap={1} mt={9}>
        <Typography variant='h4'>Find the right repository for your data.</Typography>
        <Typography variant='subtitle1'>Explore, filter and find the best repositories for your data and needs.</Typography>
        <Box display='flex' justifyContent='center' width={1} mt={2}>
          <Search/>
        </Box>
        <Box display="flex" alignItems="center" gap={0.5} mt={3}>
          <Typography variant='subtitle2'>Need help setting up filters?</Typography>
          <Typography variant='body2' color="secondary" sx={{ fontWeight: 600 }} >Try our Filtering Assistant</Typography>
        </Box>
      </Box>
      <RepositoryCard/>
    </>
  )
}

export default HomePage;