export interface UserStats {
    name: string;
    target: 'NEET' | 'JEE';
    totalScore: number;
    totalQuestions: number;
    quizzesTaken: number;
    timeSpentMinutes: number;
    subjectProgress: Record<string, number>; // Maps subject to question count correct
    subjectTotal: Record<string, number>;    // Maps subject to total questions seen
}

export const initialStats: UserStats = {
    name: "",
    target: "NEET",
    totalScore: 0,
    totalQuestions: 0,
    quizzesTaken: 0,
    timeSpentMinutes: 0,
    subjectProgress: {
        Physics: 0,
        Chemistry: 0,
        Biology: 0,
        Maths: 0
    },
    subjectTotal: {
        Physics: 0,
        Chemistry: 0,
        Biology: 0,
        Maths: 0
    }
};
