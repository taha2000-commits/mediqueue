"use client";

import AddAppNotesDialog from "@/app/components/AddAppNotesDialog";
import { Button } from "@/components/ui/button";
import { AppointmentWithPriority } from "@/types/appointments";

import { useRequestsContext } from "../_context/RequestsContext";

const StartButton = ({ reqId }: { reqId: number }) => {
  const { changeRequestStatus, loading } = useRequestsContext();
  return (
    <Button
      className="border-tertiary text-tertiary"
      variant="outline"
      disabled={loading.isLoading}
      onClick={() => {
        changeRequestStatus(reqId, "in_progress");
      }}
    >
      {loading.isLoading ? "starting.." : "start"}
    </Button>
  );
};

const FinishButton = ({ req }: { req: AppointmentWithPriority }) => {
  return (
    <AddAppNotesDialog req={req}>
      <Button className="border-tertiary text-tertiary" variant="secondary">
        finish
      </Button>
    </AddAppNotesDialog>
  );
};

export { FinishButton, StartButton };
