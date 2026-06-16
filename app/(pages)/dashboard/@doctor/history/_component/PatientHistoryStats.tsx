"use client";
import { FileText } from "lucide-react";

import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { AppointmentWithPriority } from "@/types/appointments";
import { Appointment_Status } from "@/types/enums";

import Stat from "../../../_components/Stat";

const PatientHistoryStats = ({
  appointments,
}: {
  appointments: AppointmentWithPriority[];
}) => {
  const { open } = useSidebar();
  function numOfRequests(status?: Appointment_Status) {
    if (!status) return appointments.length;
    return appointments.filter((req) => req.status == status).length;
  }

  return (
    <div
      className={cn("grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4", {
        "grid-cols-2! lg:grid-cols-3! xl:grid-cols-4!": open,
      })}
    >
      <Stat
        title="total appointments"
        value={appointments.length}
        icon={FileText}
        iconClassName="text-tertiary bg-tertiary/20"
        chart={{
          num: 1,
          fillClass: "fill-tertiary/20",
          strokeClass: "stroke-tertiary",
        }}
      />
      <Stat
        title="completed appointments"
        value={numOfRequests("completed")}
        icon={FileText}
        iconClassName="text-status-completed bg-status-completed/20"
        chart={{
          num: 0,
          fillClass: "fill-status-completed/20",
          strokeClass: "stroke-status-completed",
        }}
      />
      <Stat
        title="rejected appointments"
        value={numOfRequests("rejected")}
        icon={FileText}
        iconClassName="text-status-rejected bg-status-rejected/20"
        chart={{
          num: 2,
          fillClass: "fill-status-rejected/20",
          strokeClass: "stroke-status-rejected",
        }}
      />
      <Stat
        title="pending appointments"
        value={numOfRequests("pending")}
        icon={FileText}
        iconClassName="text-status-pending bg-status-pending/20"
        chart={{
          num: 3,
          fillClass: "fill-status-pending/20",
          strokeClass: "stroke-status-pending",
        }}
      />
    </div>
  );
};

export default PatientHistoryStats;
