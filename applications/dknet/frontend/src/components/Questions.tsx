import React from 'react';

//components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { MultipleItemsCheckbox, TwoItemsCheckbox, checkboxOptions, checkboxTwoOptions } from './questionUtilities';
import QuestionBox from './QuestionBox/QuestionBox';

const Item = styled(Box)(({ theme }) => ({
  display: 'flex',
  border: `1px solid ${theme.palette.grey[200]}`,
  borderRadius: '12px',
  width: '100%',
  '& .MuiCheckbox-root': {
    padding: 0
  },
  '& .MuiTypography-body2': {
    color: theme.palette.grey[700],
    marginLeft: '12px',
    display: 'inline-block',
    width: '138px',
    whiteSpace: 'nowrap',
    overflow: 'hidden !important',
    textOverflow: 'ellipsis'
  },
  '& .MuiTypography-body1': {
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

const Questions = () => {

  const [state, setState] = React.useState([...checkboxOptions]);
  const [state2, setState2] = React.useState([...checkboxTwoOptions])
    
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, option, index) => {
    const newValues = [...checkboxOptions];
    newValues[index].checked = event.target.checked;
    setState(newValues);
  };

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>, option, index) => {
    const newValues = [...checkboxTwoOptions];
    newValues[index].checked = event.target.checked;
    setState2(newValues);
  };

  return (
    <>
      <QuestionBox>
        {
          state.map((option, index) => 
            <Item p={2} key={index}>
              <MultipleItemsCheckbox checked={option.checked} onChange={(e) => handleChange(e, option, index)} name={option.label}/>
              <Typography variant="body2">{option.label}</Typography> 
            </Item> 
          )
        }
      </QuestionBox>
      <QuestionBox>
        {
          state2.map((option, index) => 
            <Item pb={4} pt={4} justifyContent="center" alignItems="center" flexDirection='column' key={index}>
              <TwoItemsCheckbox checked={option.checked} onChange={(e) => handleChange2(e, option, index)} name={option.label}/>
              <Typography variant="body1">{option.label}</Typography>
            </Item>
          )
        }
      </QuestionBox>
    </>
  ) 
}

export default Questions;