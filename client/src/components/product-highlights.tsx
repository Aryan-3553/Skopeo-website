import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, FileImage, Brain, Target, User } from "lucide-react";

const highlights = [
  {
    icon: MessageSquare,
    title: "Conversational UI",
    description: "Ask questions directly in selected ranges and get formulas, pivots, or charts with full explanations and quick tests."
  },
  {
    icon: FileImage,
    title: "Multimodal",
    description: "Handle tables, text, images, and files (CSV/JSON/DB) with replayable steps and spill-safe views for beyond-grid data."
  },
  {
    icon: Brain,
    title: "Model Choice",
    description: "Pick OpenAI, Anthropic, DeepSeek, or xAI's Grok per task/sheet/workspace with policy-driven routing."
  },
  {
    icon: Target,
    title: "Context-Aware",
    description: "Uses selection, headers, history, and prior steps with clickable lineage to source ranges and data."
  },
  {
    icon: User,
    title: "Personalization",
    description: "Guided Mode with guardrails and one-click tests • Power Mode with inline editor and 'why this works' traces."
  }
];

export function ProductHighlights() {
  return (
    <section id="product-highlights" className="py-32 relative overflow-hidden" data-testid="product-highlights-section">
      {/* Dynamic 3D Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20" style={{ backgroundSize: '60px 60px' }} />
      
      {/* Floating 3D cubes */}
      <div className="absolute top-20 left-1/4 w-8 h-8 bg-white/10 rotate-45 animate-spin-slow" />
      <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-white/15 rotate-45 animate-spin-slow" style={{ animationDelay: '2s', animationDirection: 'reverse' }} />
      <div className="absolute bottom-1/4 left-1/3 w-10 h-10 bg-white/5 rotate-45 animate-spin-slow" style={{ animationDelay: '4s' }} />
      
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Five pillars of AI-native spreadsheets
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Built from the ground up to put artificial intelligence at the heart of data work
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.title}
              initial={{ opacity: 0, y: 40, rotateX: 20 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, rotateX: -10, scale: 1.05 }}
              className={`${index === 2 ? 'md:col-span-2 lg:col-span-1' : ''} ${
                index >= 3 ? 'md:col-span-1' : ''
              }`}
              data-testid={`highlight-card-${index}`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Card className="h-full bg-black/40 backdrop-blur-lg border border-white/20 shadow-floating hover:shadow-glow transition-all duration-500">
                <CardHeader className="pb-4">
                  <motion.div 
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center mb-6 relative overflow-hidden"
                    whileHover={{ rotateY: 180 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent animate-pulse-slow" />
                    <highlight.icon className="h-8 w-8 text-white relative z-10" />
                  </motion.div>
                  <CardTitle className="text-2xl font-bold text-white mb-2">{highlight.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-lg leading-relaxed text-white/70">
                    {highlight.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}