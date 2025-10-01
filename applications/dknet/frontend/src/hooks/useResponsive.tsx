import useMediaQuery from '@mui/material/useMediaQuery';

export type ScreenSize = 'mobile' | 'tablet' | 'laptop' | 'desktop' | 'tooSmall';

export const useResponsive = () => {
  // Define breakpoints
  const isTooSmall = useMediaQuery('(max-width:768px)'); // Below tablet
  const isMobile = useMediaQuery('(min-width:768px) and (max-width:1024px)'); // Tablet size
  const isTablet = useMediaQuery('(min-width:1024px) and (max-width:1280px)'); // Small laptop
  const isLaptop = useMediaQuery('(min-width:1280px) and (max-width:1920px)'); // Regular laptop/desktop
  const isDesktop = useMediaQuery('(min-width:1920px)'); // Large desktop
  
  const getScreenSize = (): ScreenSize => {
    if (isTooSmall) {
      return 'tooSmall';
    }
    if (isMobile) {
      return 'mobile';
    }
    if (isTablet) {
      return 'tablet';
    }
    if (isLaptop) {
      return 'laptop';
    }
    if (isDesktop) {
      return 'desktop';
    }
    return 'laptop'; // Default fallback
  };

  const screenSize = getScreenSize();
  
  return {
    screenSize,
    isTooSmall,
    isMobile,
    isTablet,
    isLaptop,
    isDesktop,
    canUseApp: screenSize !== 'tooSmall'
  };
};
