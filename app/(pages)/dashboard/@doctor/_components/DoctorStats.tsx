"use client";
import {
  ArrowUpRight,
  CircleCheck,
  Clock4,
  ClockAlert,
  ClockFading,
  UserRound,
} from "lucide-react";

import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { PatientStats } from "@/types/patients";
import { DoctorStats } from "@/types/stats";

import Stat from "../../_components/Stat";

export default function Stats({
  stats,
}: {
  stats: { appointments: DoctorStats; patients: PatientStats };
}) {
  const { open } = useSidebar();

  const {
    appointments: {
      total_accepted,
      total_appointments,
      total_pending,
      total_completed,
    },
    patients: { all_count, new_count },
  } = stats;

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5",
        { "grid-cols-2! gap-2! lg:grid-cols-3! xl:grid-cols-5!": open },
      )}
    >
      <Stat
        title="total appointments"
        value={total_appointments}
        icon={UserRound}
        iconClassName="text-primary bg-primary/20"
        chart={{
          num: 3,
          fillClass: "fill-primary/20",
          strokeClass: "stroke-primary",
        }}
      />
      <Stat
        title="Waiting Now"
        value={total_accepted}
        icon={Clock4}
        iconClassName="text-amber-600 bg-amber-600/20"
        chart={{
          num: 3,
          fillClass: "fill-amber-600/20",
          strokeClass: "stroke-amber-600",
        }}
      />
      <Stat
        title="Completed"
        value={total_completed}
        icon={CircleCheck}
        iconClassName="text-green-600 bg-green-600/20"
        chart={{
          num: 2,
          fillClass: "fill-green-600/20",
          strokeClass: "stroke-green-600",
        }}
      />
      <Stat
        title="Pending Requests"
        value={total_pending}
        icon={ClockAlert}
        iconClassName="text-tertiary bg-tertiary/20"
        chart={{
          num: 1,
          fillClass: "fill-tertiary/20",
          strokeClass: "stroke-tertiary",
        }}
      />
      <Stat
        title="Patients"
        value={all_count}
        icon={ClockFading}
        iconClassName="text-status-accepted bg-status-accepted/20"
        chart={{
          num: 0,
          fillClass: "fill-status-accepted/20",
          strokeClass: "stroke-status-accepted",
        }}
        description={
          <div className="flex flex-wrap items-center gap-1 text-xs font-medium text-green-500 sm:text-sm">
            <p>{(new_count * (all_count / 100)).toFixed(2)}%</p>
            <ArrowUpRight className="ms-1 inline size-3.5 sm:size-4" />
            <span>new this month</span>
          </div>
        }
      />
    </div>
  );
}
