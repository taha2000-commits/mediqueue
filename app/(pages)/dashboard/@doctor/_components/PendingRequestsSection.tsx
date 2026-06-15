import { format, isToday } from "date-fns";
import { CalendarClock, Clock } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatTime } from "@/lib/utils";
import { AppointmentWithPriority } from "@/types/appointments";

import AgeAndTypeBar from "./AgeAndTypeBar";
import EmptySection from "./EmptySection";
import PendingReqSecActions from "./PendingReqSecActions";
import RemainingTimeCountDown from "./RemainingTimeCountDown";

function PendingRequestsSection({
  appointments,
}: {
  appointments: AppointmentWithPriority[];
}) {
  const pendingApps = appointments
    .filter((app) => app.status == "pending" && app.priority !== "expired")
    .slice(0, 5);

  return (
    <div className="bg-secondary flex-1 rounded-xl p-3 shadow sm:p-6">
      <h3 className="text-xl font-semibold">Pending requests</h3>
      <p className="text-muted-foreground">
        Please accept the pending requests
      </p>
      <Separator className="mt-2 mb-4" />
      <div className="border-border rounded-xl border">
        {pendingApps?.[0] ? (
          pendingApps.map((app, i) => (
            <div
              key={i}
              className="border-border flex w-full flex-wrap items-center justify-between gap-x-7 gap-y-3 p-3 not-last:border-b"
            >
              <div className="text-center">
                <h5 className="text-lg font-black">A-{app.id}</h5>
              </div>
              <div className="flex-1 text-nowrap">
                <h6 className="font-bold capitalize">{app.patient.name}</h6>
                <AgeAndTypeBar
                  age={app.patient.age}
                  type={app.type}
                  className="flex-nowrap"
                />
                <div className="text-muted-foreground mt-1 flex items-center gap-1 text-sm">
                  <CalendarClock size={16} />
                  <span>
                    {isToday(app.date)
                      ? `today, ${formatTime(app.time, "HH:mm aa")}`
                      : format(app.date, "EEEE, hh:mm aa")}
                  </span>
                </div>
              </div>

              <div className="flex flex-1 justify-between gap-7">
                <div className="flex items-center gap-2 text-sm">
                  <Clock
                    size={20}
                    className="animate-spin-slow text-destructive"
                  />

                  <RemainingTimeCountDown
                    remaining_time={app.remaining_time}
                    priority={app.priority}
                  />
                </div>
                <PendingReqSecActions request={app} />
              </div>
            </div>
          ))
        ) : (
          <EmptySection
            title="No Pending Requests"
            description="No patients are waiting for confirmation right now."
          />
        )}
      </div>
      <div className="flex justify-end">
        <Button variant={"link"}>
          <Link href={"/dashboard/requests"}>show more</Link>
        </Button>
      </div>
    </div>
  );
}
export default PendingRequestsSection;
