import React from "react";

//components
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import { styled } from "@mui/material/styles";
import CustomFormControlLabel from "./CustomFormControlLabel";
import { useFilterContext } from "../../context/Context";
import { vars } from '../../theme/variables';
import { isFiltersEmpty } from '../../utils/helpers';

const {
  checkboxBorderColor,
  primary50,
  primary600
} = vars;

const BpIcon = styled('span')(() => ({
  borderRadius: 6,
  width: 20,
  height: 20,
  boxShadow: `inset 0 0 0 0.0625rem ${checkboxBorderColor}, inset 0 -1px 0 ${checkboxBorderColor}`,

  'input:hover ~ &': {
    backgroundColor: primary50,
    boxShadow: `inset 0 0 0 0.0625rem ${primary600}, inset 0 -0.0625rem 0 ${primary600}`,
  },

  '.Mui-focusVisible &': {
    outline: `0.125rem auto ${primary50}`,
    outlineOffset: 2,
  },
  '.Mui-checked &': {
    boxShadow: `inset 0 0 0 0.0625rem ${primary600}, inset 0 -0.0625rem 0 ${primary600}`,

  },

  'input:disabled ~ &': {
    boxShadow: 'none',
    background: checkboxBorderColor,
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: primary50,
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
    backgroundColor: primary50,
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
  const selectedData = context.filterValues[filter.code] || []

  const onChangeCheckbox = (e) => {
    let newValue = null
    if (e.target.checked) {
      newValue = [...selectedData, data]
    } else {
      newValue = selectedData.filter(row => row.code !== e.target.value)
    }

    // Check if this will be the last filter being removed
    const updatedFilterValues = {
      ...context.filterValues,
      [filter.code]: newValue.length !== 0 ? newValue : undefined
    }
    const willBeEmpty = isFiltersEmpty(updatedFilterValues)

    setContext({
      ...context,
      showAll: willBeEmpty,
      filterValues: updatedFilterValues
    })
  }

  return (
    <CustomFormControlLabel
      control={
        <BpCheckbox
          checked={selectedData.some(row => row.code === data.code)}
          value={data.code}
          onChange={onChangeCheckbox}
        />}
      label={data.label}
      value={undefined}
    />
  );
};

export default CheckBoxWidget;
