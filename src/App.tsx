/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useAssessmentStore } from './store/useAssessmentStore';
import { Landing } from './components/Landing';
import { Assessment } from './components/Assessment';
import { Results } from './components/Results';
import { AnimatedBackground } from './components/AnimatedBackground';

export default function App() {
  const { hasStarted, isComplete } = useAssessmentStore();

  return (
    <div className="min-h-screen text-slate-900 font-sans antialiased overflow-x-hidden relative">
      <AnimatedBackground />
      <div className="relative z-10 min-h-screen">
        {!hasStarted && <Landing />}
        {hasStarted && !isComplete && <Assessment />}
        {hasStarted && isComplete && <Results />}
      </div>
    </div>
  );
}



