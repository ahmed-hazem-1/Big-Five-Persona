import { motion, AnimatePresence } from 'motion/react';
import { useAssessmentStore } from '../store/useAssessmentStore';
import { useI18nStore } from '../store/useI18nStore';
import { getTranslation } from '../data/translations';
import { questions } from '../data/questions';
import { Button } from '@/components/ui/button';
import { TopNav } from './TopNav';

export function Assessment() {
  const { currentQuestionIndex, answers, setAnswer, nextQuestion, prevQuestion, completeAssessment } = useAssessmentStore();
  const { language, dir } = useI18nStore();
  const t = getTranslation(language);
  
  const question = questions[currentQuestionIndex];
  
  // Guard against fast double-clicks incrementing past the array bounds
  if (!question) {
    return null;
  }

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const currentAnswer = answers[question.id];

  const handleOptionClick = (value: number) => {
    setAnswer(question.id, value);
    setTimeout(() => {
      handleNext();
    }, 300);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      nextQuestion();
    } else {
      completeAssessment();
    }
  };

  const handleSkip = () => {
    handleNext();
  };

  const options = [
    { label: t.options[1], value: 1 },
    { label: t.options[2], value: 2 },
    { label: t.options[3], value: 3 },
    { label: t.options[4], value: 4 },
    { label: t.options[5], value: 5 },
  ];

  const translatedQuestionText = question.text[language] || question.text.en;
  const rtlMargin = dir === 'rtl' ? 'ml-4' : 'mr-4';

  return (
    <div className="min-h-[100dvh] flex flex-col bg-transparent font-sans antialiased text-slate-900 pt-16">
      <TopNav>
        <div className="hidden sm:flex flex-col items-center w-full max-w-xs mx-auto mt-2">
           <div className="w-full h-1.5 bg-slate-200/80 rounded-full flex overflow-hidden" dir="ltr">
               <div 
                 className="h-full bg-blue-900 rounded-full transition-all duration-500 ease-out"
                 style={{ width: `${progress}%` }}
               ></div>
           </div>
        </div>
      </TopNav>

      <div className="flex-1 w-full max-w-3xl mx-auto flex flex-col items-center justify-center p-4 sm:p-6 lg:py-12 relative z-10">
        <div className="w-full flex-1 flex flex-col">
          <div className="text-center mb-8 px-2 mt-auto min-h-[100px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.h1
                key={question.id}
                initial={{ opacity: 0, x: dir === 'rtl' ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
                transition={{ duration: 0.3 }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold leading-relaxed sm:leading-snug text-slate-800 tracking-tight"
              >
                {translatedQuestionText}
              </motion.h1>
            </AnimatePresence>
          </div>

          <div className="flex flex-col gap-2.5 w-full max-w-lg mx-auto mb-10 overflow-hidden relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.35, ease: 'easeOut', staggerChildren: 0.1 }}
                className="flex flex-col gap-2.5 w-full"
              >
                {options.map((opt) => {
                  const isSelected = currentAnswer === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => handleOptionClick(opt.value)}
                      className={`flex flex-col items-center group cursor-pointer border-none focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 rounded-xl sm:rounded-2xl p-3 sm:p-4 w-full transition-all duration-200 text-center
                        ${isSelected 
                          ? 'bg-blue-900 text-white shadow-lg shadow-blue-900/20 scale-[1.02]' 
                          : 'bg-white/70 backdrop-blur-md text-slate-700 hover:bg-white/90 hover:text-blue-950 shadow-sm border border-slate-200 hover:border-blue-300 hover:scale-[1.01]'
                        }`}
                    >
                      <span className={`text-sm sm:text-base font-medium transition-colors ${isSelected ? 'text-white' : ''}`}>
                        {opt.label}
                      </span>
                    </button>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="flex justify-between items-center mt-auto w-full max-w-lg mx-auto pt-4 sm:pt-6 border-t border-slate-200/50">
            <Button 
              variant="ghost" 
              onClick={prevQuestion} 
              disabled={currentQuestionIndex === 0}
              className="text-slate-600 hover:text-slate-800 hover:bg-slate-100/50 font-medium px-4 py-5 rounded-xl text-sm sm:text-base"
            >
              {t.previous}
            </Button>
            <Button 
              variant="ghost" 
              onClick={handleSkip}
              className="text-slate-500 hover:text-blue-900 hover:bg-white/50 font-medium px-4 py-5 rounded-xl text-sm sm:text-base"
            >
              {t.skipQuestion}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
