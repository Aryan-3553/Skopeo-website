import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "./theme-toggle";
import { Link, useLocation } from "wouter";

const navigation = [
  { name: "Product", href: "/product" },
  { name: "Features", href: "/features" },
  { name: "Docs", href: "/docs" },
  { name: "Pricing", href: "/pricing" },
  { name: "Blog", href: "/blog" },
  { name: "Security", href: "/security" },
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

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-lg border-white/20 shadow-glow"
          : "bg-transparent border-transparent"
      }`}
      data-testid="site-header"
    >
      <div 
        className="container flex h-20 items-center" 
        style={{ justifyContent: 'space-between' }}
      >
        <div className="flex items-center space-x-3">
          <Link href="/" data-testid="link-home">
            <motion.div 
              className="flex items-center space-x-3 hover-elevate rounded-lg px-3 py-2 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="relative"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <img 
                  src="/images/skopeo-logo.svg" 
                  alt="Skopeo Logo" 
                  className="h-8 w-8 group-hover:opacity-80 transition-opacity"
                />
                <div className="absolute inset-0 bg-white/10 rounded-full blur-sm animate-pulse" />
              </motion.div>
              <span className="font-display font-bold text-2xl text-white group-hover:text-white/80 transition-colors">Skopeo</span>
            </motion.div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => (
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
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              data-testid="button-try-demo" 
              className="hidden sm:inline-flex bg-white text-black hover:bg-white/90 font-semibold shadow-glow px-6 py-2"
            >
              Try the Demo
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
                  <Link key={item.name} href={item.href} data-testid={`mobile-link-${item.name.toLowerCase()}`}>
                    <div className="text-sm font-medium py-2 px-3 rounded-md hover-elevate">
                      {item.name}
                    </div>
                  </Link>
                ))}
                <Button className="mt-4" data-testid="mobile-button-try-demo">
                  Try the Demo
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}