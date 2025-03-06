import React from "react";

//components
import Box from '@mui/material/Box';

const QuestionBox = (props: any) => {
  const gridTemplateColumns = props.inputType === 'MULTI' ? (props.children.length == 2 ? 'repeat(2,auto)' : props.children.length == 4 ? 'repeat(4, auto)' : 'repeat(3, auto)') : 'auto';
  return (
    <Box sx={{
      background: '#FFF',
      borderRadius: 6,
      padding: 2,
      marginTop: 2,
      marginBottom: 2,
      boxShadow: '0px 10px 40px -10px #EAECF0, 0px 0px 1px rgba(0, 0, 0, 0.25)',
      width: 'calc(100% + 25px)',
      maxHeight: '42rem',
      overflowY: 'auto',
      marginLeft: '-0.5rem'
    }}>
      <Box
        gap={1.5}
        display="grid"
        gridTemplateColumns={gridTemplateColumns}
      >
        {
          props.children
        }
      </Box>
    </Box>
  )
}
export default QuestionBox;
