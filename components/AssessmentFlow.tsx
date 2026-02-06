'use client';

import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Check, Code2, Briefcase, MessageSquare } from 'lucide-react';
import { AssessmentData } from '@/utils/scoring';
import { motion, AnimatePresence } from 'framer-motion';

interface AssessmentFlowProps {
    role: 'Frontend' | 'Backend' | 'Fullstack';
    onComplete: (data: AssessmentData) => void;
}

const STEPS = [
    { id: 'tech', title: 'Technical Proficiency', icon: Code2 },
    { id: 'exp', title: 'Experience & Assets', icon: Briefcase },
    { id: 'comm', title: 'Communication', icon: MessageSquare },
];

export default function AssessmentFlow({ role, onComplete }: AssessmentFlowProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [direction, setDirection] = useState(1);
    const [data, setData] = useState<AssessmentData>({
        techSkillLevel: 50,
        projectsCount: 1,
        resumeReviewed: false,
        mockInterviews: '0',
        communicationConfidence: 50,
        hasPortfolio: false,
        role: role
    });

    const nextStep = () => {
        if (currentStep < STEPS.length - 1) {
            setDirection(1);
            setCurrentStep(prev => prev + 1);
        } else {
            onComplete(data);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setDirection(-1);
            setCurrentStep(prev => prev - 1);
        }
    };

    const updateData = (key: keyof AssessmentData, value: any) => {
        setData(prev => ({ ...prev, [key]: value }));
    };

    const variants = {
        enter: (direction: number) => ({ x: direction > 0 ? 20 : -20, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (direction: number) => ({ x: direction < 0 ? 20 : -20, opacity: 0 })
    };

    return (
        <div className="w-full max-w-3xl mx-auto p-4 flex flex-col items-center justify-center min-h-screen">

            {/* Progress */}
            <div className="w-full mb-8 flex justify-between items-center px-1">
                <span className="text-sm font-bold font-mono text-zinc-500">STEP {currentStep + 1}/{STEPS.length}</span>
                <div className="flex gap-2">
                    {STEPS.map((_, i) => (
                        <div key={i} className={`h-1.5 w-10 rounded-full ${i <= currentStep ? 'bg-blue-500' : 'bg-zinc-800'}`} />
                    ))}
                </div>
            </div>

            {/* Main Card */}
            <div className="w-full clean-card p-8 md:p-12 rounded-2xl min-h-[500px] flex flex-col relative overflow-hidden bg-zinc-900 border-zinc-800 shadow-xl">

                <h2 className="text-2xl font-bold mb-10 text-white flex items-center gap-3">
                    <div className="p-2 bg-zinc-800 rounded-lg">
                        {React.createElement(STEPS[currentStep].icon, { className: "w-6 h-6 text-blue-400" })}
                    </div>
                    {STEPS[currentStep].title}
                </h2>

                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={currentStep}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ type: "spring", stiffness: 300, damping: 30, opacity: { duration: 0.2 } }}
                        className="flex-1 space-y-10"
                    >

                        {currentStep === 0 && (
                            <>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <label className="text-lg font-bold text-zinc-200">{role} Stack Confidence</label>
                                        <span className="font-mono text-xl font-bold text-blue-400">{data.techSkillLevel}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0" max="100"
                                        value={data.techSkillLevel}
                                        onChange={(e) => updateData('techSkillLevel', parseInt(e.target.value))}
                                    />
                                </div>

                                <div className="space-y-4">
                                    <label className="block text-lg font-bold text-zinc-200">
                                        Projects Shipped
                                    </label>
                                    <div className="flex flex-wrap gap-3">
                                        {[0, 1, 2, 3, 4, 5].map((num) => (
                                            <button
                                                key={num}
                                                onClick={() => updateData('projectsCount', num)}
                                                className={`
                        w-14 h-14 rounded-xl text-lg font-bold transition-all border
                        ${data.projectsCount === num || (num === 5 && data.projectsCount > 5)
                                                        ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/20 scale-105'
                                                        : 'clean-btn'}
                      `}
                                            >
                                                {num === 5 ? '5+' : num}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}

                        {currentStep === 1 && (
                            <>
                                <div className="space-y-4">
                                    <label className="block text-lg font-bold text-zinc-200">
                                        Resume Verified by Mentor?
                                    </label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            onClick={() => updateData('resumeReviewed', true)}
                                            className={`p-6 rounded-xl border text-left transition-all
                      ${data.resumeReviewed
                                                    ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                                                    : 'clean-btn'}
                    `}
                                        >
                                            <div className="font-bold text-lg">Yes, Verified</div>
                                            <div className={`text-sm mt-1 ${data.resumeReviewed ? 'text-blue-100' : 'text-zinc-500'}`}>Ready for ATS</div>
                                        </button>
                                        <button
                                            onClick={() => updateData('resumeReviewed', false)}
                                            className={`p-6 rounded-xl border text-left transition-all
                      ${!data.resumeReviewed
                                                    ? 'bg-zinc-800 border-zinc-500 text-white' // Simple active state for negative
                                                    : 'clean-btn'}
                    `}
                                        >
                                            <div className="font-bold text-lg">No / Unsure</div>
                                            <div className="text-sm text-zinc-500 mt-1">Needs review</div>
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="block text-lg font-bold text-zinc-200">
                                        Mock Interviews
                                    </label>
                                    <div className="grid grid-cols-3 gap-4">
                                        {['0', '1-2', '3+'].map((opt) => (
                                            <button
                                                key={opt}
                                                onClick={() => updateData('mockInterviews', opt)}
                                                className={`
                        py-4 rounded-xl text-md font-bold border transition-all
                        ${data.mockInterviews === opt
                                                        ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                                                        : 'clean-btn'}
                      `}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}

                        {currentStep === 2 && (
                            <>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <label className="text-lg font-bold text-zinc-200">Communication Confidence</label>
                                        <span className="font-mono text-xl font-bold text-blue-400">{data.communicationConfidence}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0" max="100"
                                        value={data.communicationConfidence}
                                        onChange={(e) => updateData('communicationConfidence', parseInt(e.target.value))}
                                    />
                                </div>

                                <div className="space-y-4 pt-4">
                                    <label className="block text-lg font-bold text-zinc-200">
                                        Portfolio Status
                                    </label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            onClick={() => updateData('hasPortfolio', true)}
                                            className={`py-6 px-4 rounded-xl border text-md font-bold transition-all
                      ${data.hasPortfolio
                                                    ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                                                    : 'clean-btn'}
                    `}
                                        >
                                            Deployed
                                        </button>
                                        <button
                                            onClick={() => updateData('hasPortfolio', false)}
                                            className={`py-6 px-4 rounded-xl border text-md font-bold transition-all
                      ${!data.hasPortfolio
                                                    ? 'bg-zinc-800 border-zinc-500 text-white'
                                                    : 'clean-btn'}
                    `}
                                        >
                                            In Progress
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}

                    </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex justify-between mt-auto pt-8 border-t border-zinc-800">
                    <button
                        onClick={prevStep}
                        disabled={currentStep === 0}
                        className={`flex items-center text-sm font-bold text-zinc-500 hover:text-white transition-colors ${currentStep === 0 ? 'opacity-0 cursor-default' : 'opacity-100'}`}
                    >
                        BACK
                    </button>

                    <button
                        onClick={nextStep}
                        className="flex items-center text-sm font-bold text-white bg-zinc-800 hover:bg-zinc-700 px-6 py-3 rounded-lg transition-all"
                    >
                        {currentStep === STEPS.length - 1 ? 'FINISH' : 'NEXT'}
                        <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                </div>

            </div>
        </div>
    );
}
