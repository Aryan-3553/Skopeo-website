import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Grid3x3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "./theme-toggle";
import { Link, useLocation } from "wouter";

const navigation = [
  { name: "Product", href: "/#product-highlights" },
  { name: "Features", href: "/#solution-section" },
  // { name: "Docs", href: "/docs" },
  // { name: "Pricing", href: "/pricing" },
  // { name: "Blog", href: "/blog" },
  // { name: "Security", href: "/security" },
  { name: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // If not on home page, navigate there first
    if (location !== '/') {
      window.location.href = '/';
    } else {
      // Already on home page, just scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-border shadow-glow"
          : "bg-transparent border-transparent"
      }`}
      data-testid="site-header"
    >
      <div 
        className="container flex h-20 items-center" 
        style={{ justifyContent: 'space-between' }}
      >
        <div className="flex items-center space-x-3">
          <div onClick={handleLogoClick} data-testid="link-home">
            <motion.div 
              className="flex items-center space-x-3 hover-elevate rounded-lg px-3 py-2 group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="relative"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Grid3x3 className="h-8 w-8 text-foreground group-hover:text-foreground/80 transition-colors" />
                <div className="absolute inset-0 bg-foreground/20 rounded blur-sm animate-pulse" />
              </motion.div>
              <span className="font-display font-bold text-2xl text-foreground group-hover:text-foreground/80 transition-colors">Skopeo</span>
            </motion.div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => (
            item.name === "Product" ? (
              <div key={item.name} onClick={handleProductClick} data-testid={`link-${item.name.toLowerCase()}`}>
                <div className="text-sm font-medium transition-colors hover-elevate px-3 py-2 rounded-md cursor-pointer text-muted-foreground hover:text-foreground">
                  {item.name}
                </div>
              </div>
            ) : item.name === "Features" ? (
              <div key={item.name} onClick={handleFeaturesClick} data-testid={`link-${item.name.toLowerCase()}`}>
                <div className="text-sm font-medium transition-colors hover-elevate px-3 py-2 rounded-md cursor-pointer text-muted-foreground hover:text-foreground">
                  {item.name}
                </div>
              </div>
            ) : (
              <Link key={item.name} href={item.href} data-testid={`link-${item.name.toLowerCase()}`}>
                <div
                  className={`text-sm font-medium transition-colors hover-elevate px-3 py-2 rounded-md ${
                    location === item.href
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.name}
                </div>
              </Link>
            )
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              data-testid="button-try-demo" 
              className="hidden sm:inline-flex bg-white text-black hover:bg-white/90 font-semibold shadow-glow px-6 py-2"
              asChild
            >
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSe5eDQM8P_Bm9A3RqnV9tYclZDLhNstHqxRxI1dFiVS5WdDuw/viewform?usp=dialog"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join the Waitlist
              </a>
            </Button>
          </motion.div>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4 mt-4">
                {navigation.map((item) => (
                  item.name === "Product" ? (
                    <div key={item.name} onClick={handleProductClick} data-testid={`mobile-link-${item.name.toLowerCase()}`}>
                      <div className="text-sm font-medium py-2 px-3 rounded-md hover-elevate cursor-pointer">
                        {item.name}
                      </div>
                    </div>
                  ) : item.name === "Features" ? (
                    <div key={item.name} onClick={handleFeaturesClick} data-testid={`mobile-link-${item.name.toLowerCase()}`}>
                      <div className="text-sm font-medium py-2 px-3 rounded-md hover-elevate cursor-pointer">
                        {item.name}
                      </div>
                    </div>
                  ) : (
                    <Link key={item.name} href={item.href} data-testid={`mobile-link-${item.name.toLowerCase()}`}>
                      <div className="text-sm font-medium py-2 px-3 rounded-md hover-elevate">
                        {item.name}
                      </div>
                    </Link>
                  )
                ))}
                <Button 
                  className="mt-4" 
                  data-testid="mobile-button-try-demo"
                  asChild
                >
                  <a 
                    href="https://docs.google.com/forms/d/e/1FAIpQLSe5eDQM8P_Bm9A3RqnV9tYclZDLhNstHqxRxI1dFiVS5WdDuw/viewform?usp=dialog"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Join the Waitlist
                  </a>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}