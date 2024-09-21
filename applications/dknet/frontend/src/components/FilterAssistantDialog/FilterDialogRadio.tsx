import React from "react";

//components
import Radio from '@mui/material/Radio';
import { FormControlLabel } from "@mui/material";
import { useFilterContext } from "../../context/Context";
import Icon from '@mui/material/Icon';
import { vars } from '../../theme/variables';

const {
  white,
  primary600,
  grey700,
  grey200
} = vars

const FilterDialogRadio = ({ data, question }: any) => {
  const { context, setContext } = useFilterContext()
  const selectedData = context.filterValues[question?.code] || {}
  const iconName = data?.icon?.split(' ').join('_').toLowerCase() || ""

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onChangeCheckbox = (_e) => {
    setContext({
      ...context,
      filterValues: {
        ...context.filterValues,
        [question.code]: data
      }
    })
  }

  return (
    <FormControlLabel
      key={data?.code}
      labelPlacement="bottom"
      name={question?.code}
      value={data?.code}
      sx={{
        width: '100%',
        '& .MuiTypography-body1': {
          width: '100%',
          margin: 0,
          textAlign: 'center'
        },
      }}
      control={
        <Radio
          checked={selectedData.code === data.code}
          onChange={onChangeCheckbox}
          icon={<Icon sx={{ color: grey700, fontSize: '0.75rem' }}>{iconName}</Icon>}
          checkedIcon={<Icon sx={{ fontSize: '0.75rem' }}>{iconName}</Icon>}
          sx={{
            border: `0.0625rem solid ${grey200}`,
            padding: '0.3125rem',
            mb: 1,
            borderRadius: '0.25rem',
            '&.Mui-checked': {
              backgroundColor: primary600,
              borderColor: primary600,
              color: white
            },
            '& .MuiSvgIcon-root': { fill: 'none' }
          }}
        />}
      label={data?.label}
    />
  );
};

export default FilterDialogRadio;
