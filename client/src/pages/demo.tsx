import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, RotateCcw, CheckCircle, AlertCircle, Info } from "lucide-react";

const demoSteps = [
  {
    id: 1,
    title: "Select Data Range",
    description: "Choose cells A1:E100 containing sales data",
    status: "completed"
  },
  {
    id: 2,
    title: "AI Analysis Request",
    description: "Type: 'normalize sales by month and build a pivot with slicer'",
    status: "completed"
  },
  {
    id: 3,
    title: "AI Processing",
    description: "Skopeo analyzes data structure and generates formulas",
    status: "processing"
  },
  {
    id: 4,
    title: "Results & Tests",
    description: "Generated pivot table with automatic tests and explanations",
    status: "pending"
  }
];

const mockData = [
  ["Month", "Product", "Sales", "Region", "Rep"],
  ["Jan", "Widget A", "5000", "North", "John"],
  ["Jan", "Widget B", "3000", "South", "Sarah"],
  ["Feb", "Widget A", "5500", "North", "John"],
  ["Feb", "Widget B", "3200", "South", "Sarah"],
  ["Mar", "Widget A", "4800", "North", "John"],
];

export default function Demo() {
  const [currentStep, setCurrentStep] = useState(3);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep(4);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const resetDemo = () => {
    setCurrentStep(1);
    setIsProcessing(true);
    setTimeout(() => setCurrentStep(3), 1000);
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep(4);
    }, 4000);
  };

  return (
    <div className="min-h-screen pt-16" data-testid="demo-page">
      <div className="container py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4">Interactive Demo</Badge>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
            See Skopeo in Action
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Watch how AI transforms raw data into insights with cell-level provenance and automated testing
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Spreadsheet Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card data-testid="demo-spreadsheet">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Sales Data - Q1 2024</CardTitle>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                  </div>
                </div>
                <CardDescription>
                  Raw sales data ready for AI analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md bg-muted/30 p-4">
                  <div className="grid grid-cols-5 gap-2 text-xs font-mono">
                    {mockData.map((row, rowIndex) => (
                      row.map((cell, cellIndex) => (
                        <div
                          key={`${rowIndex}-${cellIndex}`}
                          className={`p-2 border border-border rounded text-center ${
                            rowIndex === 0 
                              ? 'bg-primary/10 font-semibold' 
                              : 'bg-background hover-elevate'
                          } ${
                            rowIndex > 0 && rowIndex <= 2 && cellIndex <= 4
                              ? 'ring-2 ring-primary/50'
                              : ''
                          }`}
                        >
                          {cell}
                        </div>
                      ))
                    ))}
                  </div>
                  
                  {currentStep >= 3 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-3 bg-primary/10 rounded-md border border-primary/20"
                    >
                      <div className="font-mono text-sm">
                        <span className="text-primary">AI Formula:</span>{" "}
                        {isProcessing ? (
                          <span className="animate-pulse">Generating...</span>
                        ) : (
                          "=PIVOT(A1:E100, 'Month', SUM('Sales'), GROUP_BY('Product'))"
                        )}
                      </div>
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Process Steps & Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Process Steps */}
            <Card data-testid="demo-process">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Process Steps
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetDemo}
                    data-testid="button-reset-demo"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {demoSteps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`flex items-start space-x-3 p-3 rounded-md transition-all ${
                      currentStep >= step.id ? 'bg-muted/50' : 'opacity-50'
                    }`}
                    data-testid={`demo-step-${step.id}`}
                  >
                    <div className="mt-1">
                      {step.status === "completed" ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : step.status === "processing" ? (
                        <div className="h-5 w-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium">{step.title}</h4>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Results Panel */}
            {currentStep >= 4 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card data-testid="demo-results">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>AI Analysis Complete</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">Pivot table generated with 3 dimensions</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Auto-generated 5 validation tests</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Info className="h-4 w-4 text-purple-500" />
                        <span className="text-sm">Cell-level provenance recorded</span>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-2">AI Explanation:</h4>
                      <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
                        "I've normalized your sales data by month and created a pivot table that groups by product. 
                        The formula aggregates sales figures and provides month-over-month comparisons. 
                        All calculations are tested and traceable to source cells."
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center"
            >
              <Button className="w-full" data-testid="button-try-real-demo">
                <Play className="h-4 w-4 mr-2" />
                Try the Real Demo
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                This is a simplified preview. The actual demo includes full interactivity.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}