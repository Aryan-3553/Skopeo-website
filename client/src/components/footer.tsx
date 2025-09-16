import { Grid3x3, Github, Linkedin, Mail } from "lucide-react";
import { Link, useLocation } from "wouter";

const footerSections = [
  {
    title: "Product",
    links: [
      { name: "Features", href: "/features" },
      { name: "Demo", href: "/demo" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Team", href: "/team" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Documentation", href: "/docs" },
      { name: "Support", href: "/support" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/legal/privacy" },
      { name: "Terms of Service", href: "/legal/terms" },
      { name: "Cookie Policy", href: "/legal/cookies" },
      { name: "DPA", href: "/legal/dpa" },
    ],
  },
];

const socialLinks = [
  { name: "GitHub", href: "https://github.com/orgs/BetterExcel/repositories", icon: Github },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/skopeo-ai/about/?viewAsMember=true", icon: Linkedin },
  { name: "Email", href: "mailto:skopeoai@gmail.com", icon: Mail },
];

export function Footer() {
  const [location] = useLocation();

  const handleFeaturesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // If not on home page, navigate there first
    if (location !== '/') {
      window.location.href = '/#solution-section';
    } else {
      // Already on home page, just scroll
      const element = document.getElementById('solution-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleProductClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // If not on home page, navigate there first
    if (location !== '/') {
      window.location.href = '/#product-highlights';
    } else {
      // Already on home page, just scroll
      const element = document.getElementById('product-highlights');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="border-t border-white/20 bg-black relative" data-testid="site-footer">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" style={{ backgroundSize: '40px 40px' }} />
      <div className="container py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" data-testid="footer-logo">
              <div className="flex items-center space-x-3 mb-6 group">
                <div className="relative">
                  <Grid3x3 className="h-8 w-8 text-white group-hover:text-white/80 transition-colors" />
                  <div className="absolute inset-0 bg-white/20 rounded blur-sm animate-pulse" />
                </div>
                <span className="font-display font-bold text-2xl text-white group-hover:text-white/80 transition-colors">Skopeo</span>
              </div>
            </Link>
            <p className="text-white/70 mb-8 max-w-sm leading-relaxed">
              The self-hosted, AI-native spreadsheet that thinks like an analyst. 
              Transform your data workflows with intelligent automation.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-white/60 hover:text-white hover-elevate p-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:shadow-glow"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`social-link-${social.name.toLowerCase()}`}
                >
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="lg:col-span-1">
              <h3 className="font-bold mb-6 text-white text-lg">{section.title}</h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {link.name === "Features" ? (
                      <div onClick={handleFeaturesClick} data-testid={`footer-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}>
                        <div className="text-white/60 hover:text-white hover-elevate px-3 py-2 rounded-lg transition-all duration-300 text-sm group cursor-pointer">
                          <span className="group-hover:translate-x-1 transition-transform inline-block">{link.name}</span>
                        </div>
                      </div>
                    ) : (
                      <Link href={link.href} data-testid={`footer-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}>
                        <div className="text-white/60 hover:text-white hover-elevate px-3 py-2 rounded-lg transition-all duration-300 text-sm group">
                          <span className="group-hover:translate-x-1 transition-transform inline-block">{link.name}</span>
                        </div>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-10 mt-20 flex flex-col sm:flex-row justify-between items-center space-y-6 sm:space-y-0">
          <p className="text-sm text-white/60">
            © 2025 Skopeo. All rights reserved.
          </p>
          <div className="flex items-center space-x-8 text-sm">
            <span className="text-white/60">
              Built with{" "}
              <span className="text-red-400 animate-pulse">♥</span>{" "}
              for analysts everywhere
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
