import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Lock, Globe, FileText, ArrowRight } from "lucide-react";

const securityFeatures = [
  {
    icon: Shield,
    title: "SSO & Authentication",
    description: "SAML, OIDC, and enterprise SSO providers with multi-factor authentication support."
  },
  {
    icon: Lock,
    title: "On-Premises Deployment",
    description: "Full control with VPC deployment options and air-gapped installations for maximum security."
  },
  {
    icon: Globe,
    title: "Data Residency",
    description: "Keep your data in your preferred region with complete sovereignty and compliance control."
  },
  {
    icon: FileText,
    title: "Audit & Compliance",
    description: "Comprehensive audit logs, SOC 2 compliance pathway, and enterprise-grade security controls."
  }
];

export function SecurityHighlights() {
  return (
    <section className="py-24 bg-muted/30" data-testid="security-highlights-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Enterprise-grade security & self-hosting
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Take full control of your data with robust security features designed for regulated industries
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              data-testid={`security-feature-${index}`}
            >
              <Card className="h-full hover-elevate transition-all duration-300 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
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
          className="text-center"
        >
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center">
            <Button variant="outline" className="group" data-testid="button-security-details">
              Learn about our security
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <span className="text-muted-foreground text-sm">
              SOC 2 Type II • GDPR Compliant • HIPAA Ready
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}