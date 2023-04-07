import React from 'react';

//components
import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";

//icons
import { FeaturedIcon, FeaturedIconChecked } from './icons';

const BpIcon = styled('span')(() => ({
  borderRadius: 4,
  width: 16,
  height: 16,
  border: `1px solid #D0D5DD`
}));
  
const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: '#F8FDFA',
  border: `1px solid #0BA47D`,
  '&:before': {
    display: 'block',
    width: 16,
    height: 16,
    backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%230BA47D'/%3E%3C/svg%3E\")",
    content: '""',
  },
});

export function MultipleItemsCheckbox(props: CheckboxProps) {
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
export function TwoItemsCheckbox(props: CheckboxProps){
  return (
    <Checkbox
      sx={{ '& .MuiSvgIcon-root': { fill: 'none' } }}
      icon={<FeaturedIcon/>}
      checkedIcon={<FeaturedIconChecked/>}
      {...props}
    />
  )
}
export const checkboxTwoOptions = [
  {
    label: 'Multiple',
    checked: false, 
  },
  {
    label: 'Only one',
    checked: false
  }
]
export const checkboxOptions = [
  {
    label: 'Addiction & HIV',
    checked: false
  },
  {
    label: 'Cancer',
    checked: false
  },
  {
    label: 'Chemistry, chemical biology and biochemistry',
    checked: false
  },
  {
    label: 'Diabetes, Digestive &Kidney Diseases',
    checked: false
  },
  {
    label: 'Enzymology',
    checked: false
  },
  {
    label: 'Fly genetics',
    checked: false
  },
  {
    label: 'Immunology',
    checked: false
  },
  {
    label: 'Influenza',
    checked: false
  },
  {
    label: 'Metabolomics',
    checked: false
  },
  {
    label: 'Microbiome',
    checked: false
  },
  {
    label: 'Mouse genetics', 
    checked: false
  },
  {
    label: 'Neuroscience', 
    checked: false
  },
  {
    label: 'Physiology', 
    checked: false
  },
  {
    label: 'Structural biology', 
    checked: false
  },
  {
    label: 'Zebrafish genetics', 
    checked: false
  },
  {
    label: 'Other', 
    checked: false
  }
]
