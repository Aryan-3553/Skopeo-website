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
    <section className="py-24" data-testid="problem-solution-section">
      <div className="container">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              data-testid={`problem-card-${index}`}
            >
              <Card className="h-full border-destructive/20 bg-destructive/5">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <problem.icon className="h-6 w-6 text-destructive" />
                    <h3 className="font-semibold text-lg">{problem.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">{problem.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {problem.chips.map((chip, chipIndex) => (
                      <Badge key={chipIndex} variant="outline" className="text-xs">
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              data-testid={`solution-card-${index}`}
            >
              <Card className="h-full border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20 hover-elevate">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                    <h3 className="font-semibold text-lg">{solution.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">{solution.description}</p>
                  <ul className="space-y-2">
                    {solution.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center space-x-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        <span>{benefit}</span>
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