"use client";

import { CircleCheck, EyeOff, MemoryStick, Users } from "lucide-react";

import { Progress } from "@/components/ui/progress";
import { cn, getCapacityColor } from "@/lib/utils";
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
  return (
    <div className="grid grid-cols-4 gap-3">
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

      <div className="bg-secondary flex flex-col justify-between gap-2 rounded-xl p-4 shadow">
        <div className="flex gap-4">
          <div
            className={cn(
              "h-fit w-fit rounded-full p-2",
              "bg-status-rejected/20",
              {
                "p-3": variant == "lg",
              },
            )}
            style={{
              backgroundColor: capacity
                ? getCapacityColor(capacity) + "33"
                : "#243545",
            }}
          >
            <MemoryStick
              size={variant == "lg" ? 30 : 25}
              color={capacity ? getCapacityColor(capacity) : "#eee"}
            />
          </div>
          <div className="">
            <h4 className="font-semibold capitalize">capacity (today)</h4>
            <div
              className={cn("text-2xl font-bold", {
                "text-xl": variant == "md",
                "text-lg": variant == "sm",
              })}
            >
              {capacity}%
            </div>
          </div>
        </div>
        <Progress
          value={capacity}
          color={capacity ? getCapacityColor(capacity) : "#eee"}
        />
      </div>
    </div>
  );
};

export default DoctorPageStats;
