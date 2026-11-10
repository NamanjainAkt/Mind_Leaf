import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandMMKVStorage } from '../lib/mmkv';

interface FlashcardProgress {
  bookId: string;
  mastered: string[]; // Array of flashcard IDs
  review: string[];   // Array of flashcard IDs needing review
}

interface FlashcardState {
  flashcardProgress: Record<string, FlashcardProgress>;
}

interface FlashcardActions {
  markMastered: (bookId: string, flashcardId: string) => void;
  markReview: (bookId: string, flashcardId: string) => void;
  removeFromMastered: (bookId: string, flashcardId: string) => void;
  removeFromReview: (bookId: string, flashcardId: string) => void;
  resetProgress: (bookId: string) => void;
  getProgress: (bookId: string) => FlashcardProgress | null;
}

type FlashcardStore = FlashcardState & FlashcardActions;

const initialState: FlashcardState = {
  flashcardProgress: {},
};

export const useFlashcardStore = create<FlashcardStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      markMastered: (bookId: string, flashcardId: string) =>
        set((state) => {
          const bookProgress = state.flashcardProgress[bookId] || {
            bookId,
            mastered: [],
            review: [],
          };

          // Don't add if already mastered
          if (bookProgress.mastered.includes(flashcardId)) {
            return state;
          }

          return {
            flashcardProgress: {
              ...state.flashcardProgress,
              [bookId]: {
                ...bookProgress,
                mastered: [...bookProgress.mastered, flashcardId],
                // Remove from review if present
                review: bookProgress.review.filter((id) => id !== flashcardId),
              },
            },
          };
        }),

      markReview: (bookId: string, flashcardId: string) =>
        set((state) => {
          const bookProgress = state.flashcardProgress[bookId] || {
            bookId,
            mastered: [],
            review: [],
          };

          // Don't add if already in review
          if (bookProgress.review.includes(flashcardId)) {
            return state;
          }

          return {
            flashcardProgress: {
              ...state.flashcardProgress,
              [bookId]: {
                ...bookProgress,
                review: [...bookProgress.review, flashcardId],
                // Remove from mastered if present
                mastered: bookProgress.mastered.filter((id) => id !== flashcardId),
              },
            },
          };
        }),

      removeFromMastered: (bookId: string, flashcardId: string) =>
        set((state) => {
          const bookProgress = state.flashcardProgress[bookId];
          if (!bookProgress) return state;

          return {
            flashcardProgress: {
              ...state.flashcardProgress,
              [bookId]: {
                ...bookProgress,
                mastered: bookProgress.mastered.filter((id) => id !== flashcardId),
              },
            },
          };
        }),

      removeFromReview: (bookId: string, flashcardId: string) =>
        set((state) => {
          const bookProgress = state.flashcardProgress[bookId];
          if (!bookProgress) return state;

          return {
            flashcardProgress: {
              ...state.flashcardProgress,
              [bookId]: {
                ...bookProgress,
                review: bookProgress.review.filter((id) => id !== flashcardId),
              },
            },
          };
        }),

      resetProgress: (bookId: string) =>
        set((state) => {
          const { [bookId]: _, ...rest } = state.flashcardProgress;
          return { flashcardProgress: rest };
        }),

      getProgress: (bookId: string) => {
        return get().flashcardProgress[bookId] || null;
      },
    }),
    {
      name: 'flashcard-storage',
      storage: createJSONStorage(() => zustandMMKVStorage),
    }
  )
);

// Selectors
export const selectFlashcardProgress = (state: FlashcardStore) => state.flashcardProgress;
