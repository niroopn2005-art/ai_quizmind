import { useState, useEffect } from "react";
import { Layout } from "@/Layout";
import { Dashboard } from "@/pages/Dashboard";
import { QuizSetup } from "@/pages/QuizSetup";
import { QuizRunner } from "@/pages/QuizRunner";
import { QuizResults } from "@/pages/QuizResults";
import { Auth } from "@/pages/Auth";
import { UserStats, initialStats } from "@/types";

export default function App() {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [page, setPage] = useState<"auth" | "dashboard" | "setup" | "quiz" | "results">("auth");
  const [quizConfig, setQuizConfig] = useState<{ subject: string, chapter: string, target: string, timer: number } | null>(null);
  const [results, setResults] = useState<{ score: number, total: number } | null>(null);

  useEffect(() => {
    // Load local storage if exists
    const stored = localStorage.getItem("astra_user_stats");
    if (stored) {
      setStats(JSON.parse(stored));
      setPage("dashboard");
    }
  }, []);

  const saveStats = (newStats: UserStats) => {
    setStats(newStats);
    localStorage.setItem("astra_user_stats", JSON.stringify(newStats));
  };

  const handleLogin = (name: string, target: string) => {
    const freshStats = { ...initialStats, name, target: target as "NEET" | "JEE" };
    saveStats(freshStats);
    setPage("dashboard");
  };

  const startQuiz = (config: any) => {
    setQuizConfig(config);
    setPage("quiz");
  };

  const finishQuiz = (score: number, total: number) => {
    setResults({ score, total });

    // Update stats!
    if (stats) {
      const u = { ...stats };
      u.totalScore += score;
      u.totalQuestions += total;
      u.quizzesTaken += 1;
      u.timeSpentMinutes += (quizConfig?.timer || 30);

      const subject = quizConfig?.subject || 'Physics';
      u.subjectProgress[subject] = (u.subjectProgress[subject] || 0) + score;
      u.subjectTotal[subject] = (u.subjectTotal[subject] || 0) + total;
      saveStats(u);
    }

    setPage("results");
  };

  const goHome = () => {
    setPage("dashboard");
    setQuizConfig(null);
    setResults(null);
  };

  if (page === "auth" || !stats) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <Layout onNavigate={(p: string) => setPage(p as any)}>
      {page === "dashboard" && <Dashboard onNavigate={(p) => setPage(p as any)} stats={stats} />}
      {page === "setup" && <QuizSetup stats={stats} onStart={startQuiz} />}
      {page === "quiz" && quizConfig && <QuizRunner config={quizConfig} onFinish={finishQuiz} />}
      {page === "results" && results && <QuizResults score={results.score} total={results.total} onHome={goHome} />}
    </Layout>
  );
}
