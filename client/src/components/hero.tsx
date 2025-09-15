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
      {/* Futuristic 3D Background */}
      <div className="absolute inset-0 bg-mesh opacity-30 animate-pulse-slow" />
      <div 
        className="absolute inset-0 bg-grid-pattern animate-pulse-slow" 
        style={{ backgroundSize: '80px 80px' }}
      />
      
      {/* Floating 3D Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-4 h-4 bg-white/20 rounded-full blur-sm animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-40 right-20 w-6 h-6 bg-white/10 rounded-full blur-sm animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-white/30 rounded-full blur-sm animate-float" style={{ animationDelay: '4s' }} />
        <div className="absolute bottom-20 right-10 w-5 h-5 bg-white/15 rounded-full blur-sm animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background"
        animate={{
          background: [
            "linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.3), rgb(0, 0, 0))",
            "linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.5), rgb(0, 0, 0))",
            "linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.3), rgb(0, 0, 0))"
          ]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container relative z-10 text-center max-w-6xl mx-auto px-6 flex flex-col items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge variant="secondary" className="mb-6 text-sm px-4 py-2" data-testid="badge-announcement">
            <span className="mr-2">🚀</span>
            Something big is on the way!
            <ChevronRight className="ml-1 h-3 w-3" />
          </Badge>
        </motion.div>

        <motion.h1
          className="font-display text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          data-testid="hero-headline"
        >
          The self-hosted,{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/90 animate-pulse-slow">AI-native</span>{" "}
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

        {/* Futuristic Demo Code Block */}
        <motion.div
          className="relative bg-black/70 backdrop-blur-md border border-white/20 rounded-2xl p-8 mb-12 max-w-4xl mx-auto shadow-glow"
          initial={{ opacity: 0, y: 30, rotateX: 15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.02, rotateX: -2 }}
          data-testid="demo-code-block"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/5 to-transparent animate-pulse-slow" />
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-white/40 animate-pulse" />
              <span className="text-sm text-white/70 font-mono">AI Formula Engine</span>
            </div>
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-400 animate-pulse" style={{ animationDelay: '0s' }} />
              <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
          </div>
          
          <div className="font-mono text-left text-lg md:text-xl mb-6 min-h-[3rem] flex items-center">
            <span className="text-white">{displayText}</span>
            {isTyping && <span className="animate-pulse text-white ml-1">|</span>}
          </div>
          
          <div className="flex flex-wrap gap-4 text-xs text-white/60 justify-center">
            <div className="flex items-center space-x-2 bg-white/5 px-3 py-2 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span>Cell-level provenance</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/5 px-3 py-2 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <span>Auto-generated tests</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/5 px-3 py-2 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-purple-400" />
              <span>Rollback ready</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg" 
              className="text-lg px-10 py-8 bg-white text-black hover:bg-white/90 shadow-glow border border-white/20 font-semibold"
              data-testid="button-try-demo-hero"
            >
              <Play className="mr-3 h-6 w-6" />
              Try the Demo
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-10 py-8 bg-black/50 backdrop-blur-md border-white/30 text-white hover:bg-black/70 shadow-inner-glow"
              data-testid="button-book-call"
            >
              Book a Call
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </motion.div>
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