import { AssessmentData, ScoreResult } from './scoring';

export interface DetailedFeedback {
    strengths: string[];
    gaps: string[];
    actions: string[];
    timeline: string;
    weekPlan: string[];
}

export async function generateFeedback(data: AssessmentData, score: ScoreResult): Promise<DetailedFeedback> {
    // Simulate API delay for "AI thinking" feel
    await new Promise(resolve => setTimeout(resolve, 2000));

    const strengths: string[] = [];
    const gaps: string[] = [];
    const actions: string[] = [];
    let timeline = "4 weeks";
    const weekPlan: string[] = [];

    // Role-specific nuances
    const isFrontend = data.role === 'Frontend';
    const isBackend = data.role === 'Backend';

    // Tech Analysis
    if (score.breakdown.technical > 25) {
        strengths.push(`${data.role} technical foundation is solid.`);
    } else if (score.breakdown.technical < 15) {
        gaps.push(`Key ${data.role} concepts needs reinforcement.`);
        if (isFrontend) {
            actions.push("Build a complex React Dashboard with complex state.");
            weekPlan.push("Week 1: Advanced React Patterns & Performance.");
        } else if (isBackend) {
            actions.push("Build a scalable microservice with caching.");
            weekPlan.push("Week 1: API Design & Database Indexing.");
        } else {
            actions.push("Build an end-to-end clone (e.g., lightweight Trello).");
            weekPlan.push("Week 1: System Design & Glue Code.");
        }
    }

    // Resume Analysis
    if (data.resumeReviewed) {
        strengths.push("Resume is mentor-verified.");
    } else {
        gaps.push("Resume lacks professional review.");
        actions.push("Get resume reviewed. Focus on 'Impact' metrics.");
        weekPlan.push("Week 2: Resume Overhaul & LinkedIn refinement.");
    }

    // Communication Analysis
    if (data.communicationConfidence > 75) {
        strengths.push("Excellent communication confidence.");
        if (data.mockInterviews === '3+') strengths.push("Interview-hardened.");
    } else {
        gaps.push("Low confidence in explaining technical decisions.");
        actions.push(`Practice 'System Design' explanations for ${data.role}.`);
    }

    // Mock Interviews
    if (data.mockInterviews === '0') {
        gaps.push("Zero mock interview experience.");
        actions.push("Schedule 3 mock interviews immediately.");
        if (weekPlan.length < 2) weekPlan.push("Week 3: Intense Mock Interview loops.");
    }

    // Portfolio
    if (data.hasPortfolio) {
        strengths.push("Portfolio/GitHub is show-ready.");
    } else {
        gaps.push("No visible code evidence.");
        actions.push(isFrontend ? "Deploy a Vercel portfolio with case studies." : "Clean up GitHub & add detailed READMEs.");
        if (weekPlan.length < 3) weekPlan.push("Week 4: Portfolio Polish & Deploy.");
    }

    // Timeline Logic
    if (score.totalScore > 85) timeline = "Job Ready (1 week)";
    else if (score.totalScore > 65) timeline = "2-3 weeks";
    else if (score.totalScore > 40) timeline = "1-2 months";
    else timeline = "3+ months";

    // Fallbacks
    if (strengths.length === 0) strengths.push("Strong potential and drive.");
    if (actions.length === 0) actions.push("Apply to startups to gauge market response.");
    if (weekPlan.length === 0) weekPlan.push("Week 1: Revision", "Week 2: Projects", "Week 3: Mocks", "Week 4: Apply");

    return {
        strengths,
        gaps,
        actions: actions.slice(0, 3), // Top 3
        timeline,
        weekPlan: weekPlan.slice(0, 4)
    };
}
