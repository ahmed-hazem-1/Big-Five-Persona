import { useI18nStore } from '../store/useI18nStore';
import { buttonVariants } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function LanguageSwitcher() {
  const { language, setLanguage } = useI18nStore();

  const handleLanguageChange = (lang: 'en' | 'ar' | 'ar-EG') => {
    setLanguage(lang);
  };

  const getLanguageName = (lang: string) => {
    switch(lang) {
      case 'en': return 'English';
      case 'ar': return 'العربية (الفصحى)';
      case 'ar-EG': return 'العربية (بالمصري)';
      default: return 'English';
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={buttonVariants({ variant: "outline", size: "sm", className: "gap-2 bg-white/80 backdrop-blur-sm border-slate-200 text-slate-700 hover:bg-slate-100/80 cursor-pointer" })}
      >
        <Globe className="w-4 h-4 text-indigo-600" />
        <span className="font-medium">{getLanguageName(language)}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-white border-slate-200 shadow-xl rounded-xl">
        <DropdownMenuItem onClick={() => handleLanguageChange('en')} className={`cursor-pointer font-medium ${language === 'en' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700'}`}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange('ar')} className={`cursor-pointer font-medium ${language === 'ar' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700'}`} dir="rtl">
          العربية (الفصحى)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange('ar-EG')} className={`cursor-pointer font-medium ${language === 'ar-EG' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700'}`} dir="rtl">
          العربية (بالمصري)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
