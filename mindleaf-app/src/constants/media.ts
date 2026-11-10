/**
 * Media Constants
 * Cloudinary and media-related configuration constants
 */

// Cloudinary configuration
export const CLOUDINARY_CLOUD_NAME = 'mindleaf'
export const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload`

// Share card transformation preset name
export const SHARE_CARD_PRESET = 'share_card'

// Share card dimensions
export const SHARE_CARD = {
  width: 1080,
  height: 1080,
} as const

// Media configuration
export const media = {
  cloudName: CLOUDINARY_CLOUD_NAME,
  baseUrl: CLOUDINARY_BASE_URL,
  shareCardPreset: SHARE_CARD_PRESET,
  shareCardDimensions: SHARE_CARD,
}

export type Media = typeof media