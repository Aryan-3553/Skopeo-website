import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, ArrowRight } from "lucide-react";

const problems = [
  {
    title: "Wrangling CSVs/APIs/DBs",
    description: "Data integration is brittle and error-prone in traditional spreadsheets",
    icon: AlertTriangle,
    chips: ["Manual imports", "Broken connections", "Version conflicts"]
  },
  {
    title: "Debugging Complex Formulas",
    description: "Understanding nested formulas without lineage is pure guesswork",
    icon: AlertTriangle,
    chips: ["Black box logic", "No trace history", "Silent failures"]
  },
  {
    title: "Documentation Overhead",
    description: "Manually documenting every step becomes outdated instantly",
    icon: AlertTriangle,
    chips: ["Manual docs", "Outdated info", "Knowledge silos"]
  }
];

const solutions = [
  {
    title: "Intelligent Data Handling",
    description: "AI-powered data connectors with automatic schema detection and error recovery",
    benefits: ["Auto-healing connections", "Smart schema mapping", "Version control"]
  },
  {
    title: "Cell-Level Provenance",
    description: "Every formula comes with full lineage, explanation, and testing built-in",
    benefits: ["Visual lineage", "Auto-generated tests", "Click-to-trace"]
  },
  {
    title: "Self-Documenting Workflows",
    description: "AI automatically generates and maintains documentation as you work",
    benefits: ["Live documentation", "Auto-explanations", "Knowledge sharing"]
  }
];

export function ProblemSolution() {
  return (
    <section className="py-32 relative overflow-hidden" data-testid="problem-solution-section">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 bg-mesh opacity-20" />
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/3 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="container relative z-10">
        {/* Problems Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="destructive" className="mb-4">
            The Problem
          </Badge>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Spreadsheets weren't built for modern data workflows
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Traditional spreadsheets create more problems than they solve when dealing with complex data
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 30, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, rotateY: 5, scale: 1.02 }}
              data-testid={`problem-card-${index}`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Card className="h-full border-red-500/30 bg-red-50/50 dark:bg-red-950/20 backdrop-blur-sm shadow-glow hover:shadow-red-500/20 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="p-3 bg-red-500/20 rounded-lg">
                      <problem.icon className="h-7 w-7 text-red-500 dark:text-red-400" />
                    </div>
                    <h3 className="font-bold text-xl text-foreground">{problem.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{problem.description}</p>
                  <div className="flex flex-wrap gap-3">
                    {problem.chips.map((chip, chipIndex) => (
                      <Badge key={chipIndex} variant="outline" className="text-xs bg-red-100/60 dark:bg-red-950/40 border-red-500/40 text-red-700 dark:text-red-300 hover:bg-red-200/80 dark:hover:bg-red-950/60">
                        {chip}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Arrow Transition */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center mb-16"
        >
          <div className="bg-primary/10 p-4 rounded-full">
            <ArrowRight className="h-8 w-8 text-primary" />
          </div>
        </motion.div>

        {/* Solutions Section */}
        <motion.div
          id="solution-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            The Solution
          </Badge>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            AI-native design solves these problems at the core
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Skopeo rebuilds the spreadsheet from the ground up with AI and modern data practices
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 30, rotateY: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, rotateY: -5, scale: 1.02 }}
              data-testid={`solution-card-${index}`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Card className="h-full border-green-400/30 bg-green-50/50 dark:bg-green-950/20 backdrop-blur-sm shadow-glow hover:shadow-green-400/20 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="p-3 bg-green-400/20 rounded-lg">
                      <CheckCircle className="h-7 w-7 text-green-500 dark:text-green-400" />
                    </div>
                    <h3 className="font-bold text-xl text-foreground">{solution.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{solution.description}</p>
                  <ul className="space-y-3">
                    {solution.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center space-x-3 text-sm">
                        <div className="w-2 h-2 rounded-full bg-green-500 dark:bg-green-400 animate-pulse" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}