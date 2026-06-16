"use client";
import { Users } from "lucide-react";

import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { HospitalAppointmentsStats } from "@/types/stats";

import Stat from "../../_components/Stat";

const AdminDashboardStats = ({
  searchParams,
  am_doctors_count,
  stats,
}: {
  searchParams: Record<string, string | string[] | undefined>;
  am_doctors_count: number;
  stats: HospitalAppointmentsStats;
}) => {
  const { total_appointments, total_patients, total_no_show } = stats;
  const { open } = useSidebar();

  return (
    <div
      className={cn(
        "mx-2 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4",
        {
          "grid-cols-2! lg:grid-cols-3! xl:grid-cols-4!": open,
        },
      )}
    >
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
