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
const { success500 } = vars;

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
  const { context } = useFilterContext();
  const { screenSize } = useResponsive();

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

  // Handle scroll to detect bottom of page
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // Check if user is within 100px of the bottom
      const isNearBottom = windowHeight + scrollTop >= documentHeight - 100;
      setIsAtBottom(isNearBottom);
    };

    window.addEventListener('scroll', handleScroll);

    // Check initial position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Grid container spacing={screenSize === 'tooSmall' ? 2 : 4}>
        <Grid xs={7} md={7} lg={8} item>
          <Grid spacing={2}>
            <Grid item display='flex' justifyContent='flex-end' mb={2}>
              <Grid container direction={'row'} justifyContent='space-between' alignItems='center'>
                <Typography variant='h2'>
                  <Typography component="span" variant='h2' color={vars.primary800}>{context.results.length} repositories</Typography>
                  matching your criteria
                </Typography>
              </Grid>
              <SortWidget />
            </Grid>
            {
              context.results.length > 0
                ? <Stack spacing={2}>
                  {context.results.map((repository, index) =>
                    <Grid item key={index} xs={12} justifyContent='flex-end'>
                      <RepositoryCard resultIndex={index} key={repository.code} repository={repository} isBestMatch={repository.pctMatch === context.results[0].pctMatch} />
                    </Grid>
                  )}
                </Stack>
                : <>
                  <Typography sx={styles.noResultsText} variant='h2'>No results found matching the filters criteria.</Typography>
                  {showGeneralist === false
                    ? <>
                      <Typography
                        onClick={() => setShowGeneralist(true)}
                        sx={styles.generalistLink}
                        variant='h5'>
                        Try one of our generalist repository
                      </Typography>
                    </>
                    : <Stack spacing={2}>
                      {context.allGeneralistRepositories.map((repository, index) =>
                        <Grid sx={styles.generalistContainer} item key={index} xs={12} justifyContent='flex-end'>
                          <RepositoryCard key={repository.code} repository={repository} isBestMatch={false} />
                        </Grid>
                      )}
                    </Stack>
                  }
                </>
            }
          </Grid>
        </Grid>
        <Grid xs={5} md={5} lg={4} item>
          <Stack spacing={2}>
            <Filters />
            <Box sx={styles.learnMoreBox}>
              <Stack spacing={2} alignItems='flex-start'>
                <Typography variant='h4' fontWeight={600}>Want to learn more on how we show you results?</Typography>
                <Typography variant='body2'>Discover the rules and algorithms that show you results that you see.</Typography>
                <Button variant="text">Learn more</Button>
              </Stack>
            </Box>
          </Stack>
        </Grid>
      </Grid>

      {/* Scroll to explore overlay - shows when NOT at bottom, hides when reaching bottom */}
      <Fade in={!isAtBottom} timeout={100}>
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
      </Fade>
    </>
  )
}
export default RepositoriesList;
