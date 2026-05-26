import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Patients",
  description:
    "Manage and view patient records, appointments, and medical information بسهولة من خلال منصة MediQueue لإدارة العيادات والأطباء في مصر.",
  keywords: [
    "MediQueue",
    "Patients Management",
    "Doctor Dashboard",
    "Medical Patients",
    "Clinic Management System",
    "Patient Records",
    "Medical App Egypt",
    "Healthcare Dashboard",
    "إدارة المرضى",
    "برنامج إدارة عيادات",
    "عيادات مصر",
    "ملفات المرضى",
    "تطبيق للأطباء",
  ],
};

const layout = async ({ children }: LayoutProps<"/dashboard/patients">) => {
  return children;
};

export default layout;
