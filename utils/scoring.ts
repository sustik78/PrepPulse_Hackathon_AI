export interface AssessmentData {
    techSkillLevel: number; // 0-100
    projectsCount: number; // 0-10+
    resumeReviewed: boolean;
    mockInterviews: '0' | '1-2' | '3+';
    communicationConfidence: number; // 0-100
    hasPortfolio: boolean;
    role: 'Frontend' | 'Backend' | 'Fullstack';
}

export interface ScoreResult {
    totalScore: number;
    level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Job Ready';
    breakdown: {
        technical: number; // out of 30
        resume: number; // out of 20
        communication: number; // out of 25
        portfolio: number; // out of 25
    };
}

export function calculateScore(data: AssessmentData): ScoreResult {
    let technical = 0;
    let resume = 0;
    let communication = 0;
    let portfolio = 0;

    // Technical (30%)
    // Skill level contributes 20%, Projects contribute 10%
    technical += (data.techSkillLevel / 100) * 20;
    // Cap projects at 5 for max score
    const projectsScore = Math.min(data.projectsCount, 5) / 5;
    technical += projectsScore * 10;

    // Resume (20%)
    // If reviewed, full points. If not, assumptively lower quality but give some base.
    // Actually, simple binary: Yes = 20, No = 5 (base effort)
    resume = data.resumeReviewed ? 20 : 5;

    // Communication (25%)
    // Confidence * 0.15 + Mock Interviews * 0.10
    communication += (data.communicationConfidence / 100) * 15;
    const mockScore = data.mockInterviews === '3+' ? 1 : data.mockInterviews === '1-2' ? 0.6 : 0;
    communication += mockScore * 10;

    // Portfolio (25%)
    // Yes = 25, No = 0
    portfolio = data.hasPortfolio ? 25 : 0;

    const totalScore = Math.round(technical + resume + communication + portfolio);

    let level: ScoreResult['level'] = 'Beginner';
    if (totalScore >= 85) level = 'Job Ready';
    else if (totalScore >= 65) level = 'Advanced';
    else if (totalScore >= 40) level = 'Intermediate';

    return {
        totalScore,
        level,
        breakdown: {
            technical: Math.round(technical),
            resume: Math.round(resume),
            communication: Math.round(communication),
            portfolio: Math.round(portfolio)
        }
    };
}
