import React from 'react';
import { useResponsive } from '../hooks/useResponsive';
import UnsupportedScreenSize from './UnsupportedScreenSize';

interface ResponsiveWrapperProps {
  children: React.ReactNode;
}

const ResponsiveWrapper: React.FC<ResponsiveWrapperProps> = ({ children }) => {
  const { canUseApp } = useResponsive();

  if (!canUseApp) {
    return <UnsupportedScreenSize />;
  }

  return <>{children}</>;
};

export default ResponsiveWrapper;
