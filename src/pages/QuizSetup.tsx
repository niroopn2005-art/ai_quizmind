import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Input } from "@/components/ui/input";
import { UserStats } from "@/types";
import syllabus from "@/data/syllabus.json";

export function QuizSetup({ stats, onStart }: { stats: UserStats, onStart: (config: any) => void }) {
    const [grade, setGrade] = useState<"10th" | "11th" | "12th">("11th");
    const [subject, setSubject] = useState("Physics");
    const [chapter, setChapter] = useState("");
    const [timer, setTimer] = useState("30");

    const availableSubjects = stats.target === 'NEET' ? ['Physics', 'Chemistry', 'Biology'] : ['Physics', 'Chemistry', 'Maths'];

    // Reset subject and chapter if grade changes or target prevents it
    if (!availableSubjects.includes(subject)) setSubject(availableSubjects[0]);

    const chapters = syllabus[grade][subject as keyof typeof syllabus["10th"]] || [];

    return (
        <div className="w-full h-full max-w-5xl mx-auto p-4 md:p-8 animate-in mt-6 fade-in slide-in-from-bottom-4 duration-500">
            <Card className="border-none shadow-xl bg-gradient-to-br from-card to-card/50 backdrop-blur">
                <CardHeader className="space-y-4 border-b border-border/50 pb-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle className="text-3xl font-extrabold bg-gradient-to-br from-purple-500 to-indigo-600 bg-clip-text text-transparent">
                                Configure Assessment
                            </CardTitle>
                            <CardDescription className="text-lg">
                                Select your {stats.target} Mock Test parameters. We have 100+ PYQ generated questions per chapter.
                            </CardDescription>
                        </div>
                        <div className="hidden md:flex p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-500/80 font-mono font-bold">
                            Target: {stats.target} Profile
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-8 mt-8">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-10">
                            <div className="space-y-4">
                                <label className="text-sm font-semibold uppercase text-muted-foreground tracking-wider">1. Select Standard</label>
                                <ToggleGroup
                                    type="single"
                                    value={grade}
                                    onValueChange={(v: any) => v && setGrade(v)}
                                    className="justify-start gap-4"
                                >
                                    {['10th', '11th', '12th'].map((std) => (
                                        <ToggleGroupItem
                                            key={std}
                                            value={std}
                                            className="px-6 py-6 border-2 data-[state=on]:border-indigo-500 data-[state=on]:bg-indigo-500/10 rounded-xl transition-all font-bold text-lg"
                                        >
                                            Class {std}
                                        </ToggleGroupItem>
                                    ))}
                                </ToggleGroup>
                            </div>

                            <div className="space-y-4">
                                <label className="text-sm font-semibold uppercase text-muted-foreground tracking-wider">2. Select Subject</label>
                                <ToggleGroup
                                    type="single"
                                    value={subject}
                                    onValueChange={(v) => { v && setSubject(v); setChapter(""); }}
                                    className="justify-start gap-4 flex-wrap"
                                >
                                    {availableSubjects.map((subj) => (
                                        <ToggleGroupItem
                                            key={subj}
                                            value={subj}
                                            className="px-6 py-6 border-2 data-[state=on]:border-indigo-500 data-[state=on]:bg-indigo-500/10 rounded-xl transition-all"
                                        >
                                            <span className="text-lg font-bold">{subj}</span>
                                        </ToggleGroupItem>
                                    ))}
                                </ToggleGroup>
                                <p className="text-xs text-muted-foreground pt-1">Filtered based on your {stats.target} Track.</p>
                            </div>

                            <div className="space-y-4">
                                <label className="text-sm font-semibold uppercase text-muted-foreground tracking-wider">3. Test Configuration</label>
                                <div className="flex gap-4 items-center">
                                    <ToggleGroup
                                        type="single"
                                        value={timer}
                                        onValueChange={(v) => v && setTimer(v)}
                                        className="justify-start gap-2"
                                    >
                                        {['15', '30', '60'].map((time) => (
                                            <ToggleGroupItem
                                                key={time}
                                                value={time}
                                                className="px-4 py-3 border rounded-lg data-[state=on]:border-blue-500 data-[state=on]:bg-blue-500/10 transition-all font-semibold"
                                            >
                                                {time} min
                                            </ToggleGroupItem>
                                        ))}
                                    </ToggleGroup>
                                    <span className="text-muted-foreground">or custom:</span>
                                    <Input
                                        type="number"
                                        className="w-24 bg-background border-input font-mono text-lg"
                                        value={timer}
                                        onChange={(e) => setTimer(e.target.value)}
                                        min="1"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 border-l border-border/50 pl-0 md:pl-10">
                            <label className="text-sm font-semibold uppercase text-muted-foreground tracking-wider flex justify-between">
                                <span>4. Select Chapter</span>
                                <span className="text-indigo-500">({chapters.length} available)</span>
                            </label>

                            <div className="grid grid-cols-1 gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                {chapters.map((chap) => (
                                    <button
                                        key={chap}
                                        className={`w-full text-left px-5 py-4 border-2 rounded-xl transition-all ${chapter === chap ? 'border-indigo-500 bg-indigo-500/5 ring-1 ring-indigo-500/50' : 'border-border/50 hover:bg-secondary/50'}`}
                                        onClick={() => setChapter(chap)}
                                    >
                                        <div className="font-bold text-foreground">{chap}</div>
                                        <div className="text-xs font-semibold text-muted-foreground mt-1 tracking-wide">
                                            100+ PYQ PRE-LOADED • {stats.target} LEVEL
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-border/50">
                        <Button
                            size="lg"
                            className="w-full text-xl font-bold h-16 rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-1 transition-all"
                            onClick={() => onStart({ subject, chapter, timer: parseInt(timer) || 30, target: stats.target })}
                            disabled={!chapter}
                        >
                            {chapter ? `Launch Assessment on ${chapter} 🚀` : "Select a chapter to begin"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
