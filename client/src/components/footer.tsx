import { Grid3x3, Github, Twitter, Linkedin, Mail } from "lucide-react";
import { Link } from "wouter";

const footerSections = [
  {
    title: "Product",
    links: [
      { name: "Features", href: "/features" },
      { name: "Pricing", href: "/pricing" },
      { name: "Demo", href: "/demo" },
      { name: "Security", href: "/security" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Documentation", href: "/docs" },
      { name: "Changelog", href: "/changelog" },
      { name: "Community", href: "/community" },
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
  { name: "GitHub", href: "https://github.com/skopeo", icon: Github },
  { name: "Twitter", href: "https://twitter.com/skopeo", icon: Twitter },
  { name: "LinkedIn", href: "https://linkedin.com/company/skopeo", icon: Linkedin },
  { name: "Email", href: "mailto:hello@skopeo.ai", icon: Mail },
];

export function Footer() {
  return (
    <footer className="border-t bg-background" data-testid="site-footer">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" data-testid="footer-logo">
              <div className="flex items-center space-x-2 mb-4">
                <Grid3x3 className="h-6 w-6 text-primary" />
                <span className="font-display font-bold text-xl">Skopeo</span>
              </div>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              The self-hosted, AI-native spreadsheet that thinks like an analyst. 
              Transform your data workflows with intelligent automation.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-muted-foreground hover:text-foreground hover-elevate p-2 rounded-md"
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
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} data-testid={`footer-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}>
                      <div className="text-muted-foreground hover:text-foreground hover-elevate px-2 py-1 rounded-md transition-colors text-sm">
                        {link.name}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t pt-8 mt-16 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-sm text-muted-foreground">
            © 2024 Skopeo. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 text-sm">
            <span className="text-muted-foreground">
              Built with{" "}
              <span className="text-red-500">♥</span>{" "}
              for analysts everywhere
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}