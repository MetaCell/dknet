import React  from 'react'

//components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { LaunchPageIcon } from "../assets/icons";
import Typography from "@mui/material/Typography";
import FiltersAssistantDialog from "../components/FilterAssistantDialog/FiltersAssistantDialog";
import { useFilterContext } from '../context/Context';
import { vars } from "../theme/variables";

const {
  grey200,
  grey700,
  white
} = vars;

const LaunchPage = () => {
  const [open, setOpen] = React.useState(false);
  const { context, setContext } = useFilterContext();

  return (
    <Grid container spacing={6} justifyContent='center'>
      <Grid item xs={12} display='flex' justifyContent='center' alignItems='center'>
        <LaunchPageIcon style={{
          height: 'auto',
          width: '40%'
        }}/>
      </Grid>
      <Grid item  md={6} display='flex' justifyContent='center' alignItems='center'>
        <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
          <Typography color='grey.800' variant='h5' mb={2}>Want to browse all data instead?</Typography>
          <Typography fontWeight='normal' fontSize='1rem' variant='subtitle1' textAlign='center' mb={2}>If you’re unsure of what exactly you’re looking for, browse all data instead without having any filters applied.</Typography>
          <Button
            variant='contained'
            style={{
              backgroundColor: white,
              borderColor: grey200,
              color: grey700,
              border: '1px solid',
              fontWeight: 600
            }}
            onClick={() => setContext({
              ...context,
              showAll: true
            })}
          >
            Browse Data
          </Button>
        </Box>
      </Grid>
      <FiltersAssistantDialog open={open} setOpen={setOpen} />
    </Grid>
  )
}
export default LaunchPage;
