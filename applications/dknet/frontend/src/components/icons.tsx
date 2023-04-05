import * as React from "react";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

export const FeaturedIcon = (props: SvgIconProps) => (
  <SvgIcon width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <rect x="0.5" y="0.5" width="23" height="23" rx="3.5" fill="white"/>
    <path d="M15 8H9C8.45 8 8 8.45 8 9V15C8 15.55 8.45 16 9 16H15C15.55 16 16 15.55 16 15V9C16 8.45 15.55 8 15 8ZM15 15H9V9H15V15Z" 
      fill="#344054"/>
    <rect x="0.5" y="0.5" width="23" height="23" rx="3.5" stroke="#EAECF0"/>
  </SvgIcon>
);

export const FeaturedIconChecked = (props: SvgIconProps) => (
  <SvgIcon width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <rect x="0.5" y="0.5" width="23" height="23" rx="3.5" fill="#0BA47D"/>
    <path d="M15 8H9C8.45 8 8 8.45 8 9V15C8 15.55 8.45 16 9 16H15C15.55 16 16 15.55 16 15V9C16 8.45 15.55 8 15 8ZM15 15H9V9H15V15Z" 
      fill="white"/>
    <rect x="0.5" y="0.5" width="23" height="23" rx="3.5" stroke="#0BA47D"/>
  </SvgIcon>
)