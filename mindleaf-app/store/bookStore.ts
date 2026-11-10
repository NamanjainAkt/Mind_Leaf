import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandMMKVStorage } from '../lib/mmkv';
import type { Book, ReadingProgress } from '../lib/api';

interface BookState {
  books: Book[];
  currentBook: Book | null;
  readingProgress: Record<string, ReadingProgress>;
}

interface BookActions {
  setBooks: (books: Book[]) => void;
  setCurrentBook: (book: Book | null) => void;
  updateReadingProgress: (bookId: string, progress: Partial<ReadingProgress>) => void;
  getReadingProgress: (bookId: string) => ReadingProgress | null;
}

type BookStore = BookState & BookActions;

const initialState: BookState = {
  books: [],
  currentBook: null,
  readingProgress: {},
};

export const useBookStore = create<BookStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setBooks: (books: Book[]) => set({ books }),

      setCurrentBook: (book: Book | null) => set({ currentBook: book }),

      updateReadingProgress: (bookId: string, progress: Partial<ReadingProgress>) =>
        set((state) => {
          const existing = state.readingProgress[bookId];
          const newProgress: ReadingProgress = {
            bookId,
            currentPage: progress.currentPage ?? existing?.currentPage ?? 0,
            totalPages: progress.totalPages ?? existing?.totalPages ?? 0,
            lastReadAt: progress.lastReadAt ?? new Date().toISOString(),
            percentage: progress.percentage ?? existing?.percentage ?? 0,
            ...progress,
          };

          return {
            readingProgress: {
              ...state.readingProgress,
              [bookId]: newProgress,
            },
          };
        }),

      getReadingProgress: (bookId: string) => {
        return get().readingProgress[bookId] || null;
      },
    }),
    {
      name: 'book-storage',
      storage: createJSONStorage(() => zustandMMKVStorage),
    }
  )
);

// Selectors
export const selectBooks = (state: BookStore) => state.books;
export const selectCurrentBook = (state: BookStore) => state.currentBook;
export const selectReadingProgress = (state: BookStore) => state.readingProgress;
