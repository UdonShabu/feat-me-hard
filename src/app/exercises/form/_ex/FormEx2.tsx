"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function FormEx2() {
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
      // 🎯 Target: Handle multiple selections with active color
      // 🧀 Here
    }
    setSelectedPassions(newPassions);
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">My Passions</h1>
      <p className="mb-6 ">Select passions that you'd like to share.</p>

      {/* 🧀 Here */}
      <ul className="flex  mb-6 justify-center">
        {passions.map((passion) => (
          <li key={passion}>
            <Button
              variant="outline"
              className={cn(
                "border-2 px-2 rounded-full w-fit h-8"
                // 🧀 Here
                // : "border-slate-400 text-slate-400 hover:text-slate-400"
              )}
              onClick={() => handleClick(passion)}
            >
              {passion}
            </Button>
          </li>
        ))}
      </ul>

      <Button disabled={disabledBtn} className="self-center rounded-full w-40 ">
        <p className="font-bold text-lg">Done</p>{" "}
        <span className="text-xs">
          {`${selectedPassions.length}/${MAX_PASSIONS}`}
        </span>
      </Button>
    </div>
  );
}
