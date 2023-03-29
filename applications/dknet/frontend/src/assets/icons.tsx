import * as React from "react";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

export const LogoIcon = (props: SvgIconProps) => (
  <SvgIcon viewBox="0 0 32 32" width="32" height="32" fill="none" {...props}>
    <path fillRule="evenodd" 
      clipRule="evenodd" 
      d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16345 24.8366 0 16 0C7.16343 0 0 7.16345 0 16C0 24.8366 7.16343 32 16 32ZM20.9914 7.45348C21.2344 6.59044 20.3969 6.08011 19.632 6.62504L8.95449 14.2317C8.12497 14.8226 8.25545 16 9.15049 16H11.9622V15.9782H17.442L12.977 17.5537L11.0086 24.5466C10.7656 25.4096 11.603 25.9199 12.368 25.375L23.0455 17.7684C23.875 17.1774 23.7445 16 22.8495 16H18.5857L20.9914 7.45348Z" 
      fill="#10B881"
    />
  </SvgIcon>
);