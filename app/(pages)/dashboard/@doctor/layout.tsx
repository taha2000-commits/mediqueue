import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { AppSidebar } from "./_components/AppSidebar";
import { RequestsContextProvider } from "./_context/RequestsContext";

const layout = ({ children, modal }: LayoutProps<"/dashboard">) => {
  return (
    <RequestsContextProvider>
      <div className="flex h-full">
        <SidebarProvider>
          <AppSidebar />
          <main className="flex-1 space-y-6 p-6">
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
      </div>
      {modal}
    </RequestsContextProvider>
  );
};

export default layout;
