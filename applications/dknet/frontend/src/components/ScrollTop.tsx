import { Box, Button, Fade, IconButton } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import { TopIcon } from "../assets/icons";
import { vars } from "../theme/variables";
import FiltersAssistantDialog from "./FilterAssistantDialog/FiltersAssistantDialog";
import { useFilterContext } from "../context/Context";

const { primary600 } = vars;

const buttonStyle = {
  borderRadius: '6.25rem',
  border: `0.0625rem solid ${primary600}`,
  background: primary600,
  boxShadow: '0rem 1.25rem 1.5rem -0.25rem rgba(16, 24, 40, 0.08), 0rem 0.5rem 0.5rem -0.25rem rgba(16, 24, 40, 0.03)',
  '&:hover': {
    background: primary600,
  }
}

const scrollTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const ScrollToTop = () => {
  const [open, setOpen] = React.useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const { context } = useFilterContext();
  const { currentView } = context;

  // Track scroll position to show/hide buttons
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // Show buttons when scrolled down, hide when at top
      if (scrollTop > 0) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Check initial position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const showScrollToTop = currentView === "repositories" && hasScrolled;

  const openFilterAssistant = useCallback(() => {
    setOpen(true);
  }, []);

  return (
    <>
      <Fade in={showScrollToTop} timeout={300}>
        <Box sx={{
          position: 'fixed',
          right: '1.5rem',
          bottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          zIndex: 1000,
        }}>
          <Button sx={buttonStyle} variant="contained" onClick={openFilterAssistant}>Open Guided Query</Button>

          <IconButton
            onClick={scrollTop}
            sx={buttonStyle}
          >
            <TopIcon />
          </IconButton>
        </Box>
      </Fade>
      <FiltersAssistantDialog open={open} setOpen={setOpen} />
    </>
  );
};

export default ScrollToTop;
