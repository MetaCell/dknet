import React from "react";

//components
import Radio from '@mui/material/Radio';
import { FeaturedIcon, FeaturedIconChecked } from '../../assets/icons';
import { FormControlLabel } from "@mui/material";
import { useFilterContext } from "../../context/Context";


const FilterDialogRadio = ({ data, question }: any) => {
  const { context, setContext } = useFilterContext()
  const selectedData = context.filterValues[question?.code] || {}

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
      name={question?.code}
      value={data?.code}
      control={ <Radio
        checked={selectedData.code === data.code}
        onChange={onChangeCheckbox}
        icon={<FeaturedIcon />} checkedIcon={<FeaturedIconChecked />} sx={{ '& .MuiSvgIcon-root': { fill: 'none' } }
        } />}
      label={data?.code}
    />
  );
};

export default FilterDialogRadio;
