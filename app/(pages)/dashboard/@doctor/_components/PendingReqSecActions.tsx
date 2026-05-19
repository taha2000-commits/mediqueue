"use client";
import { Check, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { AppointmentWithPriority } from "@/types/appointments";

import { useRequestsContext } from "../_context/RequestsContext";

function PendingReqSecActions({
  request,
}: {
  request: AppointmentWithPriority;
}) {
  const { id } = request;
  const [clickedID, setClickedID] = useState<number | null>();

  const { changeRequestStatus, loading } = useRequestsContext();

  const isAccepting =
    loading.isLoading && loading.status == "accepted" && clickedID == id;
  const isRejecting =
    loading.isLoading && loading.status == "rejected" && clickedID == id;

  return (
    <div className="grid gap-1">
      <Button
        className="text-status-accepted border-status-accepted"
        variant="outline"
        size={"xs"}
        disabled={isAccepting || isRejecting}
        onClick={() => {
          setClickedID(id);
          changeRequestStatus(id, "accepted");
        }}
      >
        {!isAccepting ? <Check size={16} /> : <Spinner />}
        <span>accept</span>
      </Button>
      <Button
        className="text-status-rejected border-status-rejected"
        variant="outline"
        size={"xs"}
        onClick={() => {
          setClickedID(id);
          changeRequestStatus(id, "rejected");
        }}
        disabled={isAccepting || isRejecting}
      >
        {!isRejecting ? <X size={18} /> : <Spinner />}
        <span>reject</span>
      </Button>
    </div>
  );
}
export default PendingReqSecActions;
