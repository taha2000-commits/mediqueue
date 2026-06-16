import { Metadata } from "next";

import SidebarTriggerBtn from "@/app/components/SidebarTriggerBtn";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getDoctorUser } from "@/lib/auth/getDoctorUser";
import { getUser } from "@/lib/auth/getUser";
import { UserRole } from "@/types/user-role";

import { AppSidebar } from "./@doctor/_components/AppSidebar";

export async function generateMetadata(): Promise<Metadata | undefined> {
  const user = await getUser();

  const role = user?.user_metadata?.userRole;

  const baseMetadata: Pick<Metadata, "robots"> = {
    robots: {
      index: false,
      follow: false,
    },
  };

  if (role === UserRole.ADMIN) {
    return {
      ...baseMetadata,

      title: {
        default: "Admin Dashboard",
        template: "Admin Dashboard | %s",
      },

      description:
        "Manage doctors, patients, appointments, and hospital operations in MediQueue.",

      openGraph: {
        title: "Admin Dashboard | MediQueue",
        description:
          "Manage doctors, patients, appointments, and hospital operations in MediQueue.",
        siteName: "MediQueue",
        type: "website",
      },

      twitter: {
        card: "summary_large_image",
        title: "Admin Dashboard | MediQueue",
        description:
          "Manage doctors, patients, appointments, and hospital operations in MediQueue.",
      },
    };
  }

  if (role === UserRole.Doctor) {
    const doctor = await getDoctorUser();

    if (!doctor) return undefined;

    return {
      ...baseMetadata,

      title: {
        default: doctor.name_en,
        template: `${doctor.name_en} | %s`,
      },

      description: `Manage appointments, patients, schedules, and clinic activities for ${doctor.name_en}.`,

      openGraph: {
        title: `${doctor.name_en} | MediQueue`,
        description: `Doctor dashboard for managing appointments and patients.`,
        siteName: "MediQueue",
        type: "profile",
      },

      twitter: {
        card: "summary_large_image",
        title: `${doctor.name_en} | MediQueue`,
        description: `Doctor dashboard for managing appointments and patients.`,
      },
    };
  }

  return undefined;
}

const layout = async ({ doctor, admin }: LayoutProps<"/dashboard">) => {
  const user = await getUser();

  return (
    <div className="flex h-full">
      <SidebarProvider>
        <AppSidebar user={user} />
        <main className="bg-secondary flex-1">
          <div className="bg-background border-border w-full space-y-4 rounded-2xl border p-2 sm:p-4">
            <div className="m-2 mb-4">
              <SidebarTriggerBtn />
            </div>
            {user?.user_metadata?.userRole == UserRole.Doctor ? doctor : admin}
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
};

export default layout;
