import React, { useState, useEffect } from 'react'
import { useFilterContext } from '../context/Context'

//components
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Filters from "../components/Filters";
import SortWidget from '../components/widgets/Sort';
import RepositoryCard from '../components/RepositoryCard';
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';
import { vars } from '../theme/variables';
import { useResponsive } from '../hooks/useResponsive';
import { Button, Fade, IconButton } from '@mui/material';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import EmptyResultsLayout from '../components/EmptyResultsLayout';
import { isTopMatch } from '../utils/helpers';
const { success500 } = vars;

const SCROLL_BOTTOM_SPACE = 100;

const styles = {
  noResultsText: {
    textAlign: 'center',
    marginTop: '1.5rem'
  },
  generalistLink: {
    fontWeight: 'bold',
    textDecoration: 'underline',
    textAlign: 'center',
    cursor: 'pointer',
    marginTop: '0.75rem',
    marginBottom: '5rem',
    color: success500
  },
  generalistContainer: {
    marginTop: '4rem'
  },
  learnMoreBox: {
    background: vars.grey25,
    borderRadius: '0.75rem',
    padding: 2
  },
  scrollOverlay: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 87.69%)',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10rem',
    pointerEvents: 'none',
    gap: 2,
    color: vars.grey900
  },
  scrollButton: {
    backgroundColor: 'white',
    border: `1px solid ${vars.grey200}`,
    boxShadow: '0 4px 8px -2px rgba(16, 24, 40, 0.10), 0 2px 4px -2px rgba(16, 24, 40, 0.06)',
    color: vars.grey900
  },
  bounceAnimation: {
    animation: 'bounce 2s infinite',
    '@keyframes bounce': {
      '0%, 20%, 50%, 80%, 100%': {
        transform: 'translateY(0)',
      },
      '40%': {
        transform: 'translateY(8px)',
      },
      '60%': {
        transform: 'translateY(8px)',
      },
    },
  }
};

const RepositoriesList = () => {
  const [showGeneralist, setShowGeneralist] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [hasScroll, setHasScroll] = useState(false);
  const { context } = useFilterContext();
  const { screenSize } = useResponsive();
  const repos = context.results;
  const reposListRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showGeneralist) {
      setShowGeneralist(false);
    }
  }, [context.filterValues, context.results, showGeneralist]);

  // Scroll to top when component mounts or when results change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  // Handle scroll to detect bottom of page and track if user has scrolled
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // Check if repos list container has content that requires scrolling
      // We measure from the top of the repos list to the bottom of the page
      if (reposListRef.current) {
        const reposListTop = reposListRef.current.getBoundingClientRect().top + scrollTop;
        const reposListHeight = reposListRef.current.scrollHeight;
        const availableHeight = windowHeight - (reposListTop - scrollTop);

        // Only show scroll indicator if repos list content exceeds available viewport space
        setHasScroll(reposListHeight > availableHeight);
      } else {
        // Fallback to page-level check if ref is not available
        setHasScroll(documentHeight > windowHeight);
      }

      // Check if user has scrolled away from top or is back at top
      if (scrollTop > 0) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }

      // Check if user is within 100px of the bottom
      const isNearBottom = windowHeight + scrollTop >= documentHeight - SCROLL_BOTTOM_SPACE;
      setIsAtBottom(isNearBottom);
    };

    window.addEventListener('scroll', handleScroll);

    // Delay the initial check to ensure DOM is fully rendered
    const timeoutId = setTimeout(() => {
      handleScroll();
    }, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [repos.length]);
  return (
    <>
      <Grid container spacing={screenSize === 'tooSmall' ? 2 : 4} height={'100%'}>
        <Grid xs={8} sm={6} md={8} lg={8} item height={'100%'}>
          <Stack direction='row' justifyContent='space-between' alignItems='center' mb={2} gap={2} flexWrap="wrap" width={'100%'}>
            <Typography variant='h2'>
              <Typography component="span" variant='h2' color={vars.primary800}>{repos.length} repositories</Typography> {" "}
              matching your criteria
            </Typography>
            <SortWidget />
          </Stack>
          <Grid container ref={reposListRef}>
            {
              repos.length > 0
                ? <Stack spacing={2} width={'100%'}>
                  {repos.map((repository, index) =>
                    <Grid item key={index} xs={12} justifyContent='flex-end'>
                      <RepositoryCard resultIndex={index} key={repository.code} repository={repository} isBestMatch={isTopMatch(repository, index, repos)} />
                    </Grid>
                  )}
                </Stack>
                : <Grid item xs={12}>
                  <EmptyResultsLayout />
                </Grid>
            }
          </Grid>
        </Grid>
        <Grid xs={4} sm={6} md={4} lg={4} item>
          <Stack spacing={2} width={'100%'}>
            <Filters />
            <Box sx={styles.learnMoreBox}>
              <Stack spacing={2} alignItems='flex-start'>
                <Typography variant='h4' fontWeight={600}>Looking for tutorials?</Typography>
                <Typography variant='body2'>Check out a quick step-by-step walkthrough of the dkNET Repository Finder.</Typography>
                <Button component="a" target='_blank' href="https://dknet.org/about/repository_finder" variant="text" sx={{
                  padding: 0,
                }}>See how it works</Button>
              </Stack>
            </Box>
          </Stack>
        </Grid>
      </Grid>

      {repos.length > 0 && <Fade in={!isAtBottom && !hasScrolled && hasScroll} timeout={300}>
        <Box
          sx={styles.scrollOverlay}
        >
          <Typography
            variant="h2"
          >
            Scroll to explore
          </Typography>
          <IconButton sx={styles.scrollButton}>
            <KeyboardArrowDownRoundedIcon
              color="inherit"
              sx={styles.bounceAnimation}
            />
          </IconButton>
        </Box>
      </Fade>}
    </>
  )
}
export default RepositoriesList;
