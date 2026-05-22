import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Appointment_Status } from "@/types/enums";

interface StatusStatProps {
  title: string;
  statusText?: string;
  icon_bgClass?: string;
  icon_textClass?: string;
  count: number;
  setStatus: React.Dispatch<Appointment_Status | undefined>;
  status: Appointment_Status | undefined;
  icon: LucideIcon;
}

function SmallStatusStat({
  count,
  setStatus,
  status,
  statusText,
  title,
  icon_bgClass,
  icon_textClass,
  icon,
}: StatusStatProps) {
  const Icon = icon;
  return (
    <div
      className={cn(
        "hover:bg-background flex w-full cursor-pointer items-center justify-between gap-4 rounded-md p-1 pe-2",
        status == statusText && "bg-background",
      )}
      onClick={() => setStatus(statusText as Appointment_Status)}
    >
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "h-fit w-fit rounded-full p-2",
            icon_bgClass,
            icon_textClass,
          )}
        >
          <Icon size={16} />
        </div>

        <span className="">{title}</span>
      </div>
      <span className={icon_textClass}>{count}</span>
    </div>
  );
}
export default SmallStatusStat;
