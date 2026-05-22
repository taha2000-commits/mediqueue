import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Appointment_Status } from "@/types/enums";

const statusClass = {
  pending:
    "bg-status-pending/20 text-status-pending [&_span]:bg-status-pending",
  accepted:
    "bg-status-accepted/20 text-status-accepted [&_span]:bg-status-accepted",
  rejected:
    "bg-status-rejected/20 text-status-rejected [&_span]:bg-status-rejected",
  cancelled:
    "bg-status-cancelled/20 text-status-cancelled [&_span]:bg-status-cancelled",
  completed:
    "bg-status-completed/20 text-status-completed [&_span]:bg-status-completed",
  in_progress:
    "bg-status-in-progress/20 text-status-in-progress [&_span]:bg-status-in-progress",
  "no-show":
    "bg-status-no-show/20 text-status-no-show [&_span]:bg-status-no-show",
};

const StatusBadge = ({
  status,
  text,
  className,
}: {
  status: Appointment_Status;
  text?: string | Appointment_Status;
  className?: string;
}) => {
  const innerText = text
    ? text.split("_").join(" ")
    : status.split("_").join(" ");
  return (
    <Badge className={cn("capitalize", statusClass[status], className)}>
      <span className={cn("h-1.5 w-1.5 rounded-full")}></span> {innerText}
    </Badge>
  );
};

export default StatusBadge;
