import React from 'react'

//components
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { LaunchPageIcon } from "../assets/icons";
import Typography from "@mui/material/Typography";
import FiltersAssistantDialog from "../components/FilterAssistantDialog/FiltersAssistantDialog";
import { useFilterContext } from '../context/Context';
import { Stack } from '@mui/material';

const LaunchPage = () => {
  const [open, setOpen] = React.useState(false);
  const { context, setContext } = useFilterContext();

  return (
    <Grid container spacing={6} justifyContent='center'>
      <Grid item xs={12} display='flex' justifyContent='center' alignItems='center'>
        <LaunchPageIcon style={{
          height: 'auto',
          width: '40%'
        }} />
      </Grid>
      <Grid item md={6}>
        <Stack spacing={2} textAlign='center' alignItems='center'>
          <Typography variant='h2'>Want to browse all data instead?</Typography>
          <Typography variant='subtitle2' textAlign='center'>If you’re unsure of what exactly you’re looking for, browse all data instead without having any filters applied.</Typography>
          <Button
            variant='outlined'
            onClick={() => setContext({
              ...context,
              showAll: true
            })}
          >
            Browse Data
          </Button>
        </Stack>
      </Grid>
      <FiltersAssistantDialog open={open} setOpen={setOpen} />
    </Grid>
  )
}
export default LaunchPage;
