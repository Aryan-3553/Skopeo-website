import { FeatureCard } from '../feature-card';
import { MessageSquare, Brain, Layers, Shield, Zap } from 'lucide-react';

export default function FeatureCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <FeatureCard
        icon={MessageSquare}
        title="Conversational UI"
        description="Ask questions directly in the grid and get intelligent responses with explanations."
        features={[
          "Natural language queries",
          "Contextual responses", 
          "Interactive explanations",
          "Quick formula generation"
        ]}
        isHighlighted={true}
      />
      <FeatureCard
        icon={Brain}
        title="AI-Native"
        description="Built from the ground up with AI at its core, not as an afterthought."
        features={[
          "Multi-LLM support",
          "Smart formula suggestions",
          "Automated testing",
          "Context awareness"
        ]}
      />
      <FeatureCard
        icon={Shield}
        title="Self-Hosted"
        description="Keep your data secure and maintain complete control over your infrastructure."
        features={[
          "On-premises deployment",
          "VPC compatibility",
          "Data residency control",
          "Enterprise security"
        ]}
      />
    </div>
  );
}