import { IconButton } from "@mui/material";
import React from "react";
import { TopIcon } from "../assets/icons";
import { vars } from "../theme/variables";

const { primary600 } = vars;

const scrollTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const ScrollToTop = () => {
  return (
    <IconButton
      onClick={scrollTop}
      sx={{
        borderRadius: '6.25rem',
        position: 'fixed',
        right: '1.5rem',
        bottom: '1.5rem',
        border: `0.0625rem solid ${primary600}`,
        background: primary600,
        boxShadow: '0rem 1.25rem 1.5rem -0.25rem rgba(16, 24, 40, 0.08), 0rem 0.5rem 0.5rem -0.25rem rgba(16, 24, 40, 0.03)',
        '&:hover': {
          background: primary600,
        }
      }}
    >
      <TopIcon />
    </IconButton>
  );
};

export default ScrollToTop;
