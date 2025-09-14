import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Play, ArrowRight } from "lucide-react";

const codeSnippets = [
  "=AI.ANALYZE(A1:E100, 'normalize sales by month')",
  "=AI.PIVOT(data, 'create monthly breakdown with trends')", 
  "=AI.CHART(sales_data, 'show revenue growth by quarter')",
  "=AI.FORMULA('calculate compound growth rate')"
];

export function Hero() {
  const [currentSnippet, setCurrentSnippet] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const snippet = codeSnippets[currentSnippet];
    let currentIndex = 0;
    setDisplayText("");
    setIsTyping(true);

    const typeInterval = setInterval(() => {
      if (currentIndex <= snippet.length) {
        setDisplayText(snippet.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
        
        setTimeout(() => {
          setCurrentSnippet((prev) => (prev + 1) % codeSnippets.length);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [currentSnippet]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-aurora opacity-20" />
      <div 
        className="absolute inset-0 bg-grid-pattern opacity-30" 
        style={{ backgroundSize: '50px 50px' }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background"
        animate={{
          background: [
            "linear-gradient(to bottom, transparent, rgba(var(--background) / 0.5), rgba(var(--background) / 1))",
            "linear-gradient(to bottom, transparent, rgba(var(--background) / 0.7), rgba(var(--background) / 1))",
            "linear-gradient(to bottom, transparent, rgba(var(--background) / 0.5), rgba(var(--background) / 1))"
          ]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container relative z-10 text-center max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge variant="secondary" className="mb-6 text-sm px-4 py-2" data-testid="badge-announcement">
            <span className="mr-2">🚀</span>
            Now supporting multi-LLM routing
            <ChevronRight className="ml-1 h-3 w-3" />
          </Badge>
        </motion.div>

        <motion.h1
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          data-testid="hero-headline"
        >
          The self-hosted,{" "}
          <span className="text-primary">AI-native</span>{" "}
          spreadsheet that thinks like an analyst
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          data-testid="hero-subtitle"
        >
          Put AI inside the grid. Author formulas, reshape data, build pivots/charts, 
          and verify outputs — with cell-level provenance, tests, and rollback.
        </motion.p>

        {/* Demo Code Block */}
        <motion.div
          className="bg-card/50 backdrop-blur-sm border border-card-border rounded-lg p-6 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          data-testid="demo-code-block"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">Formula Bar</span>
            <div className="flex space-x-1">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <div className="w-2 h-2 rounded-full bg-green-500" />
            </div>
          </div>
          <div className="font-mono text-left text-sm md:text-base">
            <span className="text-primary">{displayText}</span>
            {isTyping && <span className="animate-pulse">|</span>}
          </div>
          <div className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground text-left">
            ✓ Cell-level provenance • ✓ Auto-generated tests • ✓ Rollback ready
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 shadow-aurora"
            data-testid="button-try-demo-hero"
          >
            <Play className="mr-2 h-5 w-5" />
            Try the Demo
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="text-lg px-8 py-6 bg-background/50 backdrop-blur-sm"
            data-testid="button-book-call"
          >
            Book a Call
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Button 
            variant="ghost" 
            className="text-muted-foreground hover:text-foreground"
            data-testid="button-view-docs"
          >
            View Documentation
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}