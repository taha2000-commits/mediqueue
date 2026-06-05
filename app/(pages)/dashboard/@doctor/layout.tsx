import { Metadata } from "next";

import { getDoctorUser } from "@/lib/auth/getDoctorUser";

import { RequestsContextProvider } from "./_context/RequestsContext";

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
const layout = ({ children }: LayoutProps<"/dashboard">) => {
  return <RequestsContextProvider>{children}</RequestsContextProvider>;
};

export default layout;
