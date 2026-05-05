"use client";
import { getHours, parse } from "date-fns";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import { useBookStore } from "@/store/useBookStore";
import { AppointmentRow } from "@/types/appointments";
import { Period } from "@/types/doctor-schedule";

import DayCell from "./DayCell";
import DayPeriod from "./DayPeriod";
type IProps = {
  day: number;
  amPeriod?: Record<"break", Period> & Period;
  pmPeriod?: Record<"break", Period> & Period;
  className?: string;
  day_appointments: AppointmentRow[];
  date: Date;
};

const DayRow = ({
  day,
  amPeriod,
  pmPeriod,
  className = "",
  day_appointments,
  date,
}: IProps) => {
  const t = useTranslations("BookPage");

  const { disabled } = useBookStore();

  const getPeriodAppointments = (period: "am" | "pm") =>
    day_appointments.filter((app) => {
      return period == "am"
        ? getHours(parse(app.time, "HH:mm:ss", new Date())) < 12
        : getHours(parse(app.time, "HH:mm:ss", new Date())) >= 12;
    });

  const am_appointments = getPeriodAppointments("am");
  const pm_appointments = getPeriodAppointments("pm");
  return (
    <div
      className={cn(
        "border-e-primary grid min-h-18 grid-cols-7 grid-rows-2 gap-1 overflow-hidden border-e-4",
        className,
        disabled &&
          "pointer-events-none animate-pulse cursor-not-allowed grayscale-100",
      )}
    >
      <div className="bg-background row-span-2 grid grid-cols-3 grid-rows-2 gap-1">
        <DayCell day={day} date={date} />

        <div className="bg-primary flex items-center justify-center text-white uppercase">
          {t("am")}
        </div>
        <div className="bg-primary flex items-center justify-center text-white uppercase">
          {t("pm")}
        </div>
      </div>
      <DayPeriod
        name="am"
        period={amPeriod}
        period_appointments={am_appointments}
        date={date}
      />
      <DayPeriod
        name="pm"
        period={pmPeriod}
        period_appointments={pm_appointments}
        date={date}
      />
    </div>
  );
};

export default DayRow;
