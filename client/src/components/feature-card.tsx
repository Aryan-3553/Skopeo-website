import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  isHighlighted?: boolean;
  learnMoreHref?: string;
}

export function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  features, 
  isHighlighted = false,
  learnMoreHref = "#"
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      data-testid={`feature-card-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <Card className={`h-full hover-elevate transition-all duration-300 ${
        isHighlighted ? 'ring-2 ring-primary/20 shadow-aurora' : ''
      }`}>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${
              isHighlighted ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
            }`}>
              <Icon className="h-6 w-6" />
            </div>
            {isHighlighted && (
              <Badge variant="secondary" className="text-xs">
                Popular
              </Badge>
            )}
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription className="text-base">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
          <Button 
            variant="ghost" 
            className="w-full mt-4 group"
            data-testid={`button-learn-more-${title.toLowerCase().replace(/\s+/g, '-')}`}
          >
            Learn more
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}