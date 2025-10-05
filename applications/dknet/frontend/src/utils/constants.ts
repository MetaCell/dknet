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
    sidebarWidth: '18.75rem',
    showPreviewByDefault: false,
    previewWidth: '20rem',
    questionMaxWidth: '40rem',
  },
  laptop: {
    sidebarWidth: '18.75rem',
    showPreviewByDefault: true,
    previewWidth: '20rem',
    questionMaxWidth: '40rem',
  },
  smallDesktop: {
    sidebarWidth: '18.75rem',
    showPreviewByDefault: true,
    previewWidth: '25rem',
    questionMaxWidth: '42rem',
  },
  desktop: {
    sidebarWidth: '18.75rem',
    showPreviewByDefault: true,
    previewWidth: '25rem',
    questionMaxWidth: '45rem',
  },
  default: {
    sidebarWidth: '18.75rem',
    showPreviewByDefault: true,
    previewWidth: '20rem',
    questionMaxWidth: '40rem',
  }
} as const;