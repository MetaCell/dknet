import React, { useEffect, useState } from "react"
import { useFilterContext } from "../context/Context"

//components
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from "@mui/material/Typography"
import FormGroup from "@mui/material/FormGroup"
import CheckBoxWidget from "./widgets/CheckBox"
import FormLabel from '@mui/material/FormLabel'
import Tooltip from "@mui/material/Tooltip"
import IconButton from "@mui/material/IconButton"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"
import CleaningServicesOutlinedIcon from '@mui/icons-material/CleaningServicesOutlined';

import { vars } from "../theme/variables";

const {
  grey700,
  grey400
} = vars;
const CustomCheckboxesGroup = ({ data }) => {
  const { context, setContext } = useFilterContext()

  const onClearFilter = () => {
    setContext({
      ...context,
      filterValues: {
        ...context.filterValues,
        [data.code]: undefined
      }
    })
  }

  return (
    <Box display='flex' flexDirection='column' gap={1}>
      <FormLabel
        component="legend"
        sx={{
          color: grey700
        }}
      >
        <Stack direction="row" alignItems='center' justifyContent="space-between">
          <Typography component='h4'>
            {data.label}
          </Typography>
          <Stack direction="row">
            <Tooltip title={data.description}>
              <IconButton sx={{ p: '2px' }}>
                <HelpOutlineIcon sx={{
                  color: grey400,
                }} />
              </IconButton>
            </Tooltip>
            <IconButton sx={{ p: '2px' }} onClick={onClearFilter}>
              <CleaningServicesOutlinedIcon sx={{
                color: '#98A2B3'
              }} />
            </IconButton>
          </Stack>
        </Stack>
      </FormLabel>
      <FormGroup>
        {
          data.options.map((row, index) =>
            <CheckBoxWidget
              key={index}
              data={row}
              filter={data}
            />)
        }
      </FormGroup>
    </Box>
  );
};

export default CustomCheckboxesGroup;
