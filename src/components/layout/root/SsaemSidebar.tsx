"use client";
import { BookOpen, Languages, Pencil } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

type Window = {
  href: string;
  title: string;
  icon: any;
};

const windows: Window[] = [
  { href: "/sentences", title: "Sentences", icon: <Pencil /> },
  { href: "/vocabulary", title: "Vocabulary", icon: <BookOpen /> },
  { href: "/grammars", title: "Grammars", icon: <Languages /> },
];

export default function SsaemSidebar({
  defaultActiveWindow,
}: Readonly<{ defaultActiveWindow: string }>) {
  const [activeWindow, setActiveWindow] = useState<string>(defaultActiveWindow);

  return (
    <>
      <Sidebar collapsible="offcanvas">
        <SidebarHeader>ssaem</SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            {windows.map((window) => (
              <SidebarMenuItem key={window.href}>
                <SidebarMenuButton
                  onClick={() => setActiveWindow(window.href)}
                  isActive={window.href == activeWindow}
                >
                  {window.icon}
                  <Link href={window.href}>{window.title}</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarTrigger className="p-5" />
    </>
  );
}
