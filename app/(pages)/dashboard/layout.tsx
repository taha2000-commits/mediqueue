import { Metadata } from "next";
import { Fragment } from "react/jsx-runtime";

import { checkUserRole } from "@/lib/auth/checkUserRole";
import { getDoctorUser } from "@/lib/auth/getDoctorUser";
import { UserRole } from "@/types/user-role";

export async function generateMetadata(): Promise<Metadata> {
  const user = await getDoctorUser();

  return {
    title: { default: user.name_en, template: `${user.name_en} | %s` },
    description: `Dr. ${user.name_en}'s dashboard on MediQueue for managing patients, appointments, schedules, and clinic operations.`,

    keywords: [
      user.name_en,
      "Doctor Dashboard",
      "Clinic Management",
      "Appointments",
      "Patients",
      "MediQueue",
      "Healthcare System",
      "Doctor Profile",
      "إدارة العيادات",
      "لوحة تحكم الطبيب",
      "إدارة المرضى",
      "حجز المواعيد",
    ],
  };
}

const layout = async ({ doctor, admin }: LayoutProps<"/dashboard">) => {
  const userRole = await checkUserRole();

  return <Fragment>{userRole == UserRole.Doctor ? doctor : admin}</Fragment>;
};

export default layout;
