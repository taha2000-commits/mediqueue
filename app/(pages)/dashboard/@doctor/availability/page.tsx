import { Metadata } from "next";

import StatusBadge from "@/app/components/StatusBadge";
import { fetchData } from "@/lib/api/fetch";
import { getDoctorUser } from "@/lib/auth/getDoctorUser";
import { formatTime } from "@/lib/utils";
import { Schedule } from "@/types/doctor-schedule";
import { Doctor } from "@/types/doctors";

import AddNewPeriod from "./_components/AddNewPeriod";
import DaysBar from "./_components/DaysBar";
import PeriodDetails from "./_components/PeriodDetails";
import WeeklyOverview from "./_components/WeeklyOverview";

export const metadata: Metadata = { title: "Availability" };

const page = async ({ searchParams }: PageProps<"/dashboard/availability">) => {
  const auth = await getDoctorUser();
  const day = Number((await searchParams).day ?? "0");

  const schedule = await fetchData<{
    weekly_schedule: Schedule;
    doctors: Doctor;
  }>({
    url: `/doctors/${auth?.id}/schedule`,
    init: { next: { tags: ["schedule", `${auth?.id}`] } },
  });

  const amPeriod = schedule?.weekly_schedule[day]?.["am"];
  const pmPeriod = schedule?.weekly_schedule[day]?.["pm"];

  const isAvailable = amPeriod || pmPeriod;

  return (
    <div className="flex gap-6">
      <div className="grid flex-1 gap-6">
        <div className="bg-secondary h-fit w-full space-y-5 rounded-xl p-4 shadow">
          <div className="">
            <h2 className="text-2xl font-bold capitalize">availability</h2>
            <p className="text-muted-foreground">
              manage your weekly availability and time slots for appointments
            </p>
          </div>

          <DaysBar />

          <div className="flex gap-5">
            <StatusBadge
              status={isAvailable ? "accepted" : "cancelled"}
              text={isAvailable ? "available" : "not available"}
            />
            {isAvailable && (
              <div className="text-muted-foreground flex gap-4 text-sm font-semibold">
                {[amPeriod, pmPeriod].map(
                  (period, i) =>
                    period && (
                      <div key={i} className="flex gap-2">
                        <p className="text-foreground">morning session:</p>
                        <span className="">
                          {formatTime(period["start"], "HH:mm aa")}
                        </span>
                        <span>-</span>
                        <span>{formatTime(period["end"], "HH:mm aa")}</span>
                      </div>
                    ),
                )}
              </div>
            )}
          </div>
          <div className="space-y-6">
            {[amPeriod, pmPeriod].map(
              (period, i) =>
                period && (
                  <PeriodDetails
                    key={i}
                    schedule={schedule.weekly_schedule}
                    day={day}
                    type={i == 0 ? "am" : "pm"}
                  />
                ),
            )}

            {(!pmPeriod || !amPeriod) && (
              <AddNewPeriod
                day={day}
                period={amPeriod ? "pm" : pmPeriod ? "am" : "any"}
                schedule={schedule?.weekly_schedule}
              />
            )}
          </div>
        </div>

        <WeeklyOverview schedule={schedule?.weekly_schedule} />
      </div>
    </div>
  );
};

export default page;
