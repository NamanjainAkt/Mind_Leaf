import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandMMKVStorage } from '../lib/mmkv';

export type ReaderTheme = 'light' | 'dark' | 'sepia';
export type AppTheme = 'light' | 'dark' | 'system';

interface ThemeState {
  readerTheme: ReaderTheme;
  activeTheme: AppTheme;
}

interface ThemeActions {
  setReaderTheme: (theme: ReaderTheme) => void;
  setActiveTheme: (theme: AppTheme) => void;
}

type ThemeStore = ThemeState & ThemeActions;

const initialState: ThemeState = {
  readerTheme: 'light',
  activeTheme: 'system',
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      ...initialState,

      setReaderTheme: (readerTheme: ReaderTheme) => set({ readerTheme }),

      setActiveTheme: (activeTheme: AppTheme) => set({ activeTheme }),
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => zustandMMKVStorage),
    }
  )
);

// Selectors
export const selectReaderTheme = (state: ThemeStore) => state.readerTheme;
export const selectActiveTheme = (state: ThemeStore) => state.activeTheme;
