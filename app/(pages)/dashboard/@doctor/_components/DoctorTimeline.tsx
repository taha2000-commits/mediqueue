import {
  CircleCheckBig,
  CircleDashed,
  LoaderCircle,
  LucideIcon,
} from "lucide-react";

import StatusBadge from "@/app/components/StatusBadge";
import { Separator } from "@/components/ui/separator";
import { cn, formatTime } from "@/lib/utils";
import { AppointmentWithPriority } from "@/types/appointments";

import EmptySection from "./EmptySection";
const StatusIconsAndColors: Record<
  string,
  {
    icon: LucideIcon;
    icon_colorClass: string;
    icon_bgClass: string;
    icon_borderClass: string;
  }
> = {
  accepted: {
    icon: CircleDashed,
    icon_colorClass: "text-status-accepted",
    icon_bgClass: "bg-status-accepted/40",
    icon_borderClass: "border-status-accepted",
  },
  completed: {
    icon: CircleCheckBig,
    icon_colorClass: "text-status-completed",
    icon_bgClass: "bg-status-completed/40",
    icon_borderClass: "border-status-completed",
  },
  in_progress: {
    icon: LoaderCircle,
    icon_colorClass: "text-status-in-progress",
    icon_bgClass: "bg-status-in-progress/40",
    icon_borderClass: "border-status-in-progress",
  },
};
function DoctorTimeline({
  appointments,
}: {
  appointments: AppointmentWithPriority[];
}) {
  const apps = appointments.filter(
    (app) =>
      app.status === "completed" ||
      app.status === "accepted" ||
      app.status === "in_progress",
  );

  return (
    <div className="bg-secondary border-border h-fit flex-1 rounded-2xl border p-6">
      <h3 className="text-xl font-semibold">Todays Appointments</h3>
      <Separator className="mt-2 mb-4" />
      <div className="capitalize">
        {apps?.[0] ? (
          apps.map((app) => {
            const time = formatTime(app.time, "HH:mm aa");

            const { icon, icon_bgClass, icon_borderClass, icon_colorClass } =
              StatusIconsAndColors[app.status];
            const Icon = icon;
            return (
              <div
                key={app.id}
                className="grid grid-cols-5 first:[&_.line]:rounded-t-full last:[&_.line]:rounded-b-full"
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold">{time}</div>
                  <div
                    className={cn(
                      "bg-muted-foreground line relative h-full w-0.75",
                      icon_bgClass,
                    )}
                  >
                    <div
                      className={cn(
                        "absolute inset-x-0 top-0 h-full",
                        icon_bgClass,
                      )}
                    ></div>

                    <div
                      className={cn(
                        "bg-secondary absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border",
                        icon_borderClass,
                      )}
                    >
                      <Icon size={22} className={icon_colorClass} />
                    </div>
                  </div>
                </div>
                <div className="col-span-4 flex items-center justify-between p-5 py-3 ps-7">
                  <div className="leading-4">
                    <h6 className="font-bold">{app.patient.name}</h6>

                    <span className="text-muted-foreground text-xs">
                      {app.type.split("_").join(" ")}
                    </span>
                  </div>
                  <StatusBadge
                    status={app.status}
                    text={app.status === "accepted" ? "upcoming" : app.status}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <EmptySection
            title="No appointments Today"
            description="There are no scheduled appointments for today."
          />
        )}
      </div>
    </div>
  );
}
export default DoctorTimeline;
