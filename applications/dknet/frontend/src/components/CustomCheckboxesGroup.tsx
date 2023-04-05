import React, {  useState } from "react"

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

import { vars } from "../theme/variables";
import { useFilterContext } from "../context/Context";

const {
  grey700,
  grey400
} = vars;

const CustomCheckboxesGroup = ({ data }) => {
  const { context, setContext } = useFilterContext()
  const [selectedData, setSelectedData] = useState(context.filterValues[data.code] || [])


  const onChangeCheckboxes = (newValue) => {
    setContext({
      ...context,
      filterValues: {
        ...context.filterValues,
        [data.code]: newValue
      }
    })
  }

  return (
    <Box>
      <FormLabel
        component="legend"
        sx={{
          color: grey700
        }}
      >
        <Stack direction="row" alignItems='center'>
          <Typography component='h4'>
            {data.label}
          </Typography>
          <Tooltip title="Help">
            <IconButton>
              <HelpOutlineIcon sx={{
                color: grey400,
              }} />
            </IconButton>
          </Tooltip>
        </Stack>
      </FormLabel>
      <FormGroup>
        {
          data.options.map((row, index) =>
            <CheckBoxWidget
              key={index}
              data={row}
              selectedData={selectedData}
              setSelectedData={setSelectedData}
              onChangeCheckboxes={onChangeCheckboxes}
              filterValues={context.filterValues[data.code]}
            />)
        }
      </FormGroup>
    </Box>
  );
};

export default CustomCheckboxesGroup;
