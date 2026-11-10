/**
 * Lesson Store
 * Manages lesson completion state and progress
 */
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { zustandMMKVStorage } from '../lib/mmkv'

/**
 * Lesson type definition
 */
export interface Lesson {
  id: string
  bookId: string
  order: number
  title: string
  keyAction: string
  readTimeMinutes: number
  content?: string
  mediaUrl?: string
  mediaCaption?: string
  isCompleted?: boolean
}

/**
 * Lesson progress state
 */
interface LessonState {
  completedLessons: Record<string, string[]> // bookId -> array of lessonIds
  currentLessonId: string | null
}

/**
 * Lesson actions
 */
interface LessonActions {
  markLessonComplete: (bookId: string, lessonId: string) => void
  markLessonIncomplete: (bookId: string, lessonId: string) => void
  isLessonComplete: (bookId: string, lessonId: string) => boolean
  getCompletedCount: (bookId: string) => number
  setCurrentLesson: (lessonId: string | null) => void
  getCurrentLesson: () => string | null
  resetBookProgress: (bookId: string) => void
}

type LessonStore = LessonState & LessonActions

const initialState: LessonState = {
  completedLessons: {},
  currentLessonId: null,
}

export const useLessonStore = create<LessonStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      markLessonComplete: (bookId: string, lessonId: string) =>
        set((state) => {
          const bookLessons = state.completedLessons[bookId] || []
          if (!bookLessons.includes(lessonId)) {
            return {
              completedLessons: {
                ...state.completedLessons,
                [bookId]: [...bookLessons, lessonId],
              },
            }
          }
          return state
        }),

      markLessonIncomplete: (bookId: string, lessonId: string) =>
        set((state) => {
          const bookLessons = state.completedLessons[bookId] || []
          return {
            completedLessons: {
              ...state.completedLessons,
              [bookId]: bookLessons.filter((id) => id !== lessonId),
            },
          }
        }),

      isLessonComplete: (bookId: string, lessonId: string) => {
        const bookLessons = get().completedLessons[bookId] || []
        return bookLessons.includes(lessonId)
      },

      getCompletedCount: (bookId: string) => {
        const bookLessons = get().completedLessons[bookId] || []
        return bookLessons.length
      },

      setCurrentLesson: (lessonId: string | null) =>
        set({ currentLessonId: lessonId }),

      getCurrentLesson: () => get().currentLessonId,

      resetBookProgress: (bookId: string) =>
        set((state) => {
          const newCompletedLessons = { ...state.completedLessons }
          delete newCompletedLessons[bookId]
          return { completedLessons: newCompletedLessons }
        }),
    }),
    {
      name: 'lesson-storage',
      storage: createJSONStorage(() => zustandMMKVStorage),
    }
  )
)

// Selectors
export const selectCompletedLessons = (bookId: string) => (state: LessonStore) =>
  state.completedLessons[bookId] || []
export const selectCurrentLesson = (state: LessonStore) => state.currentLessonId