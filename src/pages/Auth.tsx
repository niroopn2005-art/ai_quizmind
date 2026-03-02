import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export function Auth({ onLogin }: { onLogin: (name: string, target: string) => void }) {
    const [name, setName] = useState("");
    const [target, setTarget] = useState<"NEET" | "JEE">("NEET");

    return (
        <div className="relative flex min-h-screen w-full items-center justify-center p-4 overflow-hidden bg-background">
            {/* Background Orbs */}
            <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-indigo-500/20 blur-[128px]" />
            <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-purple-500/20 blur-[128px]" />
            <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-[100px]" />

            <div className="relative z-10 w-full max-w-md animate-in fade-in zoom-in-95 duration-700">
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-black tracking-tighter bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                        Astra AI
                    </h1>
                    <p className="mt-2 text-lg font-medium text-muted-foreground">
                        The Ultimate NEET & JEE Preparation Engine
                    </p>
                </div>

                <Card className="border border-white/10 shadow-2xl bg-card/40 backdrop-blur-2xl px-2 py-4 rounded-3xl">
                    <CardContent className="space-y-6 pt-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">
                                Your Name
                            </label>
                            <Input
                                type="text"
                                placeholder="Enter your name to begin..."
                                className="h-14 bg-background/50 border-white/5 rounded-2xl px-6 text-lg focus-visible:ring-indigo-500"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">
                                Select Your Target
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                                <Button
                                    variant="outline"
                                    className={`h-16 rounded-2xl border-2 transition-all ${target === 'NEET' ? 'border-indigo-500 bg-indigo-500/10 text-indigo-500' : 'border-white/5 hover:border-white/20'}`}
                                    onClick={() => setTarget('NEET')}
                                >
                                    <span className="text-xl font-bold tracking-widest">NEET</span>
                                </Button>
                                <Button
                                    variant="outline"
                                    className={`h-16 rounded-2xl border-2 transition-all ${target === 'JEE' ? 'border-blue-500 bg-blue-500/10 text-blue-500' : 'border-white/5 hover:border-white/20'}`}
                                    onClick={() => setTarget('JEE')}
                                >
                                    <span className="text-xl font-bold tracking-widest">JEE</span>
                                </Button>
                            </div>
                        </div>

                        <Button
                            className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-1 transition-all"
                            onClick={() => name && onLogin(name, target)}
                            disabled={!name}
                        >
                            Initialize Dashboard 🚀
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
