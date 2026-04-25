import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'en' | 'ar' | 'ar-EG';

interface I18nState {
  language: Language;
  setLanguage: (lang: Language) => void;
  dir: 'ltr' | 'rtl';
}

export const useI18nStore = create<I18nState>()(
  persist(
    (set) => ({
      language: 'en',
      dir: 'ltr',
      setLanguage: (lang) => {
        const dir = lang.startsWith('ar') ? 'rtl' : 'ltr';
        if (typeof document !== 'undefined') {
          document.documentElement.dir = dir;
          document.documentElement.lang = lang;
        }
        set({ language: lang, dir });
      },
    }),
    {
      name: 'ocean-i18n-storage',
      onRehydrateStorage: () => (state) => {
        if (state && typeof document !== 'undefined') {
          document.documentElement.dir = state.dir;
          document.documentElement.lang = state.language;
        }
      }
    }
  )
);
