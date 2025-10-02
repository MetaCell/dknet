import { useMemo } from 'react';
import { useResponsive } from './useResponsive';

interface UseSidebarVisibilityProps {
  showPreview: boolean;
}

export const useSidebarVisibility = ({ showPreview }: UseSidebarVisibilityProps) => {
  const { isTablet } = useResponsive();

  const showSidebar = useMemo(() => {
    // On tablet, hide sidebar when preview is shown
    if (isTablet) {
      return !showPreview;
    }
    
    // On other screen sizes, always show sidebar
    return true;
  }, [isTablet, showPreview]);

  return {
    showSidebar
  };
};