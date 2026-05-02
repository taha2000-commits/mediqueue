import { getDay } from "date-fns";

import { AppointmentRow } from "@/lib/supabase/types";
import { cn } from "@/lib/utils";
import { Schedule } from "@/types/doctor-schedule";

import DayRow from "./DayRow";

const ScheduleTable = ({
  weekly_schedule,
  appointments,
}: {
  weekly_schedule: Schedule;
  appointments: AppointmentRow[];
}) => {
  const getDayAppointments = (day: number) =>
    appointments?.filter((app) => getDay(new Date(app["date"])) === day) || [];

  if (weekly_schedule)
    return (
      <div className="grid gap-2 overflow-hidden">
        {Object.entries(weekly_schedule).map(([k, v], i, arr) => (
          <DayRow
            key={k}
            day={+k}
            amPeriod={v["am"]}
            pmPeriod={v["pm"]}
            className={cn(
              i == 0 && "rounded-t-4xl",
              i == arr.length - 1 && "rounded-b-4xl",
            )}
            day_appointments={getDayAppointments(+k)}
          />
        ))}
      </div>
    );
};

export default ScheduleTable;
