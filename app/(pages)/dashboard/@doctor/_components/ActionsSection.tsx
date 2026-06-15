"use client";
import { CircleCheckBig, CirclePlay, FileSpreadsheet } from "lucide-react";
import Link from "next/link";

import AddAppNotesDialog from "@/app/components/AddAppNotesDialog";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { AppointmentWithPriority } from "@/types/appointments";

import { useRequestsContext } from "../_context/RequestsContext";

function ActionsSection({
  appointments,
  orientation,
  mobile,
  dashboardSection = false,
}: {
  appointments: AppointmentWithPriority[];
  orientation?: "horizontal" | "vertical";
  mobile?: boolean;
  dashboardSection?: boolean;
}) {
  const inProgressApp = appointments.find((app) => app.status == "in_progress");
  const waitingApps = appointments.filter((app) => app.status == "accepted");

  const { isMobile, open } = useSidebar();

  if (((mobile && isMobile) || (open && mobile)) && !dashboardSection)
    return (
      <>
        <ActionButtons
          waitingApps={waitingApps}
          inProgressApp={inProgressApp}
          orientation={orientation}
          mobile
        />
        <Separator className="mt-2 mb-4" />
      </>
    );
  else if ((!mobile && !isMobile && !open) || dashboardSection)
    return (
      <div className={"bg-secondary rounded-xl p-3 shadow sm:p-6"}>
        <h3 className="text-xl font-semibold">Quick Actions</h3>
        <Separator className="mt-2 mb-4" />
        <ActionButtons
          waitingApps={waitingApps}
          inProgressApp={inProgressApp}
          orientation={orientation}
          mobile={isMobile}
        />
      </div>
    );
}

const ActionButtons = ({
  orientation = "horizontal",
  inProgressApp,
  waitingApps,
  mobile = false,
}: {
  orientation?: "horizontal" | "vertical";
  inProgressApp?: AppointmentWithPriority;
  waitingApps: AppointmentWithPriority[];
  mobile?: boolean;
}) => {
  const { changeRequestStatus, loading } = useRequestsContext();

  const btnClass =
    "text-sm text-center border border-border cursor-pointer flex flex-row sm:flex-col items-center gap-2 rounded-xl p-2 md:p-5 sm:p-3 disabled:text-muted-foreground disabled:bg-background";

  const isVertical = orientation == "vertical" && !mobile;
  return (
    <div
      className={cn("flex flex-wrap justify-center gap-x-3 gap-y-1", {
        "flex-col sm:flex-row": mobile,
        "flex-col": isVertical,
      })}
    >
      <button
        className={cn("text-tertiary bg-tertiary/20", btnClass, {
          "w-full": isVertical,
        })}
        disabled={
          Boolean(inProgressApp) ||
          !Boolean(waitingApps.length) ||
          loading.isLoading
        }
        onClick={() => {
          if (!inProgressApp)
            changeRequestStatus(waitingApps[0]?.id, "in_progress");
        }}
      >
        <CirclePlay size={mobile ? 16 : 40} />
        <p className={cn("capitalize", { "text-xs": mobile })}>
          Start next patient
        </p>
      </button>

      <AddAppNotesDialog req={inProgressApp!}>
        <button
          className={cn("text-accepted bg-accepted/20", btnClass, {
            "w-full": isVertical,
          })}
          disabled={!inProgressApp || loading.isLoading}
        >
          <CircleCheckBig size={mobile ? 16 : 40} />
          <p className={cn("capitalize", { "text-xs": mobile })}>
            mark as completed
          </p>
        </button>
      </AddAppNotesDialog>
      <div className={orientation == "vertical" ? "w-full" : ""}>
        <Link
          href={`/dashboard/history/${inProgressApp?.patient_id}`}
          className={cn(
            "bg-primary/20 text-primary w-full",
            btnClass,
            (!Boolean(inProgressApp) || loading.isLoading) &&
              "text-muted-foreground bg-background pointer-events-none",
          )}
        >
          <FileSpreadsheet size={mobile ? 16 : 40} />
          <p className={cn("capitalize", { "text-xs": mobile })}>
            view patient history
          </p>
        </Link>
      </div>
    </div>
  );
};

export default ActionsSection;
