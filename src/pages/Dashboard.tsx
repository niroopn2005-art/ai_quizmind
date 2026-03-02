import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserStats } from "@/types";

export function Dashboard({ onNavigate, stats }: { onNavigate: (page: string) => void, stats: UserStats }) {
  const accuracy = stats.totalQuestions > 0
    ? Math.round((stats.totalScore / stats.totalQuestions) * 100)
    : 0;

  const subjects = stats.target === 'NEET' ? ['Physics', 'Chemistry', 'Biology'] : ['Physics', 'Chemistry', 'Maths'];

  return (
    <div className="w-full h-full max-w-6xl mx-auto p-4 md:p-8 animate-in mt-6 fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight bg-gradient-to-br from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Welcome back, {stats.name} 🚀
          </h2>
          <p className="text-muted-foreground text-lg mt-2 font-medium">
            Your {stats.target} Artificial Intelligence Preparation Dashboard
          </p>
        </div>
        <Button
          size="lg"
          onClick={() => onNavigate("setup")}
          className="rounded-xl px-8 h-12 text-md font-bold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
        >
          Start New Assessment
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-none shadow-xl bg-card/60 backdrop-blur pb-2 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Overall Accuracy</CardDescription>
            <CardTitle className="text-5xl font-black">{accuracy}%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-indigo-500 font-medium">From {stats.totalQuestions} Questions attempt</div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl bg-card/60 backdrop-blur pb-2 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Exams Taken</CardDescription>
            <CardTitle className="text-5xl font-black">{stats.quizzesTaken}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-emerald-500 font-medium">+ {stats.quizzesTaken > 0 ? "1 recent completion" : "Begin your journey"}</div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl bg-card/60 backdrop-blur pb-2 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Time Invested</CardDescription>
            <CardTitle className="text-5xl font-black">{stats.timeSpentMinutes}M</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-orange-500 font-medium">Active focus time</div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white pb-2 relative overflow-hidden">
          <CardHeader className="pb-2 relative z-10">
            <CardDescription className="text-xs font-bold uppercase tracking-wider text-indigo-100">National Rank Est.</CardDescription>
            <CardTitle className="text-5xl font-black">{stats.quizzesTaken === 0 ? "TBD" : "Top 12%"}</CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-sm text-indigo-100 font-medium">Based on mock algorithms</div>
          </CardContent>
          <div className="absolute -bottom-8 -right-8 opacity-20 text-[120px] leading-none mix-blend-overlay">🚀</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2 border-none shadow-xl bg-card/60 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Subject Mastery Tracker</CardTitle>
            <CardDescription className="text-md">Based on syllabus coverage and accuracy.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-2">
            {subjects.map((sub, idx) => {
              const subTotalParams = stats.subjectTotal[sub] || 0;
              const subCorrectParams = stats.subjectProgress[sub] || 0;
              const subPerf = subTotalParams > 0 ? (subCorrectParams / subTotalParams) * 100 : 0;

              return (
                <div key={idx} className="space-y-2 group">
                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full bg-indigo-500 group-hover:scale-125 transition-transform`} />
                      <span className="font-semibold text-lg">{sub}</span>
                    </div>
                    <span className="font-mono font-bold text-muted-foreground">
                      {subCorrectParams} / {Math.max(subTotalParams, 100)} chap.
                    </span>
                  </div>
                  <div className="w-full bg-secondary h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${subPerf}%` }}
                    />
                  </div>
                  <p className="text-xs font-bold uppercase text-muted-foreground pt-1 text-right">
                    {Math.round(subPerf)}% Mastery
                  </p>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl bg-card/60 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Recommended Resources</CardTitle>
            <CardDescription>Targeted NCERT & Video Links</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-xl border border-border/50 bg-secondary/20 hover:bg-secondary/40 transition-colors cursor-pointer group">
              <h4 className="font-bold text-sm text-primary mb-1 group-hover:text-indigo-500 transition-colors">📄 NCERT Biology 11th - Cell Cycle</h4>
              <p className="text-xs text-muted-foreground">Priority review chapter based on {stats.target} weightage.</p>
            </div>
            <div className="p-4 rounded-xl border border-border/50 bg-secondary/20 hover:bg-secondary/40 transition-colors cursor-pointer group">
              <h4 className="font-bold text-sm text-primary mb-1 group-hover:text-indigo-500 transition-colors">📺 Physics - Kinematics One-Shot</h4>
              <p className="text-xs text-muted-foreground">2-hour video summary by top faculty.</p>
            </div>
            <div className="p-4 rounded-xl border border-border/50 bg-secondary/20 hover:bg-secondary/40 transition-colors cursor-pointer group">
              <h4 className="font-bold text-sm text-primary mb-1 group-hover:text-indigo-500 transition-colors">📝 Past Year JEE/NEET Mocks</h4>
              <p className="text-xs text-muted-foreground">Take the 2018-2022 chapter-wise challenges.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
