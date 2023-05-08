import React, { useEffect, useState } from "react";

//components
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import CustomFormControlLabel from "./CustomFormControlLabel";
import { useFilterContext, useFilterUpdateContext } from "../../context/Context";

const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: 6,
  width: 20,
  height: 20,
  boxShadow:'inset 0 0 0 1px #D0D5DD, inset 0 -1px 0 #D0D5DD',

  '.Mui-focusVisible &': {
    outline: '2px auto #D1F2DF',
    outlineOffset: 2,
  },
  '.Mui-checked &': {
    boxShadow:'inset 0 0 0 1px #0BA47D, inset 0 -1px 0 #0BA47D',

  },

  'input:disabled ~ &': {
    boxShadow: 'none',
    background: '#D0D5DD',
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: '#D1F2DF',
  '&:before': {
    display: 'block',
    width: 16,
    height: 16,
    marginTop: '10%',
    marginRight: 'auto',
    marginLeft: 'auto',
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%230BA47D'/%3E%3C/svg%3E%0A\")",
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: '#D1F2DF',
  },
});

function BpCheckbox(props: CheckboxProps) {
  return (
    <Checkbox
      sx={{
        '&:hover': { bgcolor: 'transparent' },
      }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      inputProps={{ 'aria-label': 'Checkbox demo' }}
      {...props}
    />
  );
}

const CheckBoxWidget = ({ data, filter }: any) => {
  const { context, setContext } = useFilterContext()
  const updateFilter = useFilterUpdateContext()
  const selectedData = context.filterValues[filter.code] || []

  const onChangeCheckbox = (e) => {
    let newValue = null
    if (e.target.checked) {
      newValue = [...selectedData, data]
    } else {
      newValue = selectedData.filter(row => row.code !== e.target.value)
    }
    // updateFilter(newValue, filter)
    setContext({
      ...context,
      filterValues: {
        ...context.filterValues,
        [filter.code]: newValue
      }
    })
  }

  const checked = selectedData.some(row => row.code === data.code)

  return (
    <CustomFormControlLabel
      control={
        <BpCheckbox
          checked={selectedData.some(row => row.code === data.code)}
          value={data.code}
          onChange={onChangeCheckbox}
        />}
      label={<Typography>
        {data.label}
      </Typography>}
      value={undefined}
    />
  );
};

export default CheckBoxWidget;
