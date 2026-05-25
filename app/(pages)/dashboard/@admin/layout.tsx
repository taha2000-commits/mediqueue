import { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Admin Dashboard", template: "Admin Dashboard | %s" },

  description:
    "Overview of hospital performance, doctors, appointments, patients, and daily operations through the MediQueue admin dashboard.",

  keywords: [
    "Admin Dashboard",
    "Hospital Management",
    "Clinic Operations",
    "Healthcare Analytics",
    "Doctors Management",
    "Appointments Management",
    "Patients Management",
    "MediQueue",
    "لوحة تحكم الادمن",
    "إدارة المستشفيات",
    "إدارة العيادات",
    "إدارة الأطباء",
    "تقارير العيادة",
    "نظام إدارة طبي",
  ],

  openGraph: {
    title: "Admin Dashboard | MediQueue",
    description:
      "Monitor hospital performance and manage healthcare operations with MediQueue.",
    siteName: "MediQueue",
    locale: "ar_EG",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Admin Dashboard | MediQueue",
    description:
      "Overview of hospital and clinic operations through the MediQueue admin dashboard.",
  },

  robots: {
    index: false,
    follow: false,
  },
};

const layout = ({ children, doctor_modal }: LayoutProps<"/dashboard">) => {
  return (
    <div>
      {children}
      {doctor_modal}
    </div>
  );
};

export default layout;
