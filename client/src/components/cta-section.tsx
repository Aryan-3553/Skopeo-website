import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, GitBranch } from "lucide-react";

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

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 shadow-aurora group"
              data-testid="button-start-free-trial"
            >
              <Play className="mr-2 h-5 w-5" />
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6 bg-background/50 backdrop-blur-sm"
              data-testid="button-view-github"
            >
              <GitBranch className="mr-2 h-5 w-5" />
              View on GitHub
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground"
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>30-day free trial</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              <span>Cancel anytime</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}