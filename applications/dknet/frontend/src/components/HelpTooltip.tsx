import React from "react";
import { Tooltip, IconButton, ClickAwayListener } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { vars } from "../theme/variables";

const { grey400 } = vars;

interface HelpTooltipProps {
  description: string;
  isTablet?: boolean;
  isTooSmall?: boolean;
  open?: boolean;
  handleTooltipOpen?: () => void;
  handleTooltipClose?: () => void;
}

const HelpTooltip: React.FC<HelpTooltipProps> = ({
  description,
  isTablet = false,
  isTooSmall = false,
  open = false,
  handleTooltipOpen,
  handleTooltipClose
}) => {
  const isMobile = isTablet || isTooSmall;

  const tooltipContent = (
    <Tooltip
      arrow
      title={description}
      {...(isMobile && {
        onClose: handleTooltipClose,
        open: open,
        disableFocusListener: true,
        disableHoverListener: true,
        disableTouchListener: true,
        slotProps: {
          popper: {
            disablePortal: true,
          },
        },
      })}
    >
      <IconButton
        onClick={isMobile ? handleTooltipOpen : undefined}
        sx={{ height: 'fit-content', p: 0 }}
      >
        <HelpOutlineIcon sx={{ color: grey400 }} />
      </IconButton>
    </Tooltip>
  );

  return isMobile && handleTooltipClose ? (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <div>{tooltipContent}</div>
    </ClickAwayListener>
  ) : tooltipContent;
};

export default HelpTooltip;
