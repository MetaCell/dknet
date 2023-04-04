import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Grid from "@mui/material/Grid";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress  from '@mui/material/LinearProgress';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from "@mui/material/Button";
import ProgressBar from "./widgets/ProgressBar";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function FiltersAssistantDialog({ open, setOpen }) {
  const [value, setValue] = React.useState(0);
  const [progress, setProgress] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onClickNext = () => {
    if ( value !== 8) {
      setValue(value+1)
      updateProgress(value+1)
    }
  }

  const updateProgress = (number) => {
    const newProgressValue = (number / 8) * 100
    setProgress(newProgressValue)
  }

  const questionsTabs = [
    "What is the data type you will be sharing?",
    "What domain do the data belong to?",
    "Will you be sharing human data with PHI?",
    "Will the data be updated frequently, i.e., they are part of an ongoing study that will uploaded in batches?",
    "How important is data citation to you?",
    "Is the dataset funded, at least in part, by the NIH?",
    "Will the dataset support any published academic work?",
    "Will you need a PID for the published dataset?"
  ]

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
      maxWidth='lg'
      fullWidth={true}
      sx={{
        "& .MuiPaper-root": {
          height: '100%',
          borderRadius: '12px'
        }
      }}
    >
      <DialogTitle sx={{
        borderBottom: '1px solid #EAECF0',
      }}>
        <Typography variant='h2'>
          Filtering Assistant
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: "#F9FAFB" }}>
        <Grid container spacing={2} height='100%'>
          <Grid item xs={0} md={4} display='flex' flexDirection='column' justifyContent='space-between'>
            <Box mt={4} mb={2}>
              <Typography component='h4'>Questions</Typography>
            </Box>
            <Box
              sx={{
                height: 224,
                flexGrow: 1,
                display: 'flex',
                "& .MuiTabs-root": {
                  borderRight: 0,
                  borderLeft: '1px solid #EAECF0',
                },
                "& .MuiTabs-indicator": {
                  left: 0
                },
                "& .Mui-selected": {
                  background: '#F2F4F7',
                  borderRadius: '6px',
                },
              }}
            >
              <Tabs
                orientation="vertical"
                variant="scrollable"
                onChange={handleChange}
                value={value}
                sx={{
                  borderRight: 1, borderColor: 'divider',
                  "& .MuiButtonBase-root": {
                    alignItems: 'baseline !important',
                    textAlign: 'left',
                    textTransform: 'inherit',
                    color: '#667085',
                    fontSize: '1rem',
                    fontWeight: 400
                  }
                }}
              >
                {
                  questionsTabs?.map((question, index) =>
                    <Tab key={index} label={question} {...a11yProps(index)} />
                  )
                }
              </Tabs>
            </Box>
            <ProgressBar progress={progress} />
          </Grid>
          <Grid item xs={0} md={8} sx={{ borderLeft: '1px solid #EAECF0' }}>
            {
              questionsTabs.map((question, index) =>
                <TabPanel key={index} value={value} index={index}>
                  {question}
                </TabPanel>)
            }
            <Button variant='contained' onClick={onClickNext}>Next</Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
