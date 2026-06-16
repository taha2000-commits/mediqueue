import { Clock } from "lucide-react";
import { useTranslations } from "next-intl";

import StatusBadge from "@/app/components/StatusBadge";
import { Separator } from "@/components/ui/separator";
import { cn, getRemainingTime } from "@/lib/utils";
import { AppointmentWithPriority } from "@/types/appointments";

import ActionsSection from "./ActionsSection";
import EmptySection from "./EmptySection";
import { FinishButton, StartButton } from "./QueueActions";
import RemainingTimeCountDown from "./RemainingTimeCountDown";
const DoctorQueue = ({
  appointments,
  className,
  dashboardSection = false,
}: {
  appointments: AppointmentWithPriority[];
  className?: string;
  dashboardSection?: boolean;
}) => {
  const t = useTranslations("Status");

  const inProgressApp = appointments.find((app) => app.status == "in_progress");

  const waitingApps = appointments.filter(
    (app) => app.status == "accepted" && !app.is_expired,
  );

  return (
    <div
      className={cn(
        "bg-secondary h-fit flex-1 rounded-xl p-3 shadow sm:p-6",
        className,
        { "max-w-xl": !dashboardSection },
      )}
    >
      <h3 className="text-xl font-semibold">Live Queue</h3>
      <Separator className="my-2" />
      {!dashboardSection && (
        <ActionsSection
          appointments={appointments}
          mobile
          dashboardSection={dashboardSection}
        />
      )}

      <div className="space-y-3">
        {inProgressApp || waitingApps.length > 0 ? (
          inProgressApp && (
            <div className="bg-primary/20 border-border flex scale-102 flex-col items-center justify-between gap-x-7 gap-y-4 rounded-xl border p-3 shadow-2xl sm:flex-row md:flex-wrap lg:flex-nowrap">
              <PatientDetails app={inProgressApp} />

              <div className="flex w-full items-center justify-end gap-7">
                <div className="text-tertiary grid text-center">
                  <span className="text-nowrap">{t("in_progress")}</span>
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
              className="border-border flex flex-col items-center justify-between gap-2 p-3 not-last:border-b sm:flex-row sm:gap-7"
            >
              <PatientDetails app={app} />

              <div className="flex w-full justify-end gap-7">
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
    <div className="flex w-full flex-wrap items-center gap-x-7 gap-y-2 sm:flex-nowrap">
      <div className="text-center">
        {app.status == "in_progress" && (
          <StatusBadge status="accepted" text="now serving" />
        )}
        <h5 className="text-lg font-black">A-{app.id}</h5>
      </div>
      <div className="flex-1 text-nowrap">
        <h6 className="font-bold text-nowrap capitalize">{app.patient.name}</h6>
        <div className="flex flex-nowrap items-center gap-1 text-sm">
          <span className="text-muted-foreground">{app.patient.age} years</span>
          <span className="text-muted-foreground">-</span>
          <span className="text-muted-foreground">
            {app.type.split("_").join(" ")}
          </span>
        </div>
      </div>
    </div>
  );
}
