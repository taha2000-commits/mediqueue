"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

function SidebarTriggerBtn() {
  const isMobile = useIsMobile();
  if (isMobile)
    return (
      <SidebarTrigger className="bg-secondary border-border border border-s-0" />
    );
}
export default SidebarTriggerBtn;
