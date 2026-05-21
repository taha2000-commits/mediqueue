"use client";
import { Ban, Check, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { AppointmentWithPriority } from "@/types/appointments";

import { useRequestsContext } from "../../_context/RequestsContext";

export default function RequestActions({
  request,
}: {
  request: AppointmentWithPriority;
}) {
  const { id, status, is_expired } = request;
  const { changeRequestStatus, loading } = useRequestsContext();

  const isAccepting = loading.isLoading && loading.status == "accepted";
  const isCancelling = loading.isLoading && loading.status == "cancelled";
  const isRejecting = loading.isLoading && loading.status == "rejected";

  if (
    status !== "cancelled" &&
    status !== "rejected" &&
    status !== "completed" &&
    !is_expired
  )
    return (
      <div className="border-border space-y-2 border-t pt-4">
        {status == "accepted" ? (
          <Button
            className="bg-status-cancelled w-full text-white"
            disabled={isCancelling}
            onClick={() => {
              if (id) changeRequestStatus(id, "cancelled");
            }}
          >
            {!isCancelling ? <Ban size={18} /> : <Spinner />}

            <span>cancel request</span>
          </Button>
        ) : (
          <>
            <Button
              className="bg-status-accepted w-full text-white"
              disabled={isAccepting || isRejecting}
              onClick={() => {
                if (id) changeRequestStatus(id, "accepted");
              }}
            >
              {!isAccepting ? <Check size={18} /> : <Spinner />}
              <span>accept request</span>
            </Button>
            <Button
              variant={"destructive"}
              className="w-full"
              onClick={() => {
                if (id) changeRequestStatus(id, "rejected");
              }}
              disabled={isAccepting || isRejecting}
            >
              {!isRejecting ? <X size={18} /> : <Spinner />}
              <span>decline request</span>
            </Button>
          </>
        )}
      </div>
    );
}
