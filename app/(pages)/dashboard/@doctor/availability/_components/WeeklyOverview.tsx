import { format } from "date-fns";

import {
  addDurations,
  differenceBtwTwoTimes,
  formatTime,
  getDatesArray,
} from "@/lib/utils";
import { Schedule } from "@/types/doctor-schedule";

interface WeeklyOverviewProps {
  schedule: Schedule;
}

function WeeklyOverview({ schedule }: WeeklyOverviewProps) {
  const thisWeek = getDatesArray();

  const daysDurations = thisWeek.map((_, i) => {
    const amPeriod = schedule?.[i]?.["am"];
    const pmPeriod = schedule?.[i]?.["pm"];
    const amDiff = amPeriod
      ? differenceBtwTwoTimes(amPeriod["start"], amPeriod["end"])
      : undefined;
    const pmDiff = pmPeriod
      ? differenceBtwTwoTimes(pmPeriod["start"], pmPeriod["end"])
      : undefined;

    return {
      amDiff,
      pmDiff,
      total: addDurations(amDiff, pmDiff),
    };
  });

  return (
    <div className="bg-secondary space-y-3 rounded-xl p-4 shadow">
      <h3 className="font-bold capitalize">weekly overview</h3>
      <div className="flex gap-2">
        {thisWeek.map((day, i) => {
          const amPeriod = schedule?.[i]?.["am"];
          const pmPeriod = schedule?.[i]?.["pm"];

          return (
            <div
              key={day.getDay()}
              className="border-border flex w-fit flex-1 flex-col items-center gap-1 rounded-lg border p-2 text-sm"
            >
              <span className="font-semibold">{format(day, "EEEE")}</span>

              <span className="text-muted-foreground">
                {format(day, "dd MMM")}
              </span>
              {amPeriod || pmPeriod ? (
                <>
                  {[amPeriod, pmPeriod].map(
                    (period, i) =>
                      period && (
                        <div
                          key={i}
                          className="flex gap-0.5 text-xs font-semibold text-nowrap"
                        >
                          <span className="">
                            {formatTime(period["start"])} AM
                          </span>
                          <span className="">-</span>
                          <span>{formatTime(period["end"])} AM</span>
                        </div>
                      ),
                  )}
                </>
              ) : (
                <p
                  className={
                    "text-status-rejected text-center text-xs font-semibold xl:text-sm"
                  }
                >
                  day off
                </p>
              )}
              {amPeriod || pmPeriod ? (
                <p className={"text-status-accepted"}>
                  <span className="me-0.5 text-xs">
                    {daysDurations[i].total}
                  </span>
                  {!amPeriod?.is_active && (
                    <span className="text-status-pending text-[10px]">
                      {daysDurations[i].amDiff}
                    </span>
                  )}
                  {!pmPeriod?.is_active && (
                    <span className="text-status-pending text-[10px]">
                      {daysDurations[i].pmDiff}
                    </span>
                  )}
                </p>
              ) : (
                <p className={"text-status-rejected text-xs font-semibold"}>
                  __
                </p>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex justify-between gap-4 text-sm">
        <div className="flex gap-2">
          <h6 className="font-semibold">Total working hours:</h6>
          <p className="">
            {addDurations(...daysDurations.map((dd) => dd.total))}
          </p>
        </div>
        <div className="text-status-accepted flex gap-2">
          <h6 className="font-semibold">active hours:</h6>
          <p className="">
            {addDurations(...daysDurations.map((dd) => dd.total))}
          </p>
        </div>
        <div className="text-status-pending flex gap-2">
          <h6 className="font-semibold">not active hours:</h6>
          <p className="">
            {addDurations(...daysDurations.map((dd) => dd.total))}
          </p>
        </div>
      </div>
    </div>
  );
}
export default WeeklyOverview;
