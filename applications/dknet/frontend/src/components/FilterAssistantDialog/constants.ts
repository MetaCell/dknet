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
  SINGLE: 'SINGLE'
} as const;

export const CSS_CLASSES = {
  CHECKED_STATE: 'checked-state'
} as const;

export const KEYBOARD_KEYS = {
  ENTER: 'Enter'
} as const;

export const GRID_COLUMNS = {
  2: 'repeat(2, 1fr)',
  3: 'repeat(3, 1fr)',
  4: 'repeat(4, 1fr)',
  1: 'repeat(1, 1fr)'
} as const;

export const RESPONSIVE_CONFIGS = {
  tablet: {
    sidebarWidth: '19rem',
    showPreviewByDefault: true,
    previewWidth: '24rem',
    questionMaxWidth: '38rem',
    gridCols: { 2: GRID_COLUMNS[2], 3: GRID_COLUMNS[2], 4: GRID_COLUMNS[2] }
  },
  laptop: {
    sidebarWidth: '20rem',
    showPreviewByDefault: true,
    previewWidth: '25rem',
    questionMaxWidth: '40rem',
    gridCols: { 2: GRID_COLUMNS[2], 3: GRID_COLUMNS[3], 4: GRID_COLUMNS[2] }
  },
  smallDesktop: {
    sidebarWidth: '21rem',
    showPreviewByDefault: true,
    previewWidth: '26rem',
    questionMaxWidth: '42rem',
    gridCols: { 2: GRID_COLUMNS[2], 3: GRID_COLUMNS[3], 4: GRID_COLUMNS[4] }
  },
  desktop: {
    sidebarWidth: '22rem',
    showPreviewByDefault: true,
    previewWidth: '28rem',
    questionMaxWidth: '45rem',
    gridCols: { 2: GRID_COLUMNS[2], 3: GRID_COLUMNS[3], 4: GRID_COLUMNS[4] }
  },
  tooSmall: {
    sidebarWidth: '18rem',
    showPreviewByDefault: false,
    previewWidth: '20rem',
    questionMaxWidth: '30rem',
    gridCols: { 2: GRID_COLUMNS[1], 3: GRID_COLUMNS[1], 4: GRID_COLUMNS[1] }
  },
  default: {
    sidebarWidth: '20rem',
    showPreviewByDefault: true,
    previewWidth: '25rem',
    questionMaxWidth: '40rem',
    gridCols: { 2: GRID_COLUMNS[2], 3: GRID_COLUMNS[3], 4: GRID_COLUMNS[4] }
  }
} as const;