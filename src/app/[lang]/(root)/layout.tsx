import SsaemSidebar from "@/components/layout/root/SsaemSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const DEFAULT_ACTIVE_WINDOW = "/sentences";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <SsaemSidebar defaultActiveWindow={DEFAULT_ACTIVE_WINDOW} />
      {children}
    </SidebarProvider>
  );
}
