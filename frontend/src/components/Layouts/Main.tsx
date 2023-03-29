import React from 'react';

//components
import Header from "../Header";
import Container from '@mui/material/Container';
import { Box, Typography } from "@mui/material";
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
      <Container maxWidth='lg' sx={{ minHeight: '40%' }}>
        <Header />
        <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' gap={1} mt={7} mb={10}>
          <Typography variant='h1'>Find the right repository for your data.</Typography>
          <Typography variant='subtitle1'>Explore, filter and find the best repositories for your data and needs.</Typography>
          <Box display='flex' justifyContent='center' width={1} mt={2}>
            <Search />
          </Box>
        </Box>
      </Container>
      <Box
        pt={9}
        pb={9}
        sx={{
          background: '#FFFFFF',
          minHeight: '60%',
          borderRadius: '24px 24px 0px 0px',
          border: '1px solid #fff'
        }}>
        {children}
      </Box>
    </Box>

  )
}

export default MainLayout;
