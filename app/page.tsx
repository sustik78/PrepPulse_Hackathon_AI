'use client';

import React, { useState } from 'react';
import LandingPage from '@/components/LandingPage';
import AssessmentFlow from '@/components/AssessmentFlow';
import ResultsView from '@/components/ResultsView';
import { calculateScore, AssessmentData, ScoreResult } from '@/utils/scoring';

type ViewState = 'landing' | 'assessment' | 'results';

export default function Home() {
  const [view, setView] = useState<ViewState>('landing');
  const [data, setData] = useState<AssessmentData | null>(null);
  const [score, setScore] = useState<ScoreResult | null>(null);
  const [role, setRole] = useState<'Frontend' | 'Backend' | 'Fullstack' | null>(null);

  const handleStart = (selectedRole: 'Frontend' | 'Backend' | 'Fullstack') => {
    setRole(selectedRole);
    setView('assessment');
  };

  const handleComplete = (assessmentData: AssessmentData) => {
    setData(assessmentData);
    const result = calculateScore(assessmentData);
    setScore(result);
    setView('results');
  };

  const handleRestart = () => {
    setData(null);
    setScore(null);
    setRole(null);
    setView('landing');
  };

  return (
    <main className="min-h-screen relative overflow-hidden text-white/90 selection:bg-purple-500/30">

      {view === 'landing' && <LandingPage onStart={handleStart} />}

      {view === 'assessment' && role && (
        <AssessmentFlow role={role} onComplete={handleComplete} />
      )}

      {view === 'results' && score && data && (
        <ResultsView score={score} data={data} onRestart={handleRestart} />
      )}

    </main>
  );
}
