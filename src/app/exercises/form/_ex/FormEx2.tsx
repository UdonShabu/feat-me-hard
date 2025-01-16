"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function FormEx2({ handleNext }: { handleNext?: () => void }) {
  const [selectedPassions, setSelectedPassions] = useState<string[]>([]);

  const passions = ["Cow", "Milk", "Whey", "Cheese", "Yogurt", "Whipped Cream"];
  const MINIMUM_PASSIONS = 2;
  const MAX_PASSIONS = 4;

  const disabledPassions = selectedPassions.length >= MAX_PASSIONS;
  const disabledBtn = selectedPassions.length < MINIMUM_PASSIONS;

  const handleClick = (nextPassion: string) => {
    let newPassions: string[];

    if (selectedPassions.includes(nextPassion)) {
      newPassions = selectedPassions.filter((p) => p !== nextPassion);
    } else {
      newPassions = disabledPassions
        ? [...selectedPassions]
        : [...selectedPassions, nextPassion];
    }
    setSelectedPassions(newPassions);
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">My Passions</h1>
      <p className="mb-6 ">Select passions that you'd like to share.</p>

      <ul className="flex w-[300px] gap-3 flex-wrap mb-6 justify-center">
        {passions.map((passion) => (
          <li key={passion}>
            <Button
              variant="outline"
              className={cn(
                "border-2 px-2 rounded-full w-fit h-8",
                selectedPassions.includes(passion)
                  ? "border-secondary text-secondary hover:text-primary"
                  : "border-slate-400 text-slate-400 hover:text-slate-400"
              )}
              onClick={() => handleClick(passion)}
            >
              {passion}
            </Button>
          </li>
        ))}
      </ul>

      <Button
        disabled={disabledBtn}
        onClick={() => handleNext && handleNext()}
        className="self-center rounded-full w-40 "
      >
        <p className="font-bold text-lg">Done</p>{" "}
        <span className="text-xs">
          {`${selectedPassions.length}/${MAX_PASSIONS}`}
        </span>
      </Button>
    </div>
  );
}
