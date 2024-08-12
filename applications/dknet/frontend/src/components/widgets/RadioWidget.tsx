import * as React from 'react';
import { styled } from '@mui/material/styles';
import Radio, { RadioProps } from '@mui/material/Radio';
import CustomFormControlLabel from "./CustomFormControlLabel";

const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: '50%',
  width: 20,
  height: 20,
  boxShadow:'inset 0 0 0 1px #98A2B3, inset 0 -1px 0 #98A2B3',
  backgroundColor: '#fff',
  backgroundImage:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
      : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background:
      theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: '#D1F2DF',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  boxShadow:'inset 0 0 0 1px #0BA47D, inset 0 -1px 0 #0BA47D',
  '&:before': {
    display: 'block',
    width: 20,
    height: 20,
    backgroundImage: 'radial-gradient(#0BA47D,#0BA47D 28%,transparent 32%)',
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: '#D1F2DF',
  },
});

function BpRadio(props: RadioProps) {
  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}

export default function CustomizedRadios({ data }) {
  return (
    <CustomFormControlLabel value={data.code} control={<BpRadio />} label={data?.label} />
  );
}
