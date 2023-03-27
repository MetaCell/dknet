import React from 'react';
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import theme from './theme/Theme';

//components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Box>
          <Typography variant='body2'>dkNET</Typography>
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App;
