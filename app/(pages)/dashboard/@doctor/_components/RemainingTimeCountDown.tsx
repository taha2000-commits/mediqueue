"use client";
import { useCountdown } from "@/hooks/useCountDown";
import { cn } from "@/lib/utils";
import { AppointmentWithPriority } from "@/types/appointments";

const RemainingTimeCountDown = ({
  remaining_time,
  priority,
  className,
  expiredText = "expired",
}: {
  remaining_time: string;
  priority?: AppointmentWithPriority["priority"];
  className?: string;
  expiredText?: string;
}) => {
  const formattedRemainingTime = useCountdown(remaining_time);

  return (
    <span
      className={cn(
        "text-sm font-bold",
        priority == "high" && "text-priority-high",
        priority == "low" && "text-priority-low",
        priority == "medium" && "text-priority-medium",
        priority == "expired" && "text-priority-expired",
        className,
      )}
    >
      {priority !== "expired" ? formattedRemainingTime : expiredText}
    </span>
  );
};

export default RemainingTimeCountDown;
