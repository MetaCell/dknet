import React from "react";

//components
import Radio from '@mui/material/Radio';
import { FormControlLabel } from "@mui/material";
import { useFilterContext } from "../../context/Context";
import Icon from '@mui/material/Icon';

const FilterDialogRadio = ({ data, question }: any) => {
  const { context, setContext } = useFilterContext()
  const selectedData = context.filterValues[question?.code] || {}
  const iconName = data?.icon?.split(' ').join('_').toLowerCase() || ""

  const onChangeCheckbox = (e) => {
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
      control={ <Radio
        checked={selectedData.code === data.code}
        onChange={onChangeCheckbox}
        icon={<Icon>{iconName}</Icon>} checkedIcon={<Icon>{iconName}</Icon>} sx={{ '& .MuiSvgIcon-root': { fill: 'none' } }
        } />}
      label={data?.code}
    />
  );
};

export default FilterDialogRadio;
