import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { sideMenus, sideMenuGroups } from "@/config/menus";

export default function ExercisesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <header className="w-full h-14 shadow-md px-4 py-2 sticky top-0 z-50">
        <Navbar />
      </header>
      <div className="flex">
        {/* <Sidebar menus={sideMenus} /> */}
        <Sidebar menus={sideMenuGroups} />
        <main className="bg-slate-50 w-full">{children}</main>
      </div>
    </div>
  );
}
