"use client";
import { Check, Eye, LucideIcon, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { AppointmentWithPriority } from "@/types/appointments";

import { useRequestsContext } from "../../_context/RequestsContext";
import RequestDetails from "../../appointments/_components/RequestDetails";

const RequestCardActions = ({
  appointment,
}: {
  appointment: AppointmentWithPriority;
}) => {
  const { id, priority } = appointment;
  const [clickedID, setClickedID] = useState<number | null>();
  const { changeRequestStatus, loading } = useRequestsContext();
  return (
    <div className="flex flex-wrap items-center gap-2 gap-y-1">
      <Sheet>
        <SheetTrigger asChild>
          <Icon icon={Eye} />
        </SheetTrigger>
        <SheetContent
          side="bottom"
          className="flex max-h-[90vh] items-center justify-center rounded-t-2xl p-5"
        >
          <div className="h-full overflow-y-auto">
            <RequestDetails request={appointment} className="ms-0" />
          </div>
        </SheetContent>
      </Sheet>

      <Icon
        icon={Check}
        onClick={() => {
          setClickedID(id);
          if (id) changeRequestStatus(id, "accepted");
        }}
        loading={
          clickedID == id && loading.isLoading && loading.status == "accepted"
        }
        variant="accepted"
        disabled={priority == "expired"}
      />

      <Icon
        icon={X}
        onClick={() => {
          setClickedID(id);
          if (id) changeRequestStatus(id, "rejected");
        }}
        loading={
          clickedID == id && loading.isLoading && loading.status == "rejected"
        }
        variant={"destructive"}
        disabled={priority == "expired"}
      />
    </div>
  );
};
const Icon = ({
  icon,
  onClick = () => {},
  loading = false,
  className,
  variant,
  disabled = false,
}: {
  icon: LucideIcon;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  variant?: "accepted" | "destructive";
}) => {
  const I = icon;
  return (
    <Button
      variant={variant == "destructive" ? "destructive" : "outline"}
      size={"icon"}
      className={cn(
        "size-7 rounded-md md:size-9 md:rounded-lg",
        {
          "border-status-accepted text-status-accepted": variant == "accepted",
        },
        className,
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {loading ? <Spinner /> : <I size={16} />}
    </Button>
  );
};
export default RequestCardActions;
