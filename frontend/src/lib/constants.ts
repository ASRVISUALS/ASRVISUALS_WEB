/**
 * 🎨 Brand Theme Configuration
 * CreatorFlow Color System & Design Tokens
 */

// 🔴 Primary Brand Colors
export const COLORS = {
  // Light Backgrounds
  bg: {
    primary: '#FFFFFF',
    secondary: '#F5F5F7',
    tertiary: '#EFEFEF',
  },

  // Brand Red Accent (Refined)
  red: {
    main: '#D90429',
    hover: '#B8031F',
    light: '#E63451',
  },

  // Neutral Colors
  text: {
    primary: '#1A1A1A',
    secondary: '#666666',
  },

  // Borders & Dividers
  border: '#E0E0E0',

  // Card Background
  card: '#F5F5F7',
};

// 🔤 Font System
export const FONTS = {
  heading: {
    family: '"Neue Montreal", "Manrope", sans-serif',
    weight: {
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
  },
  body: {
    family: '"Manrope", system-ui, sans-serif',
    weight: {
      regular: 400,
      medium: 500,
      semibold: 600,
    },
  },
  accent: {
    family: '"Montserrat", "Poppins", sans-serif',
    letterSpacing: '0.015em',
    textTransform: 'uppercase' as const,
  },
};

// 📐 Spacing & Layout
export const SPACING = {
  xs: '8px',
  sm: '12px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
};

// 🎯 Border Radius
export const BORDER_RADIUS = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
};

// 💫 Shadows
export const SHADOWS = {
  soft: '0 4px 12px rgba(0, 0, 0, 0.3)',
  medium: '0 12px 24px rgba(0, 0, 0, 0.4)',
  redGlow: '0 0 20px rgba(225, 6, 0, 0.4)',
  redGlowLg: '0 0 40px rgba(225, 6, 0, 0.6)',
  cardLift: '0 8px 32px rgba(0, 0, 0, 0.5)',
};

// ⏱️ Transitions
export const TRANSITIONS = {
  FAST: '150ms ease-in-out',
  NORMAL: '300ms ease-in-out',
  SLOW: '500ms ease-in-out',
};

// 🎨 Utility Color Functions
export const getRedGlowStyle = (intensity: 'normal' | 'strong' = 'normal') => ({
  boxShadow: intensity === 'strong' ? SHADOWS.redGlowLg : SHADOWS.redGlow,
  transition: `all ${TRANSITIONS.NORMAL}`,
});

export const getCardHoverStyle = () => ({
  boxShadow: SHADOWS.cardLift,
  transform: 'translateY(-4px)',
  transition: `all ${TRANSITIONS.NORMAL}`,
});

/**
 * 👉 Design System Rules:
 * 
 * 1. Use red ONLY for:
 *    - Buttons & CTAs
 *    - Links & interactive elements
 *    - Small highlights & accents
 *    - Never full background fills
 * 
 * 2. Layout & Spacing:
 *    - Use large spacing (lg: 24px, xl: 32px)
 *    - Minimal icons
 *    - No heavy gradients
 *    - Subtle shadows only
 * 
 * 3. Rounded Corners:
 *    - Use 12px-16px (md-lg)
 *    - Never sharp corners
 * 
 * 4. Section Backgrounds:
 *    - Alternate between #0F0F14 and #16161D
 *    - Creates depth without noise
 * 
 * 5. Hover Effects:
 *    - Buttons: Glow red shadow + slight lift
 *    - Cards: Subtle lift + shadow enhancement
 *    - Links: Color change to hover red
 */
