"use client";
import { getHours, isSameDay, parse } from "date-fns";

import { AppointmentWithPriority } from "@/types/appointments";
import { Period, Slot_Status } from "@/types/doctor-schedule";

import UnavailableSlot from "./UnavailableSlot";
import WorkSlot from "./WorkSlot";

type Props = {
  name: "am" | "pm";
  period?: Period;
  period_appointments: AppointmentWithPriority[];
  date: Date;
};

export default function DayPeriod({
  name,
  period,
  period_appointments,
  date,
}: Props) {
  if (!period)
    return (
      <div className="relative col-span-6 row-span-1 grid grid-cols-12 gap-1 text-xs text-white">
        <UnavailableSlot colSpan={12} />
      </div>
    );

  const breakStart =
    period.break && getHours(parse(period?.break?.start, "HH:mm", new Date()));
  const breakEnd =
    period.break && getHours(parse(period.break?.end, "HH:mm", new Date()));

  const start = getHours(parse(period.start, "HH:mm", new Date()));
  const end = getHours(parse(period.end, "HH:mm", new Date()));

  const inBreakTime = (val: number) =>
    breakEnd && breakStart && val >= breakStart && val < breakEnd;

  const workingHoursArray = Array.from(
    {
      length: end! - start!,
    },
    (_, i) => i + start!,
  );

  return (
    <div className="relative col-span-6 row-span-1 grid grid-cols-12 gap-1 text-xs text-white">
      <UnavailableSlot colSpan={name == "am" ? start : start - 12} />

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
                  date={date}
                />
              );
            else if (val != breakStart) return;

          const appointment = period_appointments?.find(
            (app) =>
              val == getHours(parse(app.time, "HH:mm:ss", new Date())) &&
              isSameDay(app.date, date),
          );

          if (appointment)
            return (
              <WorkSlot
                key={i}
                status={appointment.status}
                text={appointment.status as string}
                date={date}
              />
            );

          return (
            <WorkSlot
              key={i}
              status={Slot_Status.FREE}
              text={val.toString()}
              date={date}
            />
          );
        })}
      </div>
      <UnavailableSlot colSpan={name == "am" ? 12 - end : 24 - end} />
    </div>
  );
}
