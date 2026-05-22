import { Users } from "lucide-react";

import { hospitalService } from "@/lib/services/hospital";

import Stat from "../../_components/Stat";

const AdminDashboardStats = async () => {
  const {
    doctors_count,
    today_appointments_count,
    patients_count,
    no_show_appointments_count,
  } = await hospitalService.getStats();

  return (
    <div className="grid h-fit grid-cols-4 gap-3">
      <Stat
        icon={Users}
        title="total doctors"
        value={doctors_count}
        iconClassName="text-primary bg-primary/10"
        chart={{
          num: 1,
          fillClass: "fill-primary/20",
          strokeClass: "stroke-primary",
        }}
      />
      <Stat
        icon={Users}
        title="appointments today"
        value={today_appointments_count}
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
        value={patients_count}
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
        value={no_show_appointments_count}
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
