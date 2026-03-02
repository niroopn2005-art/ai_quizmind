import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function QuizResults({ score, total, onHome }: { score: number, total: number, onHome: () => void }) {
  const percentage = Math.round((score / total) * 100);

  let message = "Keep Practicing!";
  let gradient = "from-red-500 to-orange-500";

  if (percentage >= 90) {
    message = "Outstanding! 🏆";
    gradient = "from-green-400 to-emerald-600";
  } else if (percentage >= 70) {
    message = "Great Job! 🌟";
    gradient = "from-blue-400 to-indigo-600";
  } else if (percentage >= 50) {
    message = "Good Effort! 📚";
    gradient = "from-yellow-400 to-orange-500";
  }

  return (
    <div className="w-full h-full max-w-3xl mx-auto p-4 md:p-8 animate-in zoom-in-95 duration-700">
      <Card className="border-none shadow-2xl bg-gradient-to-br from-card to-card/50 backdrop-blur text-center mt-12 overflow-hidden relative">
        <div className={`absolute top-0 left-0 w-full h-8 bg-gradient-to-r ${gradient}`}></div>

        <CardHeader className="pt-16 pb-4">
          <CardTitle className="text-4xl font-extrabold tracking-tight">
            Quiz Completed!
          </CardTitle>
          <CardDescription className="text-xl mt-4">
            {message}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="relative inline-flex items-center justify-center">
            <svg className="w-48 h-48 transform -rotate-90">
              <circle
                className="text-secondary"
                strokeWidth="12"
                stroke="currentColor"
                fill="transparent"
                r="80"
                cx="96"
                cy="96"
              />
              <circle
                className="text-transparent stroke-current"
                strokeWidth="12"
                strokeDasharray={502}
                strokeDashoffset={502 - (502 * percentage) / 100}
                strokeLinecap="round"
                fill="transparent"
                r="80"
                cx="96"
                cy="96"
                style={{ stroke: 'url(#gradient)', transition: "stroke-dashoffset 1.5s ease-out" }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={percentage >= 70 ? "#10b981" : "#f59e0b"} />
                  <stop offset="100%" stopColor={percentage >= 70 ? "#3b82f6" : "#ef4444"} />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute text-5xl font-black">
              {percentage}%
            </div>
          </div>

          <div className="flex justify-center gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500">{score}</div>
              <div className="text-sm text-muted-foreground uppercase tracking-widest font-semibold mt-1">Correct</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-500">{total - score}</div>
              <div className="text-sm text-muted-foreground uppercase tracking-widest font-semibold mt-1">Incorrect</div>
            </div>
          </div>

          <div className="pt-8 flex justify-center gap-4">
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-8 rounded-xl"
              onClick={onHome}
            >
              Review Answers
            </Button>
            <Button
              size="lg"
              className="h-14 px-8 rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-1 transition-all"
              onClick={onHome}
            >
              Back to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card >
    </div >
  );
}
