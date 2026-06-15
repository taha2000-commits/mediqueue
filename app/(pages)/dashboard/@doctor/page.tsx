import { format } from "date-fns";
import { Metadata } from "next";

import { getUser } from "@/lib/auth/getUser";
import { appointmentsService } from "@/lib/services/appointments";
import { statsServices } from "@/lib/services/stats";

import ActionsSection from "./_components/ActionsSection";
import DoctorQueue from "./_components/DoctorQueue";
import Stats from "./_components/DoctorStats";
import DoctorTimeline from "./_components/DoctorTimeline";
import PendingRequestsSection from "./_components/PendingRequestsSection";
import TodayAppointmentsSec from "./_components/TodayAppointmentsSec";

export const metadata: Metadata = {
  title: "Dashboard",
};

const Page = async ({ searchParams }: PageProps<"/dashboard">) => {
  const sp = await searchParams;
  const { results: appointments } = await appointmentsService.getAll({
    params: { date: format(new Date(), "yyyy-MM-dd"), sort: "oldest" },
  });
  const user = await getUser();

  const appointments_stats = await statsServices.doctor.getStats(`${user?.id}`);
  const patients_stats = await statsServices.getPatientsStats({
    doctor_id: `${user?.id}`,
  });
  return (
    <div className="space-y-4">
      <div className="p-2">
        <h2 className="text-2xl font-bold capitalize" id="el">
          Dashboard overview
        </h2>
        <p className="text-muted-foreground">
          Monitor your clinic activities and performance. Get insights into
          appointments, patients, and schedules at a glance.
        </p>
      </div>
      <Stats
        stats={{ appointments: appointments_stats, patients: patients_stats }}
      />

      <div className="flex flex-col flex-wrap gap-5 sm:flex-row">
        <div className="flex-1 space-y-5">
          <ActionsSection appointments={appointments} dashboardSection />
          <DoctorQueue appointments={appointments} dashboardSection />

          <PendingRequestsSection appointments={appointments} />
        </div>
        <div className="flex-1 space-y-5">
          <DoctorTimeline appointments={appointments} />

          <TodayAppointmentsSec searchParams={sp} />
        </div>
      </div>
    </div>
  );
};

export default Page;
