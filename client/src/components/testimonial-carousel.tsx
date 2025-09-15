import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Testimonial {
  id: number;
  content: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    content: "Skopeo completely transformed how our finance team works with data. The AI-native approach means we spend less time wrestling with formulas and more time on insights.",
    author: "Sarah Chen",
    role: "VP of Finance",
    company: "TechFlow"
  },
  {
    id: 2,
    content: "The self-hosted deployment gave us the security control we needed while the AI features boosted our analysts' productivity by 60%. It's the best of both worlds.",
    author: "Michael Rodriguez",
    role: "Data Engineering Lead",
    company: "ScaleUp Inc"
  },
  {
    id: 3,
    content: "Having cell-level provenance and automated testing built-in means we can trust our models in production. Skopeo isn't just a spreadsheet, it's our data foundation.",
    author: "Dr. Emily Watson",
    role: "Chief Data Officer",
    company: "InnovateLab"
  },
  {
    id: 4,
    content: "The multi-LLM routing is brilliant. We can use the right AI model for each task while keeping everything in one unified platform. Our team adoption was immediate.",
    author: "James Thompson",
    role: "Head of Analytics",
    company: "DataWorks"
  }
];

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <></>
    // <section className="py-24 bg-muted/30" data-testid="testimonials-section">
    //   <div className="container">
    //     <motion.div
    //       initial={{ opacity: 0, y: 20 }}
    //       whileInView={{ opacity: 1, y: 0 }}
    //       transition={{ duration: 0.6 }}
    //       viewport={{ once: true }}
    //       className="text-center mb-16"
    //     >
    //       <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
    //         Trusted by data teams worldwide
    //       </h2>
    //       <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
    //         See how teams are transforming their data workflows with Skopeo
    //       </p>
    //     </motion.div>

    //     <div className="relative max-w-4xl mx-auto">
    //       <AnimatePresence mode="wait">
    //         <motion.div
    //           key={currentIndex}
    //           initial={{ opacity: 0, x: 20 }}
    //           animate={{ opacity: 1, x: 0 }}
    //           exit={{ opacity: 0, x: -20 }}
    //           transition={{ duration: 0.5 }}
    //           data-testid={`testimonial-${currentIndex}`}
    //         >
    //           <Card className="bg-card/50 backdrop-blur-sm border-card-border">
    //             <CardContent className="p-8 md:p-12">
    //               <div className="flex flex-col items-center text-center space-y-6">
    //                 <Quote className="h-8 w-8 text-primary/60" />
                    
    //                 <blockquote className="text-lg md:text-xl leading-relaxed max-w-3xl">
    //                   "{testimonials[currentIndex].content}"
    //                 </blockquote>
                    
    //                 <div className="flex items-center space-x-4">
    //                   <Avatar className="h-12 w-12">
    //                     <AvatarImage src={testimonials[currentIndex].avatar} />
    //                     <AvatarFallback>
    //                       {testimonials[currentIndex].author.split(' ').map(n => n[0]).join('')}
    //                     </AvatarFallback>
    //                   </Avatar>
    //                   <div className="text-left">
    //                     <div className="font-semibold">{testimonials[currentIndex].author}</div>
    //                     <div className="text-sm text-muted-foreground">
    //                       {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             </CardContent>
    //           </Card>
    //         </motion.div>
    //       </AnimatePresence>

    //       {/* Navigation Buttons */}
    //       <Button
    //         variant="outline"
    //         size="icon"
    //         className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm"
    //         onClick={goToPrevious}
    //         data-testid="button-testimonial-previous"
    //       >
    //         <ChevronLeft className="h-4 w-4" />
    //       </Button>
          
    //       <Button
    //         variant="outline"
    //         size="icon"
    //         className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm"
    //         onClick={goToNext}
    //         data-testid="button-testimonial-next"
    //       >
    //         <ChevronRight className="h-4 w-4" />
    //       </Button>

    //       {/* Dots Indicator */}
    //       <div className="flex justify-center space-x-2 mt-8">
    //         {testimonials.map((_, index) => (
    //           <button
    //             key={index}
    //             className={`w-2 h-2 rounded-full transition-all ${
    //               index === currentIndex ? 'bg-primary w-6' : 'bg-muted-foreground/30'
    //             }`}
    //             onClick={() => goToSlide(index)}
    //             data-testid={`testimonial-dot-${index}`}
    //           />
    //         ))}
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
}