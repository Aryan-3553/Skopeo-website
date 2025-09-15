import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Factory, Building2, BarChart3, PieChart, LineChart } from "lucide-react";

const useCases = [
  {
    icon: TrendingUp,
    title: "Finance Ops",
    description: "Streamline financial planning, budgeting, and analysis with AI-powered insights and automated reporting.",
    features: ["Budget variance analysis", "Cash flow forecasting", "Financial modeling", "Automated reports"],
    chartIcon: LineChart,
    badge: "Popular"
  },
  {
    icon: Factory,
    title: "Manufacturing",
    description: "Optimize production planning, inventory management, and quality control with intelligent data analysis.",
    features: ["Production scheduling", "Inventory optimization", "Quality metrics", "Supply chain analysis"],
    chartIcon: BarChart3,
    badge: null
  },
  {
    icon: Building2,
    title: "Public Sector",
    description: "Enhance government operations with transparent, auditable, and efficient data management solutions.",
    features: ["Budget tracking", "Performance metrics", "Compliance reporting", "Resource allocation"],
    chartIcon: PieChart,
    badge: "Secure"
  }
];

export function UseCases() {
  return (
    <section className="py-24" data-testid="use-cases-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Built for real-world use cases
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From financial modeling to operational planning, Skopeo adapts to your industry's unique needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              data-testid={`use-case-card-${useCase.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <Card className="h-full hover-elevate transition-all duration-300 relative overflow-hidden">
                {useCase.badge && (
                  <div className="absolute top-4 right-4">
                    <Badge variant={useCase.badge === "Popular" ? "default" : "secondary"}>
                      {useCase.badge}
                    </Badge>
                  </div>
                )}
                
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <useCase.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="w-8 h-8 rounded bg-muted/50 flex items-center justify-center">
                      <useCase.chartIcon className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{useCase.title}</CardTitle>
                  <CardDescription className="text-base">
                    {useCase.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                      Key Capabilities
                    </h4>
                    <ul className="space-y-2">
                      {useCase.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            Don't see your use case? Skopeo's flexible AI engine adapts to any industry.
          </p>
          <a 
            href="https://docs.google.com/forms/d/e/1FAIpQLSe5eDQM8P_Bm9A3RqnV9tYclZDLhNstHqxRxI1dFiVS5WdDuw/viewform?usp=dialog"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 font-medium hover-elevate px-3 py-2 rounded-md transition-colors inline-block"
          >
            Tell us about your needs →
          </a>
        </motion.div>
      </div>
    </section>
  );
}