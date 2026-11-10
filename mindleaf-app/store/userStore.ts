import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandMMKVStorage } from '../lib/mmkv';

interface UserState {
  deviceId: string;
  streak: number;
  lastActiveDate: string;
  booksCompleted: number;
  booksInProgress: number;
  theme: 'light' | 'dark' | 'system';
  weeklyGoal: number;
  dailyFlashcardGoal: number;
  hasCompletedOnboarding: boolean;
  selectedBooks: string[];
}

interface UserActions {
  setDeviceId: (deviceId: string) => void;
  incrementStreak: () => void;
  markBookCompleted: () => void;
  incrementBooksInProgress: () => void;
  decrementBooksInProgress: () => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setWeeklyGoal: (goal: number) => void;
  setDailyGoal: (goal: number) => void;
  completeOnboarding: (selectedBooks: string[]) => void;
}

type UserStore = UserState & UserActions;

const initialState: UserState = {
  deviceId: '',
  streak: 0,
  lastActiveDate: '',
  booksCompleted: 0,
  booksInProgress: 0,
  theme: 'system',
  weeklyGoal: 7, // Default: 7 books per week
  dailyFlashcardGoal: 20, // Default: 20 flashcards per day
  hasCompletedOnboarding: false,
  selectedBooks: [],
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      ...initialState,

      setDeviceId: (deviceId: string) => set({ deviceId }),

      incrementStreak: () =>
        set((state) => ({
          streak: state.streak + 1,
          lastActiveDate: new Date().toISOString().split('T')[0],
        })),

      markBookCompleted: () =>
        set((state) => ({
          booksCompleted: state.booksCompleted + 1,
          booksInProgress: Math.max(0, state.booksInProgress - 1),
        })),

      incrementBooksInProgress: () =>
        set((state) => ({
          booksInProgress: state.booksInProgress + 1,
        })),

      decrementBooksInProgress: () =>
        set((state) => ({
          booksInProgress: Math.max(0, state.booksInProgress - 1),
        })),

      setTheme: (theme: 'light' | 'dark' | 'system') => set({ theme }),

      setWeeklyGoal: (weeklyGoal: number) => set({ weeklyGoal }),

      setDailyGoal: (dailyFlashcardGoal: number) => set({ dailyFlashcardGoal }),

      completeOnboarding: (selectedBooks: string[]) =>
        set({
          hasCompletedOnboarding: true,
          selectedBooks,
          booksInProgress: selectedBooks.length,
        }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => zustandMMKVStorage),
    }
  )
);

// Selectors
export const selectStreak = (state: UserStore) => state.streak;
export const selectTheme = (state: UserStore) => state.theme;
export const selectBooksCompleted = (state: UserStore) => state.booksCompleted;
export const selectBooksInProgress = (state: UserStore) => state.booksInProgress;
export const selectWeeklyGoal = (state: UserStore) => state.weeklyGoal;
export const selectDailyFlashcardGoal = (state: UserStore) => state.dailyFlashcardGoal;
