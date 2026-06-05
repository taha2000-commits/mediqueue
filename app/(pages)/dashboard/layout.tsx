import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { checkUserRole } from "@/lib/auth/checkUserRole";
import { UserRole } from "@/types/user-role";

import { AppSidebar } from "./@doctor/_components/AppSidebar";

const layout = async ({
  doctor,
  admin,
  history_modal,
}: LayoutProps<"/dashboard">) => {
  const userRole = await checkUserRole();

  return (
    <div className="flex h-full">
      <SidebarProvider>
        <AppSidebar
          role={userRole == UserRole.Doctor ? UserRole.Doctor : UserRole.ADMIN}
        />
        <main className="flex-1 space-y-6 p-6">
          <SidebarTrigger />
          {userRole == UserRole.Doctor ? doctor : admin}
          {history_modal}
        </main>
      </SidebarProvider>
    </div>
  );
};

export default layout;
