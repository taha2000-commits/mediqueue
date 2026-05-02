import { getHours, parse } from "date-fns";
import { useTranslations } from "next-intl";

import { AppointmentRow } from "@/lib/supabase/types";
import { Period, Slot_Status } from "@/types/doctor-schedule";

import WorkSlot from "./WorkSlot";

type Props = {
  name: "am" | "pm";
  period: Record<"break", Period | undefined> & Period;
  period_appointments: AppointmentRow[];
};

export default function DayPeriod({
  name,
  period,
  period_appointments,
}: Props) {
  const t = useTranslations("BookPage");
  const breakStart =
    period.break && getHours(parse(period.break?.start, "HH:mm", new Date()));
  const breakEnd =
    period.break && getHours(parse(period.break?.end, "HH:mm", new Date()));
  const start = getHours(parse(period.start, "HH:mm", new Date()));
  const end = getHours(parse(period.end, "HH:mm", new Date()));

  const inBreakTime = (val: number) =>
    breakEnd && breakStart && val >= breakStart && val < breakEnd;

  const workingHoursArray = Array.from(
    {
      length: end - start,
    },
    (_, i) => i + start,
  );
  return (
    <div className="relative col-span-6 row-span-1 grid grid-cols-12 gap-1 text-xs text-white">
      <div
        className="bg-muted text-muted-foreground flex items-center justify-center"
        style={{
          gridColumn: `span ${name == "am" ? start : start - 12} / span ${name == "am" ? start : start - 12}`,
        }}
      >
        {t("unavailable")}
      </div>
      <div
        className="grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${end - start}, minmax(0, 1fr))`,
          gridColumn: `span ${end - start} / span ${end - start}`,
        }}
      >
        {workingHoursArray.map((val, i) => {
          if (inBreakTime(val))
            if (val == breakStart && breakEnd)
              return (
                <WorkSlot
                  key={i}
                  colSpan={breakEnd - breakStart}
                  status={Slot_Status.BREAK}
                />
              );
            else if (val != breakStart) return;
          if (period_appointments?.[0])
            return period_appointments.map((app) => {
              if (val == getHours(parse(app.time, "HH:mm:ss", new Date())))
                return (
                  <WorkSlot key={i} status={app.status} text={app.status} />
                );
              return (
                <WorkSlot
                  key={i}
                  status={Slot_Status.FREE}
                  text={
                    val >= 12
                      ? `${val == 12 ? val : val - 12} ${t("pm")}`
                      : `${val} ${t("am")}`
                  }
                />
              );
            });

          return (
            <WorkSlot
              key={i}
              status={Slot_Status.FREE}
              text={
                val >= 12
                  ? `${val == 12 ? val : val - 12} ${t("pm")}`
                  : `${val} ${t("am")}`
              }
            />
          );
        })}
      </div>
      <div
        className="bg-muted text-muted-foreground flex items-center justify-center"
        style={{
          gridColumn: `span ${name == "am" ? 12 - end : 24 - end} / span ${name == "am" ? 12 - end : 24 - end}`,
        }}
      >
        {t("unavailable")}
      </div>
    </div>
  );
}
