import { Hero } from "@/components/hero";
import { LogoCloud } from "@/components/logo-cloud";
import { ProblemSolution } from "@/components/problem-solution";
import { ProductHighlights } from "@/components/product-highlights";
import { UseCases } from "@/components/use-cases";
import { SecurityHighlights } from "@/components/security-highlights";
import { PricingTable } from "@/components/pricing-table";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { CTASection } from "@/components/cta-section";

export default function Home() {
  return (
    <div className="w-full" data-testid="home-page">
      <Hero />
      <LogoCloud />
      <ProblemSolution />
      <ProductHighlights />
      <UseCases />
      {/* <SecurityHighlights /> */}
      {/* <PricingTable /> */}
      <TestimonialCarousel />
      <CTASection />
    </div>
  );
}