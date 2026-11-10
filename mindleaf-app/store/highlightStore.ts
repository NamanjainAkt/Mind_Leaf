import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandMMKVStorage } from '../lib/mmkv';

export type HighlightColor = 'yellow' | 'green' | 'blue' | 'pink'

export interface Highlight {
  id: string
  bookId: string
  bookTitle: string
  text: string
  color: HighlightColor
  note?: string
  chapter?: string
  page?: number
  createdAt: string
}

interface HighlightState {
  highlights: Highlight[]
  addHighlight: (highlight: Omit<Highlight, 'id' | 'createdAt'>) => void
  updateHighlightNote: (id: string, note: string) => void
  deleteHighlight: (id: string) => void
  getHighlightsByBook: (bookId: string) => Highlight[]
  getAllHighlights: () => Highlight[]
}

export const useHighlightStore = create<HighlightState>()(
  persist(
    (set, get) => ({
      highlights: [],

      addHighlight: (highlight) =>
        set((state) => ({
          highlights: [
            ...state.highlights,
            {
              ...highlight,
              id: `hl-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              createdAt: new Date().toISOString(),
            },
          ],
        })),

      updateHighlightNote: (id: string, note: string) =>
        set((state) => ({
          highlights: state.highlights.map((h) =>
            h.id === id ? { ...h, note } : h
          ),
        })),

      deleteHighlight: (id: string) =>
        set((state) => ({
          highlights: state.highlights.filter((h) => h.id !== id),
        })),

      getHighlightsByBook: (bookId: string) => {
        return get().highlights.filter((h) => h.bookId === bookId)
      },

      getAllHighlights: () => {
        return get().highlights
      },
    }),
    {
      name: 'highlight-storage',
      storage: createJSONStorage(() => zustandMMKVStorage),
    }
  )
)