"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export interface ISidebarMenu {
  label: string;
  href?: string;
  subMenus?: ISidebarMenu[];
}

export default function Sidebar({
  menus,
}: Readonly<{
  menus: ISidebarMenu[];
}>) {
  const [showSidebar, setShowSidebar] = useState(true);
  const handleClick = () => {
    setShowSidebar(false);
  };
  return (
    <div className="z-50">
      <aside
        className={cn(
          "bg-white w-screen sm:w-80 h-screen border-r-2 border-slate-100 pr-2 pt-2",
          !showSidebar && "w-10"
        )}
      >
        <div className="pl-2 hover:cursor-pointer w-10 block sm:hidden">
          {showSidebar ? (
            <X onClick={() => setShowSidebar(false)} />
          ) : (
            <Menu onClick={() => setShowSidebar(true)} />
          )}
        </div>

        <ul className={cn("pr-2 sm:block", !showSidebar && "hidden")}>
          {menus.map((menu) => (
            <div key={menu.label}>
              {menu.subMenus ? (
                <Accordion type="single" collapsible>
                  <AccordionItem value={menu.label}>
                    <AccordionTrigger className="pb-2">
                      <h3 className="text-lg font-bold pl-2">{menu.label}</h3>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul>
                        {menu?.subMenus?.map((subMenu) => (
                          <MenuItem
                            menu={subMenu}
                            key={subMenu.label}
                            onSidebarClick={handleClick}
                          />
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ) : (
                <MenuItem menu={menu} onSidebarClick={handleClick} />
              )}
            </div>
          ))}
        </ul>
      </aside>
    </div>
  );
}

function MenuItem({
  menu,
  onSidebarClick,
}: {
  menu: ISidebarMenu;
  onSidebarClick: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === menu.href;

  return (
    <li
      key={menu.label}
      className={cn(
        "rounded-r-xl p-2",
        isActive && "bg-teal-100 text-teal-700 font-black",
        !isActive && "hover:bg-slate-100"
      )}
    >
      <Link href={menu.href || ""} onClick={onSidebarClick}>
        <p className=" w-full font-light">{menu.label}</p>
      </Link>
    </li>
  );
}
