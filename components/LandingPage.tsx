'use client';

import React, { useState } from 'react';
import { ArrowRight, Layout, Database, Layers, CheckCircle2, Terminal, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LandingPageProps {
    onStart: (role: 'Frontend' | 'Backend' | 'Fullstack') => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
    const [selectedRole, setSelectedRole] = useState<'Frontend' | 'Backend' | 'Fullstack' | null>(null);

    // Explicit Hex Colors to bypass potential Tailwind Theme mismatches
    const activeBg = '#2563eb'; // Blue 600
    const inactiveBg = '#18181b'; // Zinc 900
    const activeBorder = '#3b82f6'; // Blue 500
    const inactiveBorder = '#27272a'; // Zinc 800

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center space-y-20 relative z-10 w-full overflow-hidden">

            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="space-y-8 max-w-5xl mx-auto mt-10"
            >
                <div style={{ backgroundColor: '#18181b', borderColor: '#27272a' }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium text-zinc-400">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    v1.2 // ENGINEERING READINESS PROTOCOL
                </div>

                <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-tight">
                    Don't guess.<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-200 to-white">Verify.</span>
                </h1>

                <p className="text-2xl text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
                    The definitive AI-powered readiness check for modern software engineers.
                </p>

                {/* Feature Pills */}
                <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-zinc-500">
                    <div style={{ backgroundColor: '#18181b', borderColor: '#27272a' }} className="flex items-center gap-2 px-3 py-1 rounded border"><Terminal className="w-4 h-4" /> Strict Metrics</div>
                    <div style={{ backgroundColor: '#18181b', borderColor: '#27272a' }} className="flex items-center gap-2 px-3 py-1 rounded border"><Code2 className="w-4 h-4" /> Deep Analysis</div>
                    <div style={{ backgroundColor: '#18181b', borderColor: '#27272a' }} className="flex items-center gap-2 px-3 py-1 rounded border"><CheckCircle2 className="w-4 h-4" /> Actionable Plans</div>
                </div>
            </motion.div>

            {/* Role Selection */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="w-full max-w-6xl"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { id: 'Frontend', icon: Layout, title: "Frontend Engineer", stack: "React • CSS • Performance" },
                        { id: 'Backend', icon: Database, title: "Backend Engineer", stack: "Node • SQL • System Design" },
                        { id: 'Fullstack', icon: Layers, title: "Fullstack Architect", stack: "E2E • DevOps • Scalability" }
                    ].map((role) => {
                        const isActive = selectedRole === role.id;
                        return (
                            <button
                                key={role.id}
                                onClick={() => setSelectedRole(role.id as any)}
                                style={{
                                    backgroundColor: isActive ? activeBg : inactiveBg,
                                    borderColor: isActive ? activeBorder : inactiveBorder,
                                    color: isActive ? 'white' : '#e4e4e7'
                                }}
                                className={`
                  group relative p-10 rounded-3xl transition-all duration-300 text-left border overflow-hidden
                  flex flex-col justify-between min-h-[280px] hover:border-zinc-500
                  ${isActive ? 'shadow-2xl shadow-blue-900/40 ring-2 ring-white/20 scale-[1.02]' : 'hover:-translate-y-1'}
                `}
                            >
                                {/* Background Icon Watermark */}
                                <role.icon className={`absolute -bottom-8 -right-8 w-48 h-48 opacity-5 transition-transform duration-500 group-hover:scale-110 rotate-12 ${isActive ? 'text-white' : 'text-zinc-500'}`} />

                                <div>
                                    <div style={{ backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : '#27272a' }} className="p-4 w-fit rounded-2xl mb-6 transition-colors">
                                        <role.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="text-3xl font-bold tracking-tight mb-2 text-white">{role.title}</div>
                                    <div className={`text-sm font-mono uppercase tracking-wider ${isActive ? 'text-blue-100' : 'text-zinc-500'}`}>{role.stack}</div>
                                </div>

                                <div className={`mt-8 flex items-center text-sm font-bold ${isActive ? 'text-white' : 'text-zinc-500'} transition-colors`}>
                                    SELECT PROTOCOL <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </button>
                        );
                    })}
                </div>
            </motion.div>

            {/* CTA Button */}
            <AnimatePresence>
                {selectedRole && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="fixed bottom-10 left-0 right-0 z-50 flex justify-center pointer-events-none"
                    >
                        <button
                            onClick={() => onStart(selectedRole)}
                            style={{ backgroundColor: activeBg }}
                            className="pointer-events-auto shadow-2xl shadow-blue-500/40 group inline-flex items-center justify-center px-12 py-5 text-lg font-bold text-white rounded-full hover:bg-blue-500 transition-all hover:scale-105 active:scale-95 border border-white/10 backdrop-blur-md"
                        >
                            INITIALIZE {selectedRole.toUpperCase()} CHECK
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
