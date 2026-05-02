import { getHours, parse } from "date-fns";
import { useTranslations } from "next-intl";

import { AppointmentRow } from "@/lib/supabase/types";
import { cn } from "@/lib/utils";
import { Period } from "@/types/doctor-schedule";

import DayCell from "./DayCell";
import DayPeriod from "./DayPeriod";
type IProps = {
  day: number;
  amPeriod: Record<"break", Period> & Period;
  pmPeriod: Record<"break", Period> & Period;
  className?: string;
  day_appointments: AppointmentRow[];
};

const DayRow = ({
  day,
  amPeriod,
  pmPeriod,
  className = "",
  day_appointments,
}: IProps) => {
  const t = useTranslations("BookPage");
  const getPeriodAppointments = (x: "am" | "pm") =>
    day_appointments.filter((app) => {
      return x == "am"
        ? getHours(parse(app.time, "HH:mm:ss", new Date())) < 12
        : getHours(parse(app.time, "HH:mm:ss", new Date())) >= 12;
    });
  return (
    <div
      className={cn(
        "border-e-primary grid min-h-18 grid-cols-7 grid-rows-2 gap-1 overflow-hidden border-e-4",
        className,
      )}
    >
      <div className="bg-background row-span-2 grid grid-cols-3 grid-rows-2 gap-1">
        <DayCell day={day} />

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
        period_appointments={getPeriodAppointments("am")}
      />
      <DayPeriod
        name="pm"
        period={pmPeriod}
        period_appointments={getPeriodAppointments("pm")}
      />
    </div>
  );
};

export default DayRow;
