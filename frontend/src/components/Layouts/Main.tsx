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
      <Container>
        <Header />
        <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' gap={1} mt={7}>
          <Typography variant='h4'>Find the right repository for your data.</Typography>
          <Typography variant='subtitle1'>Explore, filter and find the best repositories for your data and needs.</Typography>
          <Box display='flex' justifyContent='center' width={1} mt={2}>
            <Search/>
          </Box>
        </Box>
        {children}
      </Container>
    </Box>

  )
}

export default MainLayout;
