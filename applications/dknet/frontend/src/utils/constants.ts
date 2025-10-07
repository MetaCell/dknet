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


export const SIDEBAR_WIDTH = 300; 
export const PREVIEW_WIDTH = 400; 
export const MIN_CONTENT_WIDTH = 640;

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