import { ReactNode } from "react";
import { ThemeToggle } from "@/components/ThemeToggle"; // They have this
import { Button } from "@/components/ui/button";

export function Layout({
  children,
  onNavigate
}: {
  children: ReactNode;
  onNavigate: (page: string) => void;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background selection:bg-indigo-500/30 font-sans">
      <header className="sticky top-0 z-50 flex h-16 border-b bg-background/80 backdrop-blur-md shadow-sm">
        <nav className="container w-full flex flex-row items-center justify-between gap-6 px-4 md:px-8">
          <div className="flex items-center gap-6 md:gap-10">
            <button
              onClick={() => onNavigate("dashboard")}
              className="group flex flex-col justify-center transition-all hover:-translate-y-0.5"
            >
              <h1 className="text-xl font-black tracking-tighter bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                NEET/Board Prep
              </h1>
              <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest text-left mt-[-2px] group-hover:text-indigo-500 transition-colors">
                AI Quiz Maker Platform
              </span>
            </button>
            <div className="hidden md:flex items-center gap-6 text-sm font-medium">
              <button onClick={() => onNavigate("dashboard")} className="text-muted-foreground transition-colors hover:text-foreground">Dashboard</button>
              <button onClick={() => onNavigate("setup")} className="text-muted-foreground transition-colors hover:text-foreground">Subjects</button>
              <button className="text-muted-foreground transition-colors hover:text-foreground">Performance</button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="default" size="sm" className="hidden sm:flex rounded-full px-6 font-semibold shadow-md shadow-indigo-500/20">
              Pro Access
            </Button>
          </div>
        </nav>
      </header>
      <main className="flex grow flex-col overflow-y-auto">{children}</main>
    </div>
  );
}
