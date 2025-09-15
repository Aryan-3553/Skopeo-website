import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
  ctaVariant?: "default" | "outline";
}

const pricingTiers: PricingTier[] = [
  {
    name: "Community",
    price: "Free",
    description: "Perfect for individuals and small projects",
    features: [
      "Open source foundation",
      "Basic AI formulas",
      "Community support",
      "Self-hosting ready",
      "Up to 3 users"
    ],
    ctaText: "Get Started",
    ctaVariant: "outline"
  },
  {
    name: "Team",
    price: "$15",
    description: "For growing teams that need more power",
    features: [
      "Everything in Community",
      "Advanced AI features",
      "Multi-LLM routing",
      "Priority support",
      "Up to 50 users",
      "SSO integration",
      "Audit logs"
    ],
    isPopular: true,
    ctaText: "Start Free Trial",
    ctaVariant: "default"
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For organizations with advanced requirements",
    features: [
      "Everything in Team",
      "Unlimited users",
      "On-premises support",
      "Custom integrations",
      "24/7 phone support",
      "SLA guarantee",
      "Compliance features",
      "Dedicated success manager"
    ],
    ctaText: "Contact Sales",
    ctaVariant: "outline"
  }
];

export function PricingTable() {
  return (
    <section className="py-24" data-testid="pricing-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your needs. All plans include our core AI features.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              data-testid={`pricing-card-${tier.name.toLowerCase()}`}
            >
              <Card className={`relative h-full hover-elevate transition-all duration-300 ${
                tier.isPopular ? 'ring-2 ring-primary/20 shadow-aurora scale-105' : ''
              }`}>
                {tier.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">
                      {tier.price === "Custom" ? tier.price : `$${tier.price}`}
                    </span>
                    {tier.price !== "Custom" && tier.price !== "Free" && (
                      <span className="text-muted-foreground">/month</span>
                    )}
                  </div>
                  <CardDescription className="mt-2">
                    {tier.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    className="w-full" 
                    variant={tier.ctaVariant}
                    data-testid={`button-cta-${tier.name.toLowerCase()}`}
                  >
                    {tier.ctaText}
                  </Button>
                </CardFooter>
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
          <p className="text-muted-foreground">
            All plans include 30-day free trial • No setup fees • Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}