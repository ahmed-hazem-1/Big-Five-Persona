import { ReactNode } from 'react';
import { useAssessmentStore } from '../store/useAssessmentStore';
import { useI18nStore } from '../store/useI18nStore';
import { getTranslation } from '../data/translations';
import { LanguageSwitcher } from './LanguageSwitcher';

export function TopNav({ children }: { children?: ReactNode }) {
  const resetAssessment = useAssessmentStore((state) => state.resetAssessment);
  const { language } = useI18nStore();
  const t = getTranslation(language);

  return (
    <div className="fixed top-0 left-0 right-0 h-16 z-50 flex items-center justify-center px-4 sm:px-6 pt-3">
      <div className="w-[80%] h-full bg-slate-50/40 backdrop-blur-md rounded-full border border-slate-200/40 shadow-sm flex items-center justify-between px-4 sm:px-6">
        <button onClick={resetAssessment} className="flex items-center gap-3 hover:opacity-80 transition-opacity flex-shrink-0 cursor-pointer border-none bg-transparent p-0">
          <img src="/Big%20Five.png" alt="App Logo" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
          <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-800 hidden sm:block">
            OCEAN<span className="text-blue-900 italic">.ai</span>
          </span>
        </button>

        {children && (
          <div className="flex-1 flex justify-center px-4">
              {children}
          </div>
        )}

        <div className="flex-shrink-0">
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
}
