import { motion } from "framer-motion";

const trustedCompanies = [
  { name: "University of Waterloo", logo: "UniversityOfWaterloo_logo_horiz_rev.png", logoScale: 1.3 },
  { name: "CauseWay Capital Management LLC", logo: "causeway.png", logoScale: 1.0 },
  { name: "Velocity", logo: "velocity-logo.avif", logoScale: 1.0 },
  { name: "AMD", logo: "amd.png", logoScale: 1.0 },
  { name: "Hack the North", logo: null, logoScale: 1.0 },
  { name: "Nokia", logo: null, logoScale: 1.0 },
  { name: "Vertex AI", logo: null, logoScale: 1.0 },
  { name: "BTNX", logo: null, logoScale: 1.0 },
];

export function LogoCloud() {
  return (
    <section className="py-10 relative overflow-hidden" data-testid="logo-cloud-section">
      {/* Simple black background */}
      <div className="absolute inset-0 bg-black" />

      <div className="container relative z-10">
        {/* Separator */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex items-center justify-center mb-12"
        >
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </motion.div>

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
        
        {/* Framer-style Logo Carousel */}
        <div 
          className="relative"
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            maxWidth: '100%',
            maxHeight: '100%',
            placeItems: 'center',
            margin: '0px',
            padding: '0px',
            listStyleType: 'none',
            opacity: 1,
            maskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%)',
            overflow: 'hidden'
          }}
        >
          <motion.ul
            className="flex items-center"
            style={{
              display: 'flex',
              width: '100%',
              height: '100%',
              maxWidth: '100%',
              maxHeight: '100%',
              placeItems: 'center',
              margin: '0px',
              padding: '0px',
              listStyleType: 'none',
              gap: '40px',
              position: 'relative',
              flexDirection: 'row',
              willChange: 'transform'
            }}
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
              <motion.li
                key={`${company.name}-${index}`}
                className="flex-shrink-0"
                style={{
                  flexShrink: 0
                }}
                data-testid={`logo-${company.name.toLowerCase().replace(/\s+/g, '-')}-${index}`}
              >
                {company.logo ? (
                  <div 
                    className="relative flex items-center justify-center"
                    style={{
                      width: '140px', // Standard container width
                      height: '45px', // Standard container height
                      position: 'relative',
                      borderRadius: 'inherit',
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: 0
                    }}
                  >
                    <img 
                      alt={company.name}
                      className="object-contain object-center"
                      style={{
                        display: 'block',
                        width: 'auto',
                        height: 'auto',
                        maxWidth: `${100 * company.logoScale}%`,
                        maxHeight: `${100 * company.logoScale}%`,
                        borderRadius: 'inherit',
                        objectPosition: 'center',
                        objectFit: 'contain'
                      }}
                      src={`/images/${company.logo}`}
                    />
                  </div>
                ) : null}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}