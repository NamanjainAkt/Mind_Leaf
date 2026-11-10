/**
 * MindLeaf Color System
 * Based on orchestrator design specifications
 */

// Brand Colors
export const ink = '#1A1A2E'
export const inkLight = '#2D2D44'
export const parchment = '#FAF7F2'
export const parchmentDark = '#F0EBE3'

// Accent Colors
export const gold = '#C9A84C'
export const goldLight = '#F0D98A'
export const sage = '#4A7C59'
export const clay = '#C4673A'

// Reader Theme Colors
export const readerTheme = {
  light: {
    background: parchment,
    text: ink,
    muted: '#6B6B7B',
    border: '#E8E4DD',
  },
  dark: {
    background: ink,
    text: parchment,
    muted: '#9A9AAF',
    border: '#3D3D5C',
  },
  sepia: {
    background: '#F5EFE0',
    text: '#3D3426',
    muted: '#7A7060',
    border: '#DDD5C0',
  },
}

// Highlight Colors for annotations
export const highlight = {
  yellow: '#FFF9C4',
  green: '#C8E6C9',
  blue: '#BBDEFB',
  pink: '#F8BBD9',
}

// Tag Category Colors
export const tagColors = {
  systems: '#4A7C59',      // sage - systems thinking
  mindset: '#C9A84C',      // gold - mindset
  focus: '#1A1A2E',        // ink - focus
  philosophy: '#8B7355',   // warm brown - philosophy
  stoicism: '#6B7280',      // gray - stoicism
  strategy: '#2D2D44',     // inkLight - strategy
  cognition: '#4A5568',   // slate - cognition
  discipline: '#C4673A',  // clay - discipline
  wealth: '#065F46',      // deep green - wealth
  purpose: '#7C3AED',      // purple - purpose
}

export const colors = {
  ink,
  inkLight,
  parchment,
  parchmentDark,
  gold,
  goldLight,
  sage,
  clay,
  readerTheme,
  highlight,
  tagColors,
}

export type Colors = typeof colors