'use client';

import React, { useEffect, useState } from 'react';
import { ScoreResult } from '@/utils/scoring';
import { DetailedFeedback, generateFeedback } from '@/utils/aiFeedback';
import { AssessmentData } from '@/utils/scoring';
import { Share2, Download, ArrowRight, Check, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';

interface ResultsViewProps {
    score: ScoreResult;
    data: AssessmentData;
    onRestart: () => void;
}

export default function ResultsView({ score, data, onRestart }: ResultsViewProps) {
    const [feedback, setFeedback] = useState<DetailedFeedback | null>(null);

    useEffect(() => {
        generateFeedback(data, score).then(setFeedback);
    }, [data, score]);

    useEffect(() => {
        if (feedback && score.totalScore > 50) {
            const duration = 2 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
            const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

            const interval: any = setInterval(function () {
                const timeLeft = animationEnd - Date.now();
                if (timeLeft <= 0) return clearInterval(interval);
                const particleCount = 50 * (timeLeft / duration);
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
            }, 250);
        }
    }, [feedback, score.totalScore]);

    if (!feedback) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <p className="text-gray-500 font-mono text-sm">ANALYZING RESPONSE...</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-5xl mx-auto p-4 md:p-8 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end border-b border-gray-800 pb-8">
                <div>
                    <div className="text-xs font-mono text-gray-500 mb-2">ASSESSMENT REPORT ID: {Math.floor(Math.random() * 10000)}</div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">Readiness Score</h1>
                    <p className="text-gray-400">Track: <span className="text-white font-medium">{data.role}</span></p>
                </div>
                <div className="text-right mt-6 md:mt-0">
                    <div className="text-6xl font-black text-white leading-none">{score.totalScore}</div>
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">{score.level}</div>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <MetricCard label="Technical" value={score.breakdown.technical} max={30} />
                <MetricCard label="Resume" value={score.breakdown.resume} max={20} />
                <MetricCard label="Comm." value={score.breakdown.communication} max={25} />
                <MetricCard label="Portfolio" value={score.breakdown.portfolio} max={25} />
            </div>

            {/* Big Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="clean-card p-6 rounded-lg">
                    <div className="text-xs font-bold text-gray-500 uppercase mb-1">Estimated Timeline</div>
                    <div className="text-2xl font-bold text-white">{feedback.timeline}</div>
                </div>
                <div className="clean-card p-6 rounded-lg">
                    <div className="text-xs font-bold text-gray-500 uppercase mb-1">Priority Focus</div>
                    <div className="text-xl font-medium text-white">{feedback.weekPlan[0]}</div>
                </div>
            </div>

            {/* Detailed Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Strengths & Weaknesses */}
                <div className="md:col-span-2 space-y-8">
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4 border-l-2 border-white pl-3">Key Strengths</h3>
                        <ul className="space-y-3">
                            {feedback.strengths.map((s, i) => (
                                <li key={i} className="flex items-start text-gray-300">
                                    <Check className="w-5 h-5 mr-3 text-white flex-shrink-0" />
                                    {s}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-white mb-4 border-l-2 border-gray-700 pl-3">Areas to Improve</h3>
                        <ul className="space-y-3">
                            {feedback.gaps.map((g, i) => (
                                <li key={i} className="flex items-start text-gray-400">
                                    <X className="w-5 h-5 mr-3 text-gray-600 flex-shrink-0" />
                                    {g}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Action Plan */}
                <div className="clean-card p-6 rounded-xl h-full flex flex-col">
                    <h3 className="text-lg font-bold text-white mb-6">Action Plan</h3>
                    <div className="space-y-6 flex-1">
                        {feedback.actions.map((action, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs ring-4 ring-black">
                                    {i + 1}
                                </div>
                                <p className="text-gray-300 text-sm leading-relaxed">{action}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-800 space-y-3">
                        <button className="w-full py-3 rounded-lg border border-gray-700 hover:bg-white hover:text-black hover:border-white transition-all text-sm font-bold flex items-center justify-center">
                            <Download className="w-4 h-4 mr-2" /> Export PDF
                        </button>
                        <button className="w-full py-3 rounded-lg bg-white text-black hover:bg-gray-200 transition-all text-sm font-bold flex items-center justify-center">
                            <Share2 className="w-4 h-4 mr-2" /> Share Result
                        </button>
                    </div>
                </div>

            </div>

            <div className="flex justify-center pt-8 border-t border-gray-900">
                <button
                    onClick={onRestart}
                    className="text-sm font-medium text-gray-500 hover:text-white transition-colors uppercase tracking-widest"
                >
                    Start New Assessment
                </button>
            </div>

        </div>
    );
}

function MetricCard({ label, value, max }: { label: string, value: number, max: number }) {
    return (
        <div className="clean-card p-5 rounded-lg">
            <div className="flex justify-between items-end mb-2">
                <span className="text-xs font-bold text-gray-500 uppercase">{label}</span>
                <span className="text-2xl font-bold text-white leading-none">{value}</span>
            </div>
            <div className="w-full bg-gray-900 h-1 rounded-full overflow-hidden">
                <div className="bg-white h-full" style={{ width: `${(value / max) * 100}%` }} />
            </div>
        </div>
    )
}
