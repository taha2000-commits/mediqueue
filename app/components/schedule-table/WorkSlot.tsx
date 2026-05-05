"use client";
import { format } from "date-fns";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import { useBookStore } from "@/store/useBookStore";
import { Appointment_Status } from "@/types/appointments";
import { Slot_Status } from "@/types/doctor-schedule";

function getColorClassFromStatus(status: Slot_Status | Appointment_Status) {
  switch (status) {
    case Slot_Status.FREE:
      return "bg-blue-400";
    case Slot_Status.BREAK:
      return "bg-gray-500";
    case "accepted":
      return "bg-status-accepted";
    case "pending":
      return "bg-status-pending";

    default:
      return "bg-second-background";
  }
}

type IProps = {
  colSpan?: number;
  status?: Slot_Status | Appointment_Status;
  text?: string;
  date: Date;
};

const WorkSlot = ({
  colSpan = 1,
  status = Slot_Status.FREE,
  text = "",
  date,
}: IProps) => {
  const t = useTranslations("BookPage");

  const { addTime, addDate, time, date: dateVal } = useBookStore();

  const StatusT = useTranslations("Status");

  const BookPageT = useTranslations("BookPage");

  const isSelected =
    dateVal &&
    format(date, "yyyy-MM-dd") == format(dateVal, "yyyy-MM-dd") &&
    time == `${+text < 12 ? "0" : ""}${text}:00`;

  const ampmText =
    status === Slot_Status.FREE && +text >= 12
      ? `${+text == 12 ? +text : +text - 12} ${t("pm")}`
      : `${+text} ${t("am")}`;

  return (
    <div
      className={cn(
        "flex h-full cursor-pointer items-center justify-center capitalize",
        getColorClassFromStatus(status),
        status !== Slot_Status.FREE
          ? "pointer-events-none cursor-not-allowed"
          : "hover:bg-amber-300",
        isSelected && "bg-red-500",
      )}
      style={{
        gridColumn: `span ${colSpan} / span ${colSpan}`,
      }}
      onClick={() => {
        if (!isSelected) {
          addTime(text);
          addDate(format(date, "yyyy-MM-dd"));
        } else {
          addTime("");
          addDate("");
        }
      }}
    >
      {isSelected
        ? BookPageT("selected")
        : status !== Slot_Status.FREE
          ? status == Slot_Status.BREAK
            ? BookPageT("break")
            : StatusT(text)
          : ampmText}
    </div>
  );
};

export default WorkSlot;
