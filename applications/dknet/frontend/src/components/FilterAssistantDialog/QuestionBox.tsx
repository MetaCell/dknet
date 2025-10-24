import React from "react";

import Box from '@mui/material/Box';

interface QuestionBoxProps {
  maxWidth?: string;
  children?: React.ReactNode;
  inputType?: string;
}

const QuestionBox = (props: QuestionBoxProps) => {
  return (
    <Box sx={{
      background: '#FFF',
      borderRadius: '1.5rem',
      p: 2,
      boxShadow: '0px 10px 40px -10px #EAECF0, 0px 0px 1px rgba(0, 0, 0, 0.25)',
      width: '100%',
      flex: 1,
      overflow: 'auto',
      height: '100%',
      maxWidth: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Box sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        gap: 1.5
      }}>
        {props.children}
      </Box>
    </Box>
  )
}
export default QuestionBox;
