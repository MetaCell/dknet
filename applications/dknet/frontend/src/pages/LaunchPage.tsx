import React  from 'react'

//components
import Grid from "@mui/material/Grid";

import { LaunchPageIcon } from "../assets/icons";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FiltersAssistantDialog from "../components/FilterAssistantDialog/FiltersAssistantDialog";

const LaunchPage = () => {
  const [open, setOpen] = React.useState(false);

  const viewFilterAssistant = () => {
    setOpen(true);
  }

  return (
    <Grid container spacing={8} justifyContent='center'>
      <Grid item xs={12} display='flex' justifyContent='center' alignItems='center'>
        <LaunchPageIcon style={{
          height: 'auto',
          width: '40%'
        }}/>
      </Grid>
      <Grid item  md={6} display='flex' justifyContent='center' alignItems='center'>
        <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
          <Typography color='grey.800' variant='h5' mb={2}>Need help setting up filters?</Typography>
          <Typography fontWeight='normal' fontSize='1rem' variant='subtitle1' textAlign='center' mb={2}>Go through filters one by one guided by our Filtering Assistant and find the best repository matching as many filters as possible.</Typography>
          <Button
            variant='contained'
            style={{
              backgroundColor: '#D1F2DF',
              color: '#088E75',
              border: 0,
              fontWeight: 600
            }}
            onClick={viewFilterAssistant}
          >
            Try our Filtering Assistant
          </Button>
        </Box>
      </Grid>
      <FiltersAssistantDialog open={open} setOpen={setOpen} />
    </Grid>
  )
}
export default LaunchPage;
