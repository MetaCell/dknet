// Constants for FilterQuestions component
export const RESPONSIVE_BREAKPOINTS = {
  TABLET: 'tablet',
  LAPTOP: 'laptop',
  SMALL_DESKTOP: 'smallDesktop',
  DESKTOP: 'desktop',
  TOO_SMALL: 'tooSmall'
} as const;

export const INPUT_TYPES = {
  MULTI: 'MULTI',
  SINGLE: 'SINGLE',
  BOOLEAN: 'BOOLEAN',
  HIERARCHY: 'HIERARCHY'
} as const;


export const SIDEBAR_WIDTH = '18.75rem'; 
export const PREVIEW_WIDTH = '25rem'; 
export const MAX_CONTENT_WIDTH = '40rem';

export const RESPONSIVE_CONFIGS = {
  tablet: {
    showPreviewByDefault: false,
  },
  laptop: {
    showPreviewByDefault: true,
  },
  smallDesktop: {
    showPreviewByDefault: true,
  },
  desktop: {
    showPreviewByDefault: true,
  },
  default: {
    showPreviewByDefault: true,
  }
} as const;