import * as React from 'react';
import { styled } from '@mui/material/styles';
import Radio, { type RadioProps } from '@mui/material/Radio';
import CustomFormControlLabel from "./CustomFormControlLabel";
import { vars } from '../../theme/variables.js'

const {
  checkboxBorderColor,
  primary50,
  primary600
} = vars;

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
    outline: `0.125rem auto ${primary50}`,
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: primary50,
    boxShadow: `inset 0 0 0 0.0625rem ${primary600}, inset 0 -0.0625rem 0 ${primary600}`,
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background: checkboxBorderColor,
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: primary50,
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  boxShadow: `inset 0 0 0 1px ${primary600}, inset 0 -1px 0 ${primary600}`,
  '&:before': {
    display: 'block',
    width: 20,
    height: 20,
    backgroundImage: 'radial-gradient(#0BA47D,#0BA47D 28%,transparent 32%)',
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: primary50,
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
