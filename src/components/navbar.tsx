"use client";

import { Search } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey && event.key === "k") {
        event.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <nav className="flex space-x-10 items-center">
      <Image
        src="/logos/world.svg"
        width={40}
        height={40}
        alt="Picture of the author"
      />
      <div
        onClick={() => setIsOpen(true)}
        className="bg-slate-200 hover:cursor-pointer w-48 h-8 pl-2 rounded-xl flex items-center justify-between"
      >
        <div className="flex gap-2">
          <Search width={16} />
          <p>Search</p>
        </div>
        <span className="px-3">⌘K</span>
      </div>
      <SearchDialog isOpen={isOpen} setIsOpen={setIsOpen} />
      <ul>
        <li>
          {" "}
          <h2 className="text-2xl font-bold ml-4">Exercises</h2>{" "}
        </li>
      </ul>
    </nav>
  );
}

type SearchDialogProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};
export function SearchDialog({ isOpen, setIsOpen }: SearchDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="hidden">
          <DialogTitle>Search</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 ">
          <div className="items-center  w-full flex">
            <Search width={16} />
            <Input
              id="name"
              type="text"
              placeholder="Search documentation"
              className="focus:outline-none border-none  p-2"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
