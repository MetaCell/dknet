import { useMemo } from 'react';
import { useResponsive } from './useResponsive';

interface UseSidebarVisibilityProps {
  showPreview: boolean;
}

export const useSidebarVisibility = ({ showPreview }: UseSidebarVisibilityProps) => {
  const { isTablet, isTooSmall, isLaptop } = useResponsive();

  const showSidebar = useMemo(() => {
    // On tablet or too small screens, hide sidebar when preview is shown
    if (isTablet || isTooSmall || isLaptop) {
      return !showPreview;
    }
    
    // On other screen sizes, always show sidebar
    return true;
  }, [isLaptop, isTablet, isTooSmall, showPreview]);

  return {
    showSidebar
  };
};