import { motion } from "framer-motion";

const trustedCompanies = [
  "Acme Corp",
  "TechFlow",
  "DataWorks",
  "CloudSys",
  "InnovateLab",
  "ScaleUp Inc",
  "NextGen Solutions",
  "ProAnalytics"
];

export function LogoCloud() {
  return (
    <section className="py-16 bg-muted/30" data-testid="logo-cloud-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Trusted by forward-thinking teams
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center justify-items-center">
          {trustedCompanies.map((company, index) => (
            <motion.div
              key={company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
              data-testid={`logo-${company.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="h-8 flex items-center justify-center text-muted-foreground font-medium text-sm hover-elevate px-3 py-2 rounded-md transition-colors">
                {company}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}