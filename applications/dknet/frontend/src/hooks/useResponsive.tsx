import useMediaQuery from '@mui/material/useMediaQuery';
import theme from '../theme/Theme';

export type ScreenSize = 'tooSmall' | 'tablet' | 'laptop' | 'smallDesktop' | 'desktop';

export const useResponsive = () => {
  // Define breakpoints based on MUI default theme
  const isTooSmallWidth = useMediaQuery(theme.breakpoints.down('sm'));
  const isTooSmallHeight = useMediaQuery('(max-height: 600px)');
  const isTooSmall = isTooSmallWidth || isTooSmallHeight;
  // < 600px width or < 600px height → too small (phones)

  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  // 600–899px → tablet

  const isLaptop = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  // 900–1199px → laptops

  const isSmallDesktop = useMediaQuery(theme.breakpoints.between('lg', 'xl'));
  // 1200–1535px → small desktops / large laptops

  const isDesktop = useMediaQuery(theme.breakpoints.up('xl'));
  // ≥ 1536px → big monitors

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
