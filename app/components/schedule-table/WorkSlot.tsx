import { useTranslations } from "next-intl";
import React from "react";

import { cn } from "@/lib/utils";
import { Appointment_Status } from "@/types/appointments";
import { Slot_Status } from "@/types/doctor-schedule";

function getColorClassFromStatus(status: Slot_Status | Appointment_Status) {
  switch (status) {
    case Slot_Status.FREE:
      return "bg-blue-400";
    case Slot_Status.BREAK:
      return "bg-gray-500";
    case Appointment_Status.ACCEPTED:
      return "bg-status-accepted";
    case Appointment_Status.PENDING:
      return "bg-status-pending";

    default:
      return "bg-second-background";
  }
}

type IProps = {
  colSpan?: number;
  status?: Slot_Status | Appointment_Status;
  text?: string;
};

const WorkSlot = ({
  colSpan = 1,
  status = Slot_Status.FREE,
  text = "",
}: IProps) => {
  const StatusT = useTranslations("Status");
  const BookPageT = useTranslations("BookPage");
  return (
    <div
      className={cn(
        "flex h-full cursor-pointer items-center justify-center capitalize",
        getColorClassFromStatus(status),
        status !== Slot_Status.FREE
          ? "cursor-not-allowed "
          : "hover:bg-amber-300",
      )}
      style={{
        gridColumn: `span ${colSpan} / span ${colSpan}`,
      }}
    >
      {status !== Slot_Status.FREE
        ? status == Slot_Status.BREAK
          ? BookPageT("break")
          : StatusT(text)
        : text}
    </div>
  );
};

export default WorkSlot;
