import React from "react"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import { vars } from '../../theme/variables';

export default function DialogStepFooter({ handlePrev, value, closeDialog, questionsTabs, handleNext }) {
  return (
    <Box display='flex' alignItems='center' px={2}>
      {value !== 0 && <Button sx={{ mr: 1 }} variant='outlined' onClick={() => handlePrev()}>Previous</Button>}
      {questionsTabs?.length === value + 1 ? (
        <Button variant='contained' onClick={closeDialog}>Go to results</Button>
      ) : (
        <>
          <Box display='flex' alignItems='center' flexGrow={1} gap={1}>
            <Button variant='contained' onClick={() => handleNext()}>
              Next
            </Button>

            <Typography variant="body2" sx={{ color: vars.grey400 }}>
              or press Enter
            </Typography>
          </Box>
          <Button onClick={() => handleNext()}>
            Skip
          </Button>
        </>
      )}
    </Box>
  );
}
