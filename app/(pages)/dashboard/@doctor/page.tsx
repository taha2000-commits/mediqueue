import { format } from "date-fns";

import { appointmentsService } from "@/lib/services/appointments";

import ActionsSection from "./_components/ActionsSection";
import DoctorQueue from "./_components/DoctorQueue";
import Stats from "./_components/DoctorStats";
import DoctorTimeline from "./_components/DoctorTimeline";
import PendingRequestsSection from "./_components/PendingRequestsSection";
import TodayAppointmentsSec from "./_components/TodayAppointmentsSec";

const Page = async ({ searchParams }: PageProps<"/dashboard">) => {
  const sp = await searchParams;
  const { results: appointments } = await appointmentsService.getAll({
    params: { date: format(new Date(), "yyyy-MM-dd"), sort: "oldest" },
  });

  return (
    <div className="space-y-6">
      <Stats />

      <div className="flex gap-5">
        <div className="flex-1 space-y-5">
          <DoctorQueue appointments={appointments} />

          <PendingRequestsSection appointments={appointments} />
        </div>
        <div className="flex-1 space-y-5">
          <ActionsSection appointments={appointments} />
          <DoctorTimeline appointments={appointments} />

          <TodayAppointmentsSec searchParams={sp} />
        </div>
      </div>
    </div>
  );
};

export default Page;
