import { useState, useEffect } from "react";
import { Card, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";

// Optional fallback data
import biologyQuestions from "../data/biology.json";
import chemistryQuestions from "../data/chemistry.json";

interface QuizRunnerProps {
  config: { subject: string; chapter: string; timer: number; target: string };
  onFinish: (score: number, total: number) => void;
}

export function QuizRunner({ config, onFinish }: QuizRunnerProps) {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(config.timer * 60);

  useEffect(() => {
    // Generate an advanced set of questions by mixing our realistic mock banks 
    let bank = biologyQuestions;
    if (config.subject.toLowerCase() === 'chemistry') bank = chemistryQuestions;
    if (config.subject.toLowerCase() === 'physics' && chemistryQuestions) bank = chemistryQuestions; // fallback mock

    // Scramble logic to simulate "100 question PYQ Bank" sampling
    const shuffled = [...(bank || [])].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 10)); // Take 10 for the quiz session
  }, [config]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onFinish(score, questions.length);
      return;
    }
    const timerId = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timerId);
  }, [timeLeft, onFinish, score, questions.length]);

  const handleSelect = (option: string) => {
    if (isAnswered) return;
    setSelectedAnswer(option);
  };

  const handleSubmit = () => {
    if (!selectedAnswer || isAnswered) return;

    setIsAnswered(true);
    if (selectedAnswer === questions[currentIdx].answer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      onFinish(score, questions.length);
    }
  };

  if (questions.length === 0) return <div className="p-12 text-center animate-pulse text-2xl font-bold mt-20">Loading {config.target} Engine for {config.chapter}...</div>;

  const q = questions[currentIdx];
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8 animate-in slide-in-from-right-8 duration-500 mt-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="text-sm font-semibold tracking-widest text-indigo-500 uppercase">
            {config.subject} • {config.chapter}
          </div>
          <div className="text-lg font-bold tracking-wide text-foreground uppercase mt-1">
            Question {currentIdx + 1} of {questions.length}
          </div>
        </div>
        <div className={`flex items-center gap-2 font-mono text-xl font-bold px-4 py-2 rounded-full border ${timeLeft < 60 ? 'text-red-500 border-red-500 bg-red-500/10 animate-pulse' : 'text-primary border-primary bg-primary/5'}`}>
          <span>⏱️</span>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
      </div>

      <Card className="border-none shadow-xl bg-gradient-to-br from-card to-card/50 backdrop-blur overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-secondary">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500"
            style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
          />
        </div>

        <CardContent className="p-6 md:p-10 pt-12 md:pt-12">
          {q.neetYear && (
            <div className="absolute top-4 right-4 bg-red-500/10 text-red-500 text-xs font-bold uppercase py-1 px-3 rounded-full border border-red-500/20">
              {config.target} PYQ {q.neetYear}
            </div>
          )}

          <CardTitle className="text-2xl md:text-3xl font-medium leading-normal mb-8 text-foreground/90">
            {q.question}
          </CardTitle>

          <div className="space-y-4">
            {q.options.map((opt: string) => {
              const isSelected = selectedAnswer === opt;
              const isCorrect = q.answer === opt;

              let btnClass = "w-full justify-start h-auto min-h-16 py-4 px-6 text-lg border-2 bg-background hover:bg-secondary/50 rounded-xl transition-all ";

              if (isAnswered) {
                if (isCorrect) btnClass += "border-green-500 bg-green-500/10 hover:bg-green-500/20 text-green-700 dark:text-green-400 font-medium";
                else if (isSelected) btnClass += "border-red-500 bg-red-500/10 hover:bg-red-500/20 text-red-700 dark:text-red-400 opacity-70";
                else btnClass += "opacity-50 border-input";
              } else {
                if (isSelected) btnClass += "border-indigo-500 bg-indigo-500/5 ring-4 ring-indigo-500/20";
                else btnClass += "border-muted-foreground/20 hover:border-indigo-300";
              }

              return (
                <Button
                  key={opt}
                  variant="outline"
                  className={btnClass}
                  onClick={() => handleSelect(opt)}
                  disabled={isAnswered}
                  style={{ whiteSpace: "normal", textAlign: "left", height: "auto" }}
                >
                  <div className="flex w-full items-center justify-between gap-4">
                    <span>{opt}</span>
                    {isAnswered && isCorrect && <span className="text-xl shrink-0">✅</span>}
                    {isAnswered && isSelected && !isCorrect && <span className="text-xl shrink-0">❌</span>}
                  </div>
                </Button>
              );
            })}
          </div>

          <div className={`mt-8 overflow-hidden transition-all duration-500 ${isAnswered ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="p-6 bg-blue-500/5 border border-blue-500/20 rounded-xl space-y-4 shadow-inner">
              <h4 className="font-exrabold text-blue-600 dark:text-blue-400 uppercase tracking-widest text-xs flex items-center gap-2">
                <span>💡</span> AI Engine Explanation
              </h4>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {q.explanation}
              </p>

              <div className="pt-4 flex flex-wrap gap-4 border-t border-blue-500/20">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="secondary" className="gap-2 rounded-full font-bold bg-blue-500/10 text-blue-600 hover:bg-blue-500/20">
                      📺 Play Conceptual Video
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Video: {config.chapter} Basics</DialogTitle>
                      <DialogDescription>Top Faculty Crash Course Snippet</DialogDescription>
                    </DialogHeader>
                    <div className="w-full aspect-video bg-black/80 rounded-xl flex flex-col items-center justify-center border-2 border-border shadow-2xl relative overflow-hidden group">
                      <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/8b_qS-Y-2G4?autoplay=1"
                        title="Chemistry/Biology Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="gap-2 rounded-full font-bold border-indigo-500/30 text-indigo-500 hover:bg-indigo-500/10">
                      📄 View NCERT Note Sheet
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-4xl h-[80vh]">
                    <DialogHeader>
                      <DialogTitle>NCERT PDF: {config.chapter}</DialogTitle>
                    </DialogHeader>
                    <div className="w-full h-full bg-secondary/30 rounded-xl flex flex-col items-center justify-center border-2 border-indigo-500/40 relative overflow-hidden">
                      <iframe
                        src="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                        width="100%"
                        height="100%"
                        title="NCERT Note Sheet"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-6 md:p-10 pt-0 flex justify-end gap-4 border-t border-border/50 bg-secondary/10 mt-6 shadow-[-10px_-10px_30px_rgba(0,0,0,0.02)]">
          {!isAnswered ? (
            <Button
              size="lg"
              onClick={handleSubmit}
              disabled={!selectedAnswer}
              className="h-14 px-10 rounded-xl text-lg font-bold shadow-indigo-500/20 shadow-xl transition-all hover:scale-105 bg-foreground text-background"
            >
              Analyze Answer
            </Button>
          ) : (
            <Button
              size="lg"
              onClick={handleNext}
              className="h-14 px-10 rounded-xl text-xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-2xl shadow-indigo-500/30 hover:scale-[1.02] transition-all"
            >
              {currentIdx === questions.length - 1 ? 'Calculate Rank 🎉' : 'Next PYQ ➡️'}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
