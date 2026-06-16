"use client";
import { CircleCheck, EyeOff, MemoryStick, Users } from "lucide-react";

import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { PatientStats } from "@/types/patients";
import { DoctorStats } from "@/types/stats";

import Stat from "../../_components/Stat";

const DoctorPageStats = ({
  stats,
  capacity,
  variant = "lg",
  patients_stats,
}: {
  stats: DoctorStats | undefined;
  patients_stats: PatientStats | undefined;
  capacity: number | undefined;
  variant?: "lg" | "md" | "sm";
}) => {
  const noshowRate =
    stats?.total_no_show &&
    stats?.total_appointments &&
    (stats?.total_no_show / stats?.total_appointments) * 100;

  const { open } = useSidebar();
  return (
    <div
      className={cn("grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4", {
        "grid-cols-2! lg:grid-cols-3! xl:grid-cols-4!": open,
      })}
    >
      <Stat
        title="total appointments"
        value={stats?.total_appointments ?? 0}
        iconClassName="text-status-completed bg-status-completed/10"
        icon={Users}
        chart={{
          num: 2,
          fillClass: "fill-status-completed/20",
          strokeClass: "stroke-status-completed",
        }}
        variant={variant}
      />

      <Stat
        title="total patients"
        value={patients_stats?.all_count ?? 0}
        icon={CircleCheck}
        iconClassName="text-green-600 bg-green-600/20"
        chart={{
          num: 1,
          fillClass: "fill-status-accepted/20",
          strokeClass: "stroke-status-accepted",
        }}
        variant={variant}
      />

      <Stat
        title="no show rate"
        value={`${noshowRate?.toFixed(2)}%`}
        icon={EyeOff}
        iconClassName="text-status-no-show bg-status-no-show/20"
        chart={{
          num: 1,
          fillClass: "fill-status-no-show/20",
          strokeClass: "stroke-status-no-show",
        }}
        variant={variant}
      />
      <Stat
        title="capacity (today)"
        value={`${capacity}%`}
        icon={MemoryStick}
        iconClassName="text-[#eee] bg-[#eee]/20"
        chart={{
          num: 4,
          fillClass: "fill-[#eee]/20",
          strokeClass: "stroke-[#eee]",
        }}
        variant={variant}
      />
    </div>
  );
};

export default DoctorPageStats;
