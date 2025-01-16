"use client";

import { useState, cloneElement, act, useEffect } from "react";

import FormEx1 from "./FormEx1";
import FormEx2 from "./FormEx2";
import StepperForm from "./StepperForm";

export default function FormEx3() {
  const [stepsStatus, setStepsStatus] = useState([
    {
      step: "1",
      isDone: false,
      component: <FormEx1 />,
    },
    {
      step: "2",
      isDone: false,
      component: <FormEx2 />,
    },
  ]);
  const [activeTab, setActiveTab] = useState("1");

  const handleNextTab = () => {
    setStepsStatus((prevStepsStatus) =>
      prevStepsStatus.map((status) =>
        status.step === activeTab
          ? { ...status, isDone: true } // Create a new object with updated state
          : status
      )
    );

    setActiveTab((prevTab) => {
      const currentIndex = stepsStatus.findIndex(
        (status) => status.step === prevTab
      );
      if (currentIndex < stepsStatus.length - 1) {
        return stepsStatus[currentIndex + 1].step;
      } else {
        return `${+prevTab + 1}`; // Ensure `activeTab` stays a string
      }
    });
  };

  useEffect(() => {
    let ignore = false;
    if (parseInt(activeTab, 10) > stepsStatus.length) {
      if (!ignore) alert("You're done!");
    }

    return () => {
      ignore = true;
    };
  }, [activeTab]);

  return (
    <div>
      {/* <Tabs
        defaultValue="1"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-[400px]"
      >
        <TabsList>
          {stepsStatus.map(({ step, isDone }) => (
            <TabsTrigger
              disabled={isDone}
              key={step}
              value={step}
              className={cn(
                "rounded-full size-10 bg-slate-200 disabled:opacity-100 data-[state=active]:bg-slate-500 data-[state=active]:text-white",
                isDone && "bg-primary text-white"
              )}
            >
              {isDone ? <Check /> : step}
            </TabsTrigger>
          ))}
        </TabsList>

        {stepsStatus.map(({ step, component }) => (
          <TabsContent key={step} value={step}>
            {cloneElement(component, { handleNextTab })}
          </TabsContent>
        ))}
      </Tabs> */}

      <StepperForm />
    </div>
  );
}
