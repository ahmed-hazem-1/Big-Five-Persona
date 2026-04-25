import { useMemo } from 'react';
import { motion } from 'motion/react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { useAssessmentStore } from '../store/useAssessmentStore';
import { useI18nStore } from '../store/useI18nStore';
import { getTranslation } from '../data/translations';
import { questions } from '../data/questions';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TopNav } from './TopNav';

export function Results() {
  const { answers, resetAssessment } = useAssessmentStore();
  const { language, dir } = useI18nStore();
  const t = getTranslation(language);

  const resultsData = useMemo(() => {
    // Initialize scores
    const scores: Record<string, number> = { O: 0, C: 0, E: 0, A: 0, N: 0 };
    const maxScores: Record<string, number> = { O: 0, C: 0, E: 0, A: 0, N: 0 };

    questions.forEach(q => {
      const value = answers[q.id] || 3;
      const score = q.key === 1 ? value : (6 - value);
      scores[q.trait] += score;
      maxScores[q.trait] += 5;
    });

    return Object.keys(scores).map(trait => {
        const tr = trait as 'O'|'C'|'E'|'A'|'N';
        return {
        subject: t.personas[tr].title,
        score: scores[tr],
        percentage: Math.round((scores[tr] / maxScores[tr]) * 100),
        fullMark: maxScores[tr],
        traitKey: tr
        }
    });
  }, [answers, t.personas]);

  // Generate a dynamic summary text based on highest/lowest traits
  const sortedTraits = [...resultsData].sort((a, b) => b.percentage - a.percentage);
  const topTrait = sortedTraits[0];
  const lowestTrait = sortedTraits[sortedTraits.length - 1];

  const generateSummary = () => {
    const highText = t.highTexts[topTrait.traitKey as 'O'|'C'|'E'|'A'|'N'];
    const lowText = t.lowTexts[lowestTrait.traitKey as 'O'|'C'|'E'|'A'|'N'];
    
    const part1 = t.resultsSummaryHigh
        .replace('{{subject}}', topTrait.subject)
        .replace('{{percentage}}', String(topTrait.percentage))
        .replace('{{highText}}', highText);
        
    const part2 = t.resultsSummaryLow
        .replace('{{subject}}', lowestTrait.subject)
        .replace('{{percentage}}', String(lowestTrait.percentage))
        .replace('{{lowText}}', lowText);

    return `${part1} ${part2}`;
  };

  return (
    <div className="min-h-screen pb-24 font-sans flex flex-col antialiased text-slate-900 bg-transparent pt-16">
      <TopNav />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 mt-6 sm:mt-10 flex flex-col gap-8">
        
        {/* Header Summary Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] p-8 sm:p-12 border border-white/50 shadow-xl shadow-slate-200/40 flex flex-col md:flex-row items-center gap-8 justify-between relative overflow-hidden">
             
             {/* Decorative Background Elements */}
             <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-900/10 rounded-full blur-3xl" />
             <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl" />

             <div className="flex-1 relative z-10 w-full">
               <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-900 text-sm font-semibold mb-6 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-blue-800 animate-pulse" />
                  {t.resultsTitle}
               </div>
               <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-slate-800 mb-6">
                 Your dominant trait is <span className="text-blue-900">{topTrait.subject}</span>
               </h1>
               <p className="text-slate-600 text-lg sm:text-xl leading-relaxed max-w-2xl font-medium">
                 {generateSummary()}
               </p>
             </div>
             
             <div className="w-full md:w-auto relative z-10 shrink-0 flex flex-col items-center">
                 <div className="w-40 h-40 sm:w-48 sm:h-48 relative flex items-center justify-center bg-white rounded-full shadow-2xl shadow-blue-900/20 border-8 border-slate-50">
                    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full -rotate-90">
                      <circle cx="50" cy="50" r="46" fill="transparent" stroke="#f1f5f9" strokeWidth="8" />
                      <circle cx="50" cy="50" r="46" fill="transparent" stroke="#1e3a8a" strokeWidth="8" strokeDasharray={`${topTrait.percentage * 2.89} 300`} strokeLinecap="round" className="transition-all duration-1000 ease-out" />
                    </svg>
                    <div className="text-center">
                      <div className="text-4xl sm:text-5xl font-black text-slate-800 tracking-tighter" dir="ltr">{topTrait.percentage}%</div>
                      <div className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Match</div>
                    </div>
                 </div>
             </div>
          </div>
        </motion.div>

        {/* Dashboard Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Radar Chart Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="lg:col-span-1 bg-white/70 backdrop-blur-xl border border-white/50 shadow-xl shadow-slate-200/40 rounded-[2rem] p-6 sm:p-8 flex flex-col"
          >
             <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-2 text-center">Trait Distribution</h3>
             <p className="text-xs text-slate-500 text-center mb-6 font-medium">Your OCEAN model shape</p>
             <div className="h-[280px] sm:h-[320px] w-full mt-auto" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="65%" data={resultsData}>
                  <PolarGrid stroke="#e2e8f0" strokeOpacity={0.8} gridType="polygon" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }} className="font-sans" />
                  <PolarRadiusAxis angle={30} domain={[0, 25]} tick={false} stroke="none" />
                  <Radar
                    name="OCEAN"
                    dataKey="score"
                    stroke="#1e3a8a"
                    strokeWidth={3}
                    fill="url(#colorUv)"
                  />
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                </RadarChart>
              </ResponsiveContainer>
             </div>
          </motion.div>

          {/* Cards Grid */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {resultsData.map((data, index) => {
               const descKey = data.percentage >= 60 ? 'high' : 'low';
               const descText = t.traitDescriptions[descKey][data.traitKey as 'O'|'C'|'E'|'A'|'N'];
               const isTop = topTrait.traitKey === data.traitKey;

               return (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  key={data.traitKey} 
                  className={`relative overflow-hidden bg-white/70 backdrop-blur-md rounded-3xl p-6 sm:p-7 shadow-lg shadow-slate-200/40 border transition-all hover:-translate-y-1 hover:shadow-xl ${isTop ? 'border-blue-800 bg-blue-50/50' : 'border-white/60 hover:border-blue-300'}`}
                >
                  {isTop && (
                    <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-100 rounded-full blur-2xl z-0" />
                  )}
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2.5 mb-1">
                          <div className={`w-2.5 h-2.5 rounded-full ${isTop ? 'bg-blue-800' : 'bg-slate-300'}`}></div>
                          <span className="text-base font-bold text-slate-800 tracking-tight">{data.subject}</span>
                        </div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{data.traitKey} Trait</span>
                      </div>
                      <div className="text-right">
                        <span className={`text-2xl sm:text-3xl font-black tracking-tighter block leading-none ${isTop ? 'text-blue-900' : 'text-slate-700'}`} dir="ltr">{data.percentage}%</span>
                      </div>
                    </div>
                    
                    <div className="w-full bg-slate-100 rounded-full h-2 mb-4 overflow-hidden relative">
                       <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: `${data.percentage}%` }}
                         transition={{ delay: 0.8 + index * 0.1, duration: 1, ease: "easeOut" }}
                         className={`absolute top-0 left-0 bottom-0 rounded-full ${isTop ? 'bg-blue-800' : 'bg-slate-400'}`}
                       />
                    </div>
                    
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">
                      {descText}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-4 flex justify-center lg:justify-end"
        >
          <Button 
            onClick={resetAssessment} 
            className="w-full sm:w-auto px-10 py-7 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-lg transition-transform hover:scale-105 shadow-xl shadow-slate-900/20"
          >
            {t.retake}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
