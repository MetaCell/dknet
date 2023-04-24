import React from "react"
import Grid from "@mui/material/Grid";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import ProgressBar from "./widgets/ProgressBar";
import QuestionBox from "./QuestionBox/QuestionBox";
import CheckBoxWidget from "./widgets/CheckBox";
import { styled } from "@mui/material/styles";
import Radio from '@mui/material/Radio';
import { FeaturedIcon, FeaturedIconChecked } from './icons';

export const Item = styled(Box)(({ theme }) => ({
  display: 'flex',
  border: `1px solid ${theme.palette.grey[200]}`,
  borderRadius: '12px',
  width: '100%',
  '& .MuiFormControlLabel-root': {
    margin: 0
  },
  '& .MuiCheckbox-root': {
    padding: 0
  },
  '& .MuiTypography-body1': {
    color: theme.palette.grey[700],
    marginLeft: '12px',
    display: 'inline-block',
    width: '138px',
    whiteSpace: 'nowrap',
    overflow: 'hidden !important',
    textOverflow: 'ellipsis',
    fontWeight: 500,
    fontSize: '0.875rem',
  },
  '& .MuiTypography-body2': {
    color: theme.palette.grey[700],
    fontWeight: 500,
    fontSize: '0.875rem',
    marginTop: '8px'
  },
  '&:hover': {
    backgroundColor: '#F8FDFA',
    border: `1px solid ${theme.palette.primary['main']}}`,
  }
})); 

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

  // const [selectedValue, setSelectedValue] = React.useState('one');

  // const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSelectedValue(event.target.value);
  // };

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
                <Tab key={index} label={question?.question} {...a11yProps(index)} />
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
              {question?.question}
              <QuestionBox>
                {
                  question?.options.map((data) =>
                    question?.inputType === 'MULTI' ? <Item p={2} key={data?.label}>
                      <CheckBoxWidget
                        data={data}
                        filter={data}
                      />
                    </Item> :
                      <Item key={data?.label} pb={4} pt={4} justifyContent="center" alignItems="center" flexDirection="column">
                        <Radio
                          value={data?.code}
                          name={question?.code}
                          sx={{ '& .MuiSvgIcon-root': { fill: 'none' } }}
                          icon={<FeaturedIcon />}
                          checkedIcon={<FeaturedIconChecked />}
                          inputProps={{ 'aria-label': data?.label }}
                        />
                        <Typography variant="body2">{data?.label}</Typography>
                      </Item>
                  )
                }
              </QuestionBox>
              {/* <QuestionBox>
                <Item pb={4} pt={4} justifyContent="center" alignItems="center" flexDirection="column">
                  <Radio
                    checked={selectedValue === 'one'}
                    onChange={handleRadioChange}
                    value="one"
                    name="radio-buttons"
                    sx={{ '& .MuiSvgIcon-root': { fill: 'none' } }}
                    icon={<FeaturedIcon/>}
                    checkedIcon={<FeaturedIconChecked/>}
                    inputProps={{ 'aria-label': 'Only one' }}
                  />
                  <Typography variant="body2">Only one</Typography>
                </Item>
                <Item pb={4} pt={4} justifyContent="center" alignItems="center" flexDirection="column">
                  <Radio
                    checked={selectedValue === 'multiple'}
                    onChange={handleRadioChange}
                    value="multiple"
                    name="radio-buttons"
                    sx={{ '& .MuiSvgIcon-root': { fill: 'none' } }}
                    icon={<FeaturedIcon/>}
                    checkedIcon={<FeaturedIconChecked/>}
                    inputProps={{ 'aria-label': 'Multiple' }}
                  />
                  <Typography variant="body2">Multiple</Typography>
                </Item>

              </QuestionBox> */}
            </TabPanel>)
        }
        <Button variant='contained' onClick={onClickNext}>Next</Button>
      </Grid>
    </Grid>
  );
}
