import { Users } from "lucide-react";

import { statsServices } from "@/lib/services/stats";
import { DoctorStatsPeriod } from "@/types/stats";

import Stat from "../../_components/Stat";

const AdminDashboardStats = async ({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) => {
  const { am_doctors_count } = await statsServices.hospital.getDoctorsStats();
  const { total_appointments, total_no_show, total_patients } =
    await statsServices.hospital.getStats(
      !searchParams.period || searchParams.period == "all_time"
        ? undefined
        : (searchParams.period as DoctorStatsPeriod),
    );

  return (
    <div className="grid h-fit grid-cols-4 gap-3">
      <Stat
        icon={Users}
        title="total doctors"
        value={am_doctors_count}
        iconClassName="text-primary bg-primary/10"
        chart={{
          num: 1,
          fillClass: "fill-primary/20",
          strokeClass: "stroke-primary",
        }}
      />
      <Stat
        icon={Users}
        title="appointments"
        value={total_appointments}
        iconClassName="text-status-completed bg-status-completed/10"
        chart={{
          num: 0,
          fillClass: "fill-status-completed/20",
          strokeClass: "stroke-status-completed",
        }}
      />
      <Stat
        icon={Users}
        title="total patients"
        value={total_patients}
        iconClassName="text-status-pending bg-status-pending/10"
        chart={{
          num: 2,
          fillClass: "fill-status-pending/20",
          strokeClass: "stroke-status-pending",
        }}
      />
      <Stat
        icon={Users}
        title="no-show rate"
        value={total_no_show}
        iconClassName="text-status-no-show bg-status-no-show/10"
        chart={{
          num: 3,
          fillClass: "fill-status-no-show/20",
          strokeClass: "stroke-status-no-show",
        }}
      />
    </div>
  );
};

export default AdminDashboardStats;
