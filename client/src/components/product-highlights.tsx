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
    <section className="py-24 bg-muted/30" data-testid="product-highlights-section">
      <div className="container">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className={`${index === 2 ? 'md:col-span-2 lg:col-span-1' : ''} ${
                index >= 3 ? 'md:col-span-1' : ''
              }`}
              data-testid={`highlight-card-${index}`}
            >
              <Card className="h-full hover-elevate transition-all duration-300 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <highlight.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{highlight.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
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