import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAssessmentStore } from '../store/useAssessmentStore';
import { useI18nStore } from '../store/useI18nStore';
import { getTranslation } from '../data/translations';
import { Button } from '@/components/ui/button';
import { TopNav } from './TopNav';

export function Landing() {
  const startAssessment = useAssessmentStore((state) => state.startAssessment);
  const { language } = useI18nStore();
  const t = getTranslation(language);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedTrait, setSelectedTrait] = useState<typeof traits[0] | null>(null);

  const traits = [
    { 
      name: 'O', 
      title: t.personas.O.title, 
      persona: t.personas.O.persona,
      desc: t.personas.O.desc, 
      imageSeed: 'Visionary',
      colorClass: 'text-amber-600',
      bgClass: 'bg-amber-50',
      borderClass: 'border-amber-200'
    },
    { 
      name: 'C', 
      title: t.personas.C.title, 
      persona: t.personas.C.persona,
      desc: t.personas.C.desc, 
      imageSeed: 'Organizer',
      colorClass: 'text-emerald-600',
      bgClass: 'bg-emerald-50',
      borderClass: 'border-emerald-200'
    },
    { 
      name: 'E', 
      title: t.personas.E.title, 
      persona: t.personas.E.persona,
      desc: t.personas.E.desc, 
      imageSeed: 'Socialite',
      colorClass: 'text-orange-600',
      bgClass: 'bg-orange-50',
      borderClass: 'border-orange-200'
    },
    { 
      name: 'A', 
      title: t.personas.A.title, 
      persona: t.personas.A.persona,
      desc: t.personas.A.desc, 
      imageSeed: 'Empath',
      colorClass: 'text-rose-600',
      bgClass: 'bg-rose-50',
      borderClass: 'border-rose-200'
    },
    { 
      name: 'N', 
      title: t.personas.N.title, 
      persona: t.personas.N.persona,
      desc: t.personas.N.desc, 
      imageSeed: 'Guardian',
      colorClass: 'text-purple-600',
      bgClass: 'bg-purple-50',
      borderClass: 'border-purple-200'
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % traits.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [traits.length]);

  return (
    <div className="min-h-[100dvh] flex flex-col items-center bg-transparent text-slate-900 font-sans antialiased relative pt-16">
      <TopNav />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-5xl px-4 sm:px-12 mt-8 sm:mt-12 pb-40"
      >
        <div className="text-center space-y-6 px-2 sm:px-0 mb-8 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight sm:leading-tight text-slate-800">
            {t.mapYourPersonality}<br className="hidden sm:block" />{' '}
            {t.with}{' '}
            <span className="text-blue-900">
              {t.bigFiveModel}
            </span>
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            {t.description}
          </p>
        </div>

        {/* 3D Carousel */}
        <div className="relative w-full h-[400px] sm:h-[450px] flex justify-center items-center perspective-[1200px] mt-4 mb-16">
          {traits.map((trait, i) => {
            let diff = i - currentIndex;
            if (diff > 2) diff -= 5;
            if (diff < -2) diff += 5;

            const isCenter = diff === 0;
            const isAdjacent = Math.abs(diff) === 1;

            return (
              <motion.div
                key={trait.name}
                onClick={() => {
                  if (isCenter) {
                    setSelectedTrait(trait);
                  } else {
                    setCurrentIndex(i);
                  }
                }}
                initial={false}
                animate={{
                  x: `${diff * 75}%`,
                  scale: isCenter ? 1 : isAdjacent ? 0.8 : 0.6,
                  rotateY: diff * -20,
                  zIndex: 50 - Math.abs(diff) * 10,
                  opacity: isCenter ? 1 : (isAdjacent ? 0.6 : 0),
                  filter: isCenter ? "blur(0px)" : "blur(4px)"
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} 
                className={`absolute w-[260px] sm:w-[320px] bg-white/85 backdrop-blur-2xl border border-white/60 shadow-2xl shadow-slate-200/40 p-6 sm:p-8 rounded-[2rem] flex flex-col items-center text-center transition-colors hover:bg-white/95 cursor-pointer ${trait.borderClass}`}
              >
                <div className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full ${trait.bgClass} flex items-center justify-center mb-6 overflow-hidden border-4 border-white shadow-md relative`}>
                  <img 
                    src={`https://api.dicebear.com/9.x/notionists/svg?seed=${trait.imageSeed}&backgroundColor=transparent`} 
                    alt={trait.persona}
                    className="absolute inset-0 w-full h-full object-cover object-top scale-110"
                  />
                </div>
                <div className="mb-3">
                  <span className={`text-[11px] sm:text-xs font-bold uppercase tracking-widest ${trait.colorClass}`}>
                    {trait.name} • {trait.title}
                  </span>
                </div>
                <h3 className="font-bold text-slate-800 text-xl sm:text-2xl mb-3">{trait.persona}</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">{trait.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Trait Modal */}
      <AnimatePresence>
        {selectedTrait && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm cursor-pointer"
              onClick={() => setSelectedTrait(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`relative bg-white w-full max-w-sm rounded-[2rem] p-8 flex flex-col items-center text-center shadow-2xl overflow-hidden border-2 ${selectedTrait.borderClass}`}
            >
              <button 
                onClick={() => setSelectedTrait(null)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
              >
                ×
              </button>
              <div className={`w-32 h-32 rounded-full ${selectedTrait.bgClass} flex items-center justify-center mb-6 overflow-hidden border-4 border-white shadow-md relative`}>
                <img 
                  src={`https://api.dicebear.com/9.x/notionists/svg?seed=${selectedTrait.imageSeed}&backgroundColor=transparent`} 
                  alt={selectedTrait.persona}
                  className="absolute inset-0 w-full h-full object-cover object-top scale-110"
                />
              </div>
              <div className="mb-3">
                <span className={`text-xs font-bold uppercase tracking-widest ${selectedTrait.colorClass}`}>
                  {selectedTrait.name} • {selectedTrait.title}
                </span>
              </div>
              <h3 className="font-bold text-slate-800 text-2xl mb-4">{selectedTrait.persona}</h3>
              <p className="text-base text-slate-600 leading-relaxed">{selectedTrait.desc}</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Fixed Start Button Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 pb-6 sm:pb-8 bg-gradient-to-t from-slate-50/90 via-slate-50/70 to-transparent z-50 flex justify-center pointer-events-none">
        <div className="pointer-events-auto w-full flex justify-center">
          <motion.div
            whileTap={{ scale: 0.98 }}
            className="w-full flex justify-center"
          >
            <button 
              onClick={startAssessment}
              className="relative p-[3px] rounded-full overflow-hidden w-[90vw] sm:w-auto shadow-2xl shadow-blue-900/40 group cursor-pointer transition-all duration-200 hover:shadow-blue-900/60 hover:brightness-110"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] aspect-square opacity-90"
                style={{
                  background: 'conic-gradient(from 0deg, transparent 0%, #1e3a8a 20%, #1e40af 40%, #1d4ed8 60%, #1e3a8a 80%, transparent 100%)'
                }}
              />
              <div className="relative bg-slate-900 rounded-full px-8 sm:px-16 py-5 sm:py-6 flex items-center justify-center transition-colors group-hover:bg-slate-800">
                <span className="text-white text-lg sm:text-xl font-bold tracking-wide">
                  {t.startAssessment}
                </span>
              </div>
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
