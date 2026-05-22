import { Clock } from "lucide-react";
import { useTranslations } from "next-intl";

import StatusBadge from "@/app/components/StatusBadge";
import { Separator } from "@/components/ui/separator";
import { cn, getRemainingTime } from "@/lib/utils";
import { AppointmentWithPriority } from "@/types/appointments";

import EmptySection from "./EmptySection";
import { FinishButton, StartButton } from "./QueueActions";
import RemainingTimeCountDown from "./RemainingTimeCountDown";
const DoctorQueue = ({
  appointments,
  className,
}: {
  appointments: AppointmentWithPriority[];
  className?: string;
}) => {
  const t = useTranslations("Status");

  const inProgressApp = appointments.find((app) => app.status == "in_progress");

  const waitingApps = appointments.filter(
    (app) => app.status == "accepted" && !app.is_expired,
  );

  return (
    <div
      className={cn(
        "bg-secondary h-fit flex-1 rounded-xl p-6 shadow",
        className,
      )}
    >
      <h3 className="text-xl font-semibold">Live Queue</h3>
      <Separator className="mt-2 mb-4" />
      <div className="space-y-3">
        {inProgressApp || waitingApps.length > 0 ? (
          inProgressApp && (
            <div className="bg-primary/20 border-border flex scale-102 items-center justify-between gap-7 rounded-xl border p-3 shadow-2xl">
              <PatientDetails app={inProgressApp} />

              <div className="text-tertiary grid text-center">
                <span className="">{t("in_progress")}</span>
                <RemainingTimeCountDown
                  className="text-status-completed text-lg"
                  remaining_time={getRemainingTime(
                    inProgressApp.appointment_datetime,
                  )}
                  expiredText="finished"
                />
              </div>
              <div className="">
                <FinishButton req={inProgressApp} />
              </div>
            </div>
          )
        ) : (
          <EmptySection
            title="No Patients Waiting"
            description="All queued patients have been served successfully."
          />
        )}
        <div className="border-border m-3 rounded-xl border">
          {waitingApps.map((app, i) => (
            <div
              key={i}
              className="border-border flex items-center justify-between gap-7 p-3 not-last:border-b"
            >
              <PatientDetails app={app} />

              <div className="flex items-center gap-2 text-sm">
                <Clock
                  size={20}
                  className="animate-spin-slow text-status-pending"
                />

                <RemainingTimeCountDown
                  priority={app.priority}
                  remaining_time={app.remaining_time}
                  className="text-status-pending"
                />
              </div>

              {!inProgressApp && i == 0 && (
                <div className="">
                  <StartButton reqId={app.id} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorQueue;

interface PatientDetailsProps {
  app: AppointmentWithPriority;
}

function PatientDetails({ app }: PatientDetailsProps) {
  return (
    <>
      <div className="text-center">
        {app.status == "in_progress" && (
          <StatusBadge status="accepted" text="now serving" />
        )}
        <h5 className="text-lg font-black">A-{app.id}</h5>
      </div>
      <div className="flex-1">
        <h6 className="font-bold capitalize">{app.patient.name}</h6>
        <div className="flex flex-wrap items-center gap-1 text-sm">
          <span className="text-muted-foreground">{app.patient.age} years</span>
          <span className="text-muted-foreground">-</span>
          <span className="text-muted-foreground">
            {app.type.split("_").join(" ")}
          </span>
        </div>
      </div>
    </>
  );
}
