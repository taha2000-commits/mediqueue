"use client";

import { Check, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { useRequestsContext } from "../../_context/RequestsContext";

export default function RequestActions({
  request_id,
  isExpired,
}: {
  request_id: number;
  isExpired: boolean;
}) {
  const { changeRequestStatus, loading } = useRequestsContext();
  const [clickedID, setClickedID] = useState<number | null>();
  return (
    <div className="flex items-center justify-center gap-3">
      <Button
        variant={"outline"}
        className="border-status-accepted text-status-accepted rounded-lg font-bold"
        onClick={() => {
          setClickedID(request_id);
          if (request_id) changeRequestStatus(request_id, "accepted");
        }}
        disabled={isExpired}
      >
        {loading.isLoading &&
        loading.status == "accepted" &&
        request_id == clickedID ? (
          <Spinner />
        ) : (
          <Check />
        )}
        <span>accept</span>
      </Button>
      <Button
        variant={"destructive"}
        className="rounded-lg font-bold"
        onClick={() => {
          setClickedID(request_id);
          if (request_id) changeRequestStatus(request_id, "rejected");
        }}
        disabled={isExpired}
      >
        {loading.isLoading &&
        loading.status == "rejected" &&
        request_id == clickedID ? (
          <Spinner />
        ) : (
          <X />
        )}

        <span>reject</span>
      </Button>
    </div>
  );
}
