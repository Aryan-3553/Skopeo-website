import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GitBranch } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden" data-testid="cta-section">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-aurora opacity-10" />
      <div 
        className="absolute inset-0 bg-grid-pattern opacity-20" 
        style={{ backgroundSize: '40px 40px' }}
      />
      
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            Make the spreadsheet{" "}
            <span className="text-primary">think with you</span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join thousands of analysts who have already transformed their workflows. 
            Start your journey with AI-native spreadsheets today.
          </p>

          <div className="flex justify-center items-center">
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6 bg-background/50 backdrop-blur-sm"
              data-testid="button-view-github"
              asChild
            >
              <a 
                href="https://github.com/orgs/BetterExcel/repositories"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitBranch className="mr-2 h-5 w-5" />
                View on GitHub
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
