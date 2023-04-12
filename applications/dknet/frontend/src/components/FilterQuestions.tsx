import React from "react"
import Grid from "@mui/material/Grid";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import ProgressBar from "./widgets/ProgressBar";


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

export default function FilterQuestions({ questionsTabs, onClickNext, progress, handleChange, value }) {

  return (
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
  );
}
