'use client';

import React, { useState } from 'react';
import { ArrowRight, Layout, Database, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

interface LandingPageProps {
    onStart: (role: 'Frontend' | 'Backend' | 'Fullstack') => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
    const [selectedRole, setSelectedRole] = useState<'Frontend' | 'Backend' | 'Fullstack' | null>(null);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center space-y-12 bg-zinc-950/50">

            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6 max-w-4xl mx-auto"
            >
                <div className="inline-block px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900 text-xs font-bold font-mono text-zinc-400 mb-2">
                    AI INTERVIEW READINESS v1.0
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-4">
                    Are you truly <span className="text-blue-500">job ready?</span>
                </h1>

                <p className="text-xl text-zinc-400 max-w-xl mx-auto leading-relaxed">
                    Verify your engineering readiness with strict metrics. <br />
                    Select your discipline to begin.
                </p>
            </motion.div>

            {/* Role Selection */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="w-full max-w-5xl"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { id: 'Frontend', icon: Layout, desc: "React, CSS, Accessibility" },
                        { id: 'Backend', icon: Database, desc: "System Design, APIs, DBs" },
                        { id: 'Fullstack', icon: Layers, desc: "End-to-End Architecture" }
                    ].map((role) => (
                        <button
                            key={role.id}
                            onClick={() => setSelectedRole(role.id as any)}
                            className={`
                group relative p-8 rounded-2xl border text-left transition-all duration-200
                ${selectedRole === role.id
                                    ? 'bg-blue-600 border-blue-500 shadow-xl shadow-blue-900/20'
                                    : 'bg-zinc-900 border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700'}
              `}
                        >
                            <role.icon className={`w-8 h-8 mb-6 ${selectedRole === role.id ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`} />
                            <div className={`text-2xl font-bold mb-2 ${selectedRole === role.id ? 'text-white' : 'text-zinc-200'}`}>{role.id}</div>
                            <div className={`text-sm font-medium ${selectedRole === role.id ? 'text-blue-100' : 'text-zinc-500'}`}>{role.desc}</div>
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="h-20"
            >
                {selectedRole && (
                    <button
                        onClick={() => onStart(selectedRole)}
                        className="group inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-white bg-blue-600 rounded-full hover:bg-blue-500 transition-all active:scale-95 shadow-lg shadow-blue-900/30"
                    >
                        Start Assessment
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                )}
            </motion.div>

        </div>
    );
}
