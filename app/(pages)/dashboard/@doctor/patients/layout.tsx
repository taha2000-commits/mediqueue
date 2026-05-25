import { PersonStanding } from "lucide-react";
import { Metadata } from "next";

import { statsServices } from "@/lib/services/stats";

import Stat from "../../_components/Stat";
import SelectedPatientProvider from "../_context/SelectedPatientCtx";
import SelectedPatient from "./_components/SelectedPatient";

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
  const stats = await statsServices.doctor.getPatientsStats();
  if (!stats) return null;
  const {
    active_count,
    inactive_count,
    new_count,
    returning_count,
    all_count,
  } = stats;
  return (
    <SelectedPatientProvider>
      <main className="space-y-3">
        <div className="grid grid-cols-5 gap-3">
          <Stat
            title="total patients"
            value={all_count}
            icon={PersonStanding}
            iconClassName="text-status-completed bg-status-completed/20"
          />
          <Stat
            title="new this month"
            value={new_count}
            icon={PersonStanding}
            iconClassName="text-status-accepted bg-status-accepted/20"
          />
          <Stat
            title="active patients"
            value={active_count}
            icon={PersonStanding}
            iconClassName="text-status-accepted bg-status-accepted/20"
          />
          <Stat
            title="inactive patients"
            value={inactive_count}
            icon={PersonStanding}
            iconClassName="text-status-accepted bg-status-accepted/20"
          />
          <Stat
            title="returning patients"
            value={returning_count}
            icon={PersonStanding}
            iconClassName="text-status-pending bg-status-pending/20"
          />
        </div>
        <div className="flex">
          {children}

          <SelectedPatient />
        </div>
      </main>
    </SelectedPatientProvider>
  );
};

export default layout;
