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

export const RESPONSIVE_CONFIGS = {
  tablet: {
    sidebarWidth: '19rem',
    showPreviewByDefault: false,
    previewWidth: '24rem',
    questionMaxWidth: '38rem',
  },
  laptop: {
    sidebarWidth: '20rem',
    showPreviewByDefault: true,
    previewWidth: '25rem',
    questionMaxWidth: '40rem',
  },
  smallDesktop: {
    sidebarWidth: '21rem',
    showPreviewByDefault: true,
    previewWidth: '26rem',
    questionMaxWidth: '42rem',
  },
  desktop: {
    sidebarWidth: '22rem',
    showPreviewByDefault: true,
    previewWidth: '28rem',
    questionMaxWidth: '45rem',
  },
  tooSmall: {
    sidebarWidth: '18rem',
    showPreviewByDefault: false,
    previewWidth: '20rem',
    questionMaxWidth: '30rem',
  },
  default: {
    sidebarWidth: '20rem',
    showPreviewByDefault: true,
    previewWidth: '25rem',
    questionMaxWidth: '40rem',
  }
} as const;