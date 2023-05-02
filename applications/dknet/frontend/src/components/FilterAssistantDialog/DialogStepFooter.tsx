import React from "react"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";

export default function DialogStepFooter({ handlePrev, index, value, closeDialog, questionsTabs, handleNext }) {
  return (
    <Box display='flex' alignItems='center'>
      {value !== 0 && <Button sx={{ mr: 1 }} variant='outlined' onClick={() => handlePrev(index)}>Prev</Button>}
      {questionsTabs?.length === value + 1 ? (
        <Button variant='contained' onClick={closeDialog}>Go to results</Button>
      ) : (
        <>
          <Box display='flex' alignItems='center' flexGrow={1}>
            <Button variant='contained' onClick={() => handleNext(index)}>
              Next
            </Button>

            <Typography sx={{
              ml: 1,
              fontWeight: 400,
              fontSize: '0.875rem',
              lineHeight: '143%',
              color: '#98A2B3',
            }}>
              or press Enter
            </Typography>
          </Box>
          <Button onClick={() => handleNext(index)}>
            Skip
          </Button>
        </>
      )}
    </Box>
  );
}
