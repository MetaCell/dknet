import { useMemo } from 'react';
import { useResponsive } from './useResponsive';
import { RESPONSIVE_CONFIGS } from '../utils/constants';
import { ResponsiveConfig } from '../utils/types';

export const useResponsiveConfig = (): ResponsiveConfig => {
  const { screenSize } = useResponsive();
  
  return useMemo(() => {
    const configKey = screenSize as keyof typeof RESPONSIVE_CONFIGS;
    return RESPONSIVE_CONFIGS[configKey] || RESPONSIVE_CONFIGS.default;
  }, [screenSize]);
};