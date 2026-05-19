"use client";
import { CircleCheckBig, CirclePlay, FileSpreadsheet } from "lucide-react";
import Link from "next/link";

import AddAppNotesDialog from "@/app/components/AddAppNotesDialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { AppointmentWithPriority } from "@/types/appointments";

import { useRequestsContext } from "../_context/RequestsContext";

function ActionsSection({
  appointments,
  orientation = "horizontal",
}: {
  appointments: AppointmentWithPriority[];
  orientation?: "horizontal" | "vertical";
}) {
  const { changeRequestStatus, loading } = useRequestsContext();
  const inProgressApp = appointments.find((app) => app.status == "in_progress");
  const waitingApps = appointments.filter((app) => app.status == "accepted");

  const btnClass =
    "text-sm text-center border border-border cursor-pointer flex flex-col items-center gap-2 rounded-xl p-5 disabled:text-muted-foreground disabled:bg-muted";
  return (
    <div className={"bg-second-background rounded-xl p-6 shadow"}>
      <h3 className="text-xl font-semibold">Quick Actions</h3>
      <Separator className="mt-2 mb-4" />
      <div
        className={cn(
          "flex justify-center gap-3",
          orientation == "vertical" && "flex-col",
        )}
      >
        <button
          className={cn(
            "text-tertiary bg-tertiary/20 w-1/4",
            btnClass,
            orientation == "vertical" && "w-full",
          )}
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
          <CirclePlay size={40} />
          <p className="capitalize">Start next patient</p>
        </button>

        <AddAppNotesDialog req={inProgressApp!}>
          <button
            className={cn(
              "text-accepted bg-accepted/20 w-1/4",
              btnClass,
              orientation == "vertical" && "w-full",
            )}
            disabled={!inProgressApp || loading.isLoading}
          >
            <CircleCheckBig size={40} />
            <p className="capitalize">mark as completed</p>
          </button>
        </AddAppNotesDialog>
        <div className={orientation == "vertical" ? "w-full" : "w-1/4"}>
          <Link
            href={`/dashboard/history/${inProgressApp?.patient_id}`}
            className={cn(
              "bg-primary/20 text-primary w-full",
              btnClass,
              (!Boolean(inProgressApp) || loading.isLoading) &&
                "text-muted-foreground bg-muted pointer-events-none",
            )}
          >
            <FileSpreadsheet size={40} />
            <p className="capitalize">view patient history</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default ActionsSection;
