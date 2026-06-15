"use client";

import { Check, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

import { useRequestsContext } from "../../_context/RequestsContext";

export default function RequestActions({
  request_id,
  isExpired,
  orientation = "horizontal",
}: {
  request_id: number;
  isExpired: boolean;
  orientation?: "horizontal" | "vertical";
}) {
  const { changeRequestStatus, loading } = useRequestsContext();
  const [clickedID, setClickedID] = useState<number | null>();
  const isMobile = useIsMobile();
  return (
    <div
      className={cn("flex gap-2", { "flex-col": orientation == "vertical" })}
    >
      <Button
        variant={"outline"}
        size={isMobile ? "xs" : "default"}
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
        size={isMobile ? "xs" : "default"}
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
