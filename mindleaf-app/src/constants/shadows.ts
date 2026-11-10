/**
 * MindLeaf Shadow System
 */

import { inkLight } from './colors'

export const shadows = {
  sm: {
    shadowColor: inkLight,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: inkLight,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: inkLight,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
}

export type Shadows = typeof shadows