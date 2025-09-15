import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Clock, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setIsSubmitted(true);
    
    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours.",
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      description: "skopeoai@gmail.com",
      action: "mailto:skopeoai@gmail.com"
    },
    // {
    //   icon: Phone,
    //   title: "Phone",
    //   description: "+1 (226) 201-7007",
    //   action: "tel:+12262017007"
    // },
    // {
    //   icon: Phone,
    //   title: "Phone (Alternative)",
    //   description: "+1 (647) 550-8295",
    //   action: "tel:+16475508295"
    // },
    {
      icon: MapPin,
      title: "Office",
      description: "San Francisco, CA",
      action: null
    },
    {
      icon: Clock,
      title: "Response Time",
      description: "Within 24 hours",
      action: null
    }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center" data-testid="contact-success">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-md mx-auto"
        >
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="font-display text-2xl font-bold mb-4">Message Sent!</h1>
          <p className="text-muted-foreground mb-6">
            Thank you for reaching out. Our team will get back to you within 24 hours.
          </p>
          <Button onClick={() => setIsSubmitted(false)} data-testid="button-send-another">
            Send Another Message
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16" data-testid="contact-page">
      <div className="container py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4">Get in Touch</Badge>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Let's discuss your data needs
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to transform your spreadsheet workflows? Our team is here to help you get started with Skopeo.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card data-testid="contact-form-card">
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName" 
                        required 
                        data-testid="input-first-name"
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        required 
                        data-testid="input-last-name"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      required 
                      data-testid="input-email"
                      placeholder="john@company.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input 
                      id="company" 
                      data-testid="input-company"
                      placeholder="Your Company"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select>
                      <SelectTrigger data-testid="select-role">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="analyst">Data Analyst</SelectItem>
                        <SelectItem value="engineer">Data Engineer</SelectItem>
                        <SelectItem value="scientist">Data Scientist</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="executive">Executive</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      required 
                      rows={4}
                      data-testid="textarea-message"
                      placeholder="Tell us about your use case and how we can help..."
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                    data-testid="button-submit-contact"
                  >
                    {isLoading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <Card data-testid="contact-info-card">
              <CardHeader>
                <CardTitle>Get in touch</CardTitle>
                <CardDescription>
                  Prefer to reach out directly? Here are all the ways to contact us.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4" data-testid={`contact-info-${index}`}>
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{info.title}</h3>
                      {info.action ? (
                        <a 
                          href={info.action}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {info.description}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{info.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20" data-testid="enterprise-contact">
              <CardHeader>
                <CardTitle className="text-primary">Enterprise Sales</CardTitle>
                <CardDescription>
                  Need a custom solution for your organization?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Our enterprise team can help with custom deployments, integrations, and enterprise-grade security requirements.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  data-testid="button-enterprise-contact"
                  asChild
                >
                  <a href="mailto:skopeoai@gmail.com?subject=Enterprise Sales Inquiry">
                    Contact Enterprise Sales
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}