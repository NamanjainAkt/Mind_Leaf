/**
 * MindLeaf Typography System
 * Playfair Display for headings, DM Sans for body text
 */

export const heading = {
  h1: {
    fontFamily: 'Playfair Display',
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  h2: {
    fontFamily: 'Playfair Display',
    fontSize: 24,
    fontWeight: '600' as const,
    lineHeight: 32,
    letterSpacing: -0.3,
  },
  h3: {
    fontFamily: 'Playfair Display',
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
    letterSpacing: 0,
  },
}

export const body = {
  bodyLg: {
    fontFamily: 'DM Sans',
    fontSize: 18,
    fontWeight: '400' as const,
    lineHeight: 28,
    letterSpacing: 0.15,
  },
  bodyMd: {
    fontFamily: 'DM Sans',
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  bodySm: {
    fontFamily: 'DM Sans',
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  label: {
    fontFamily: 'DM Sans',
    fontSize: 14,
    fontWeight: '500' as const,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  caption: {
    fontFamily: 'DM Sans',
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
    letterSpacing: 0.2,
  },
}

export const typography = {
  ...heading,
  ...body,
}

export type Typography = typeof typography