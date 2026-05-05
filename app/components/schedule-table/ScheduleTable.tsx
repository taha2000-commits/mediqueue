import { getDay } from "date-fns";
import { LockKeyhole } from "lucide-react";

import { cn, getDatesArray } from "@/lib/utils";
import { AppointmentRow } from "@/types/appointments";
import { Schedule } from "@/types/doctor-schedule";

import DayRow from "./DayRow";

const ScheduleTable = async ({
  weekly_schedule,
  appointments,
  searchParams,
}: {
  weekly_schedule: Schedule;
  appointments: AppointmentRow[];
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const datesParam = (await searchParams)?.dates || undefined;
  const isNextWeek = datesParam == "nextWeek";

  const datesArray = getDatesArray(isNextWeek);

  const todayIndx = (getDay(new Date()) + 1) % 7;

  const getDayAppointments = (day: number) =>
    appointments?.filter(
      (app) => (getDay(new Date(app.date)) + 1) % 7 === day,
    ) || [];

  if (weekly_schedule)
    return (
      <div className={cn("relative grid gap-2 overflow-hidden")}>
        {!isNextWeek && (
          <div
            className="bg-background/70 absolute top-0 z-1 flex w-full items-center justify-center"
            style={{ height: (todayIndx / 7) * 100 + "%" }}
          >
            <LockKeyhole size={40} className="text-primary" />
          </div>
        )}
        {datesArray.map((value, i, arr) => {
          const x = Object.entries(weekly_schedule).find(([k]) => k == `${i}`);
          const period = x?.[1];
          return (
            <DayRow
              key={i}
              day={i}
              amPeriod={period?.["am"]}
              pmPeriod={period?.["pm"]}
              className={cn(
                i == 0 && "rounded-t-4xl",
                i == arr.length - 1 && "rounded-b-4xl",
              )}
              day_appointments={getDayAppointments(i)}
              date={value}
            />
          );
        })}
      </div>
    );
};

export default ScheduleTable;
