import React from 'react'

//components
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { LaunchPageIcon } from "../assets/icons";
import Typography from "@mui/material/Typography";
import FiltersAssistantDialog from "../components/FilterAssistantDialog/FiltersAssistantDialog";
import { useFilterContext } from '../context/Context';
import { Stack, Divider } from '@mui/material';
import { useResponsive } from '../hooks/useResponsive';
import { RESPONSIVE_CONFIGS, RESPONSIVE_BREAKPOINTS } from '../utils/constants';

const LaunchPage = () => {
  const [open, setOpen] = React.useState(false);
  const { context, setContext } = useFilterContext();
  const { screenSize } = useResponsive();
  const responsiveConfig = RESPONSIVE_CONFIGS[screenSize] || RESPONSIVE_CONFIGS.default;

  return (
    <Grid container spacing={6} justifyContent='center'>
      <Grid item xs={12} display='flex' justifyContent='center' alignItems='center'>
        {screenSize === RESPONSIVE_BREAKPOINTS.TABLET ? (
          <Divider sx={{ width: '100%', maxWidth: '50%' }}>
            <Typography variant='h4' color='text.secondary'>OR</Typography>
          </Divider>
        ) : (
          <LaunchPageIcon style={{
            height: 'auto',
            width: responsiveConfig.homePageImageWidth,
          }} />
        )}
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
            Browse all data
          </Button>
        </Stack>
      </Grid>
      <FiltersAssistantDialog open={open} setOpen={setOpen} />
    </Grid>
  )
}
export default LaunchPage;
