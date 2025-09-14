import { motion } from "framer-motion";

const trustedCompanies = [
  "Acme Corp",
  "TechFlow", 
  "DataWorks",
  "CloudSys",
  "InnovateLab",
  "ScaleUp Inc",
  "NextGen Solutions",
  "ProAnalytics",
  "Quantum Labs",
  "CyberForge",
  "NeuralLink",
  "FutureTech"
];

export function LogoCloud() {
  return (
    <section className="py-24 relative overflow-hidden" data-testid="logo-cloud-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.p 
            className="text-lg font-medium text-white/80 uppercase tracking-wider"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            style={{
              background: "linear-gradient(90deg, rgba(255,255,255,0.4), rgba(255,255,255,0.8), rgba(255,255,255,0.4))",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}
          >
            Trusted by forward-thinking teams
          </motion.p>
        </motion.div>
        
        {/* Moving Logo Carousel */}
        <div className="relative">
          <div className="flex overflow-hidden">
            <motion.div
              className="flex space-x-12 items-center"
              animate={{
                x: [0, -100 * trustedCompanies.length/2]
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear",
                },
              }}
            >
              {[...trustedCompanies, ...trustedCompanies].map((company, index) => (
                <motion.div
                  key={`${company}-${index}`}
                  className="flex-shrink-0 text-center"
                  whileHover={{ scale: 1.1, y: -5 }}
                  data-testid={`logo-${company.toLowerCase().replace(/\s+/g, '-')}-${index}`}
                >
                  <div className="h-12 min-w-[180px] flex items-center justify-center text-white/60 hover:text-white/90 font-medium text-base px-6 py-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:shadow-glow">
                    {company}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {/* Gradient Overlays */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        </div>
      </div>
    </section>
  );
}