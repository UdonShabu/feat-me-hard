import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import FormEx2 from "./FormEx2";

const StepperForm = () => {
  const handleNext = () => {
    setCompletedSteps((prev) => [...new Set([...prev, activeStep])]);

    const currentIndex = steps.findIndex((step) => step.id === activeStep);
    if (currentIndex < steps.length - 1) {
      setActiveStep(steps[currentIndex + 1].id);
    }
  };

  const steps = [
    { id: "1", label: "Step 1", content: <Step1 handleNext={handleNext} /> },
    { id: "2", label: "Step 2", content: <Step2 /> },
  ];

  const [activeStep, setActiveStep] = useState(steps[0].id);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [isAllStepsCompleted, setIsAllStepsCompleted] = useState(false);

  const handlePrevious = () => {
    const currentIndex = steps.findIndex((step) => step.id === activeStep);
    if (currentIndex > 0) {
      setActiveStep(steps[currentIndex - 1].id);
    }
  };

  const handleValueChange = (newValue: string) => {
    setActiveStep(newValue);

    // Set check circle back to number when click
    if (completedSteps.includes(newValue)) {
      const slideToIdx = completedSteps.findIndex((id) => id === newValue);
      setCompletedSteps(completedSteps.slice(0, slideToIdx));
    }
  };

  // Usage in Tabs
  <Tabs value={activeStep} onValueChange={handleValueChange} className="w-full">
    {/* Tabs content */}
  </Tabs>;

  // Check if all steps are completed
  useEffect(() => {
    if (
      completedSteps.length === steps.length &&
      !isAllStepsCompleted // Ensure alert happens only once
    ) {
      setIsAllStepsCompleted(true);
    }
  }, [completedSteps, steps.length, isAllStepsCompleted]);

  // Alert after all steps are completed
  useEffect(() => {
    if (isAllStepsCompleted) {
      alert("Success! You've completed all steps.");
    }
  }, [isAllStepsCompleted]);

  return (
    <div className="max-w-md mx-auto mt-8">
      <Tabs
        value={activeStep}
        // onValueChange={handleValueChange}
        className="w-full"
      >
        {/* Stepper Header */}
        <TabsList className="flex justify-between">
          {steps.map((step) => (
            <TabsTrigger
              key={step.id}
              value={step.id}
              className={`w-full flex items-center justify-center rounded-full cursor-default ${
                step.id === activeStep
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {completedSteps.includes(step.id) ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                step.label
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Stepper Content */}
        {steps.map((step) => (
          <TabsContent key={step.id} value={step.id} className="mt-4">
            {step.content}

            <div className="flex justify-between mt-4">
              {+activeStep > 1 && (
                <Button variant="outline" onClick={handlePrevious}>
                  Previous
                </Button>
              )}
              {/* <Button onClick={handleNext}>
                {activeStep !== steps[steps.length - 1].id ? "Next" : "Finish"}
              </Button> */}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

const Step1 = ({ handleNext }: { handleNext: () => void }) => {
  return (
    <div>
      <FormEx2 handleNext={handleNext} />
    </div>
  );
};
const Step2 = () => <div>Step 2 Content</div>;

export default StepperForm;
