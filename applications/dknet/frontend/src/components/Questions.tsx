import React from 'react';

//components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import QuestionBox from './QuestionBox/QuestionBox';
import CheckBoxWidget from './widgets/CheckBox';
import { styled } from "@mui/material/styles";

//icons
import { FeaturedIcon, FeaturedIconChecked } from './icons';

const Item = styled(Box)(({ theme }) => ({
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

const checkboxTwoOptions = [
  {
    label: 'Multiple',
    checked: false, 
  },
  {
    label: 'Only one',
    checked: false
  }
]
const data = [
  {
    label: 'Addiction & HIV',
    checked: false
  },
  {
    label: 'Cancer',
    checked: false
  },
  {
    label: 'Chemistry, chemical biology and biochemistry',
    checked: false
  },
  {
    label: 'Diabetes, Digestive &Kidney Diseases',
    checked: false
  },
  {
    label: 'Enzymology',
    checked: false
  },
  {
    label: 'Fly genetics',
    checked: false
  },
  {
    label: 'Immunology',
    checked: false
  },
  {
    label: 'Influenza',
    checked: false
  },
  {
    label: 'Metabolomics',
    checked: false
  },
  {
    label: 'Microbiome',
    checked: false
  },
  {
    label: 'Mouse genetics', 
    checked: false
  },
  {
    label: 'Neuroscience', 
    checked: false
  },
  {
    label: 'Physiology', 
    checked: false
  },
  {
    label: 'Structural biology', 
    checked: false
  },
  {
    label: 'Zebrafish genetics', 
    checked: false
  },
  {
    label: 'Other', 
    checked: false
  }
]

const Questions = () => {

  const [state, setState] = React.useState([...checkboxTwoOptions])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, option, index) => {
    const newValues = [...checkboxTwoOptions];
    newValues[index].checked = event.target.checked;
    setState(newValues);
  };

  return (
    <>
      <QuestionBox>
        {
          data.map((option, index) => 
            <Item p={2} key={index}>
              <CheckBoxWidget data={option}/>
            </Item> 
          )
        }
      </QuestionBox>
      <QuestionBox>
        {
          state.map((option, index) => 
            <Item pb={4} pt={4} justifyContent="center" alignItems="center" flexDirection='column' key={index}>
              <Checkbox 
                sx={{ '& .MuiSvgIcon-root': { fill: 'none' } }}
                icon={<FeaturedIcon/>}
                checked={option.checked} onChange={(e) => handleChange(e, option, index)} name={option.label}
                checkedIcon={<FeaturedIconChecked/>}
              />
              <Typography variant="body2">{option.label}</Typography>
            </Item>
          )
        }
      </QuestionBox>
    </>
  ) 
}

export default Questions;