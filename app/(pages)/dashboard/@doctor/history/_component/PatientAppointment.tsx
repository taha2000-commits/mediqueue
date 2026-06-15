import { format } from "date-fns";
import {
  CircleCheckBig,
  CircleX,
  Clock3,
  LucideIcon,
  Users,
} from "lucide-react";

import { cn, formatTime } from "@/lib/utils";
import { AppointmentWithPriority } from "@/types/appointments";
import { Appointment_Status } from "@/types/enums";

const StatusIconsAndColors: Record<
  Appointment_Status,
  {
    icon: LucideIcon;
    icon_colorClass: string;
    icon_bgClass: string;
    icon_borderClass: string;
  }
> = {
  accepted: {
    icon: CircleCheckBig,
    icon_colorClass: "text-status-accepted",
    icon_bgClass: "bg-status-accepted/10",
    icon_borderClass: "border-status-accepted",
  },
  pending: {
    icon: Clock3,
    icon_colorClass: "text-status-pending",
    icon_bgClass: "bg-status-pending/10",
    icon_borderClass: "border-status-pending",
  },
  cancelled: {
    icon: CircleX,
    icon_colorClass: "text-status-cancelled",
    icon_bgClass: "bg-status-cancelled/10",
    icon_borderClass: "border-status-cancelled",
  },
  completed: {
    icon: CircleCheckBig,
    icon_colorClass: "text-status-completed",
    icon_bgClass: "bg-status-completed/10",
    icon_borderClass: "border-status-completed",
  },
  in_progress: {
    icon: Clock3,
    icon_colorClass: "text-status-in-progress",
    icon_bgClass: "bg-status-in-progress/10",
    icon_borderClass: "border-status-in-progress",
  },
  rejected: {
    icon: CircleX,
    icon_colorClass: "text-status-rejected",
    icon_bgClass: "bg-status-rejected/10",
    icon_borderClass: "border-status-rejected",
  },
  "no-show": {
    icon: Users,
    icon_colorClass: "text-status-no-show",
    icon_bgClass: "bg-status-no-show/10",
    icon_borderClass: "border-status-no-show",
  },
};

const PatientAppointment = ({
  appointment,
}: {
  appointment: AppointmentWithPriority;
}) => {
  const { icon, icon_bgClass, icon_borderClass, icon_colorClass } =
    StatusIconsAndColors[appointment.status];
  const Icon = icon;
  return (
    <div
      className={cn(
        "grid grid-cols-4 md:grid-cols-6 dark:bg-transparent",
        icon_bgClass,
      )}
    >
      <div className="relative">
        <div
          className={cn(
            "absolute left-1/2 z-1 h-full w-px -translate-x-1/2",
            icon_bgClass.split("/")[0],
          )}
        ></div>
        <div
          className={cn(
            "bg-secondary absolute top-1/2 left-1/2 z-2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border",
            icon_borderClass,
          )}
        >
          <div className={cn("p-2", icon_bgClass)}>
            <Icon className={icon_colorClass} size={18} />
          </div>
        </div>
      </div>
      <div className="border-b-border flex flex-col items-center justify-center border-b p-2 text-xs">
        <span className="text-muted-foreground">
          {format(appointment.date, "MMM")}
        </span>
        <span className="text-xl font-black">
          {format(appointment.date, "dd")}
        </span>
        <span className="text-muted-foreground">
          {format(appointment.date, "yyyy")}
        </span>
      </div>
      <div className="border-b-border flex flex-col items-center justify-center gap-1 border-b">
        <span className="text-muted-foreground">
          {formatTime(appointment.time, "HH:mm aa")}
        </span>
        <span className="text-muted-foreground">thursday</span>
      </div>
      <div className="border-b-border flex items-center justify-center border-b">
        <p className="truncate px-2 text-ellipsis">
          {appointment.type.split("_").join(" ")}
        </p>
      </div>

      <div className="border-b-border col-span-2 hidden items-center border-b p-2 text-xs md:flex">
        <span className="w-full truncate text-ellipsis">
          {appointment.notes == "" ? "-" : appointment.notes}
        </span>
      </div>
    </div>
  );
};

export default PatientAppointment;
