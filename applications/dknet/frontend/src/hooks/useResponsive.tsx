import useMediaQuery from '@mui/material/useMediaQuery';

export type ScreenSize = 'tooSmall' | 'tablet' | 'laptop' | 'smallDesktop' | 'desktop';

export const useResponsive = () => {
  // Define breakpoints
  const isTooSmall = useMediaQuery('(max-width:640px)'); // Too small to use app (phones)
  const isTablet = useMediaQuery('(min-width:640px) and (max-width:900px)'); // Tablet (large phones + tablets)
  const isLaptop = useMediaQuery('(min-width:900px) and (max-width:1200px)'); // Laptop (13"-15" laptops)
  const isSmallDesktop = useMediaQuery('(min-width:1200px) and (max-width:1536px)'); // Small desktop/large laptop (16"+ laptops, smaller monitors)
  const isDesktop = useMediaQuery('(min-width:1536px)'); // Desktop (large monitors, 4K+)

  const getScreenSize = (): ScreenSize => {
    if (isTooSmall) {
      return 'tooSmall';
    }
    if (isTablet) {
      return 'tablet';
    }
    if (isLaptop) {
      return 'laptop';
    }
    if (isSmallDesktop) {
      return 'smallDesktop';
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
    isTablet,
    isLaptop,
    isSmallDesktop,
    isDesktop,
    canUseApp: screenSize !== 'tooSmall'
  };
};
