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
  const pathname = usePathname();

  return (
    <div>
      <aside className="w-80 h-screen border-r-2 border-slate-100 pr-2">
        <ul>
          <Accordion type="single" collapsible className="w-full">
            {menus.map((menu) => (
              <>
                {menu.subMenus ? (
                  <MenuGroup menu={menu} key={menu.label} />
                ) : (
                  <Link key={menu.label} href={menu.href || ""}>
                    <p className="bg-red-400 w-full">{menu.label}</p>
                  </Link>
                )}
              </>
            ))}
          </Accordion>
        </ul>
      </aside>
    </div>
  );
}

function MenuGroup({ menu }: { menu: ISidebarMenu }) {
  return (
    <AccordionItem value={menu.label}>
      <AccordionTrigger>{menu.label}</AccordionTrigger>
      <AccordionContent>
        <ul>
          {menu?.subMenus?.map((subMenu) => (
            <li>
              <Link key={subMenu.label} href={subMenu.href || ""}>
                <p className="bg-red-400 w-full">{subMenu.label}</p>
              </Link>
            </li>
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
}
