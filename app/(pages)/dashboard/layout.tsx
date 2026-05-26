import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { checkUserRole } from "@/lib/auth/checkUserRole";
import { UserRole } from "@/types/user-role";

import { AppSidebar } from "./@doctor/_components/AppSidebar";

// export async function generateMetadata(): Promise<Metadata> {
//   const user = await getDoctorUser();

//   return {
//     title: { default: user.name_en, template: `${user.name_en} | %s` },
//     description: `Dr. ${user.name_en}'s dashboard on MediQueue for managing patients, appointments, schedules, and clinic operations.`,

//     keywords: [
//       user.name_en,
//       "Doctor Dashboard",
//       "Clinic Management",
//       "Appointments",
//       "Patients",
//       "MediQueue",
//       "Healthcare System",
//       "Doctor Profile",
//       "إدارة العيادات",
//       "لوحة تحكم الطبيب",
//       "إدارة المرضى",
//       "حجز المواعيد",
//     ],
//   };
// }

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
