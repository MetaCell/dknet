# Responsive Design Implementation

This implementation provides comprehensive responsive design support for the DKNET application across different device types and screen resolutions.

## Screen Breakpoints

The application now supports the following responsive breakpoints:

### 1. **Too Small (< 768px width)**
- **Status**: Application disabled
- **Behavior**: Shows an "UnsupportedScreenSize" component with a message informing users to use a larger device
- **Reasoning**: The complex filtering interface requires minimum screen real estate to function properly

### 2. **Mobile/Tablet (768px - 1024px)**
- **Sidebar Width**: 18rem
- **Preview Panel**: 22rem (hidden by default on mobile)
- **Question Max Width**: 35rem
- **Grid Layout**: 2-column layout for options, even for 3-4 option questions
- **Features**: 
  - Compact button styling
  - Reduced margins and spacing
  - Preview panel can be toggled but starts hidden

### 3. **Tablet/Small Laptop (1024px - 1280px)**
- **Sidebar Width**: 19rem
- **Preview Panel**: 24rem (visible by default)
- **Question Max Width**: 38rem
- **Grid Layout**: Smart grid - 2 cols for 2 options, 3 cols for 3 options, 2 cols for 4+ options
- **Features**:
  - Medium spacing
  - Preview panel visible by default
  - Responsive typography

### 4. **Laptop/Desktop (1280px - 1920px)**
- **Sidebar Width**: 20rem
- **Preview Panel**: 25rem
- **Question Max Width**: 40rem
- **Grid Layout**: Optimal layout - 2, 3, or 4 columns based on option count
- **Features**:
  - Standard spacing and sizing
  - All features visible
  - Full sidebar functionality

### 5. **Large Desktop (1920px+)**
- **Sidebar Width**: 22rem
- **Preview Panel**: 28rem
- **Question Max Width**: 45rem
- **Grid Layout**: Full 4-column layout when appropriate
- **Features**:
  - Increased spacing for better visual hierarchy
  - Larger dialog size (xl instead of lg)
  - Enhanced typography sizing

## Key Features

### ResponsiveWrapper Component
- Wraps the entire application
- Checks screen size and shows unsupported message for screens too small
- Prevents app loading on incompatible devices

### useResponsive Hook
- Provides screen size detection
- Returns current screen category and boolean flags
- Can be used throughout the application for responsive behavior

### Adaptive Layouts
- **Filter Assistant Dialog**: Adjusts sidebar width, question area, and preview panel
- **Repository Cards**: Responsive spacing and margins
- **Repository List**: Changes from sidebar layout to stacked layout on smaller screens
- **Main Layout**: Responsive button sizing and typography

### Typography Scaling
- Headings and text scale appropriately across devices
- Maintains readability on all supported screen sizes

## Implementation Details

### Theme Breakpoints
```typescript
breakpoints: {
  values: {
    xs: 0,
    sm: 768,    // Mobile/tablet
    md: 1024,   // Tablet/small laptop  
    lg: 1280,   // Laptop
    xl: 1920,   // Desktop
  },
}
```

### Responsive Configuration Pattern
Each component that needs responsive behavior implements a `getResponsiveConfig()` function that returns appropriate values based on screen size:

```typescript
const getResponsiveConfig = () => {
  switch (screenSize) {
    case 'mobile': return { /* mobile config */ };
    case 'tablet': return { /* tablet config */ };
    case 'laptop': return { /* laptop config */ };
    case 'desktop': return { /* desktop config */ };
    default: return { /* default fallback */ };
  }
};
```

## Usage

The responsive system is automatically active. Components can use the `useResponsive` hook to access screen size information:

```typescript
import { useResponsive } from './hooks/useResponsive';

const MyComponent = () => {
  const { screenSize, canUseApp, isMobile, isTablet, isLaptop, isDesktop } = useResponsive();
  
  // Use screenSize for conditional logic
  // Use boolean flags for specific checks
};
```

## Future Enhancements

- Additional breakpoints can be easily added
- Individual components can be further customized
- Progressive Web App (PWA) features for mobile devices
- Touch-specific interactions for tablet users
