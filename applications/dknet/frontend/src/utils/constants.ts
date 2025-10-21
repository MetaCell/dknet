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
    homePageImageWidth: '11.25rem',
  },
  laptop: {
    showPreviewByDefault: false,
    homePageImageWidth: '14.25rem',
  },
  smallDesktop: {
    showPreviewByDefault: true,
    homePageImageWidth: '23.0625rem',
  },
  desktop: {
    showPreviewByDefault: true,
    homePageImageWidth: '23.0625rem',
  },
  default: {
    showPreviewByDefault: false,
    homePageImageWidth: '14.25rem',
  }
} as const;