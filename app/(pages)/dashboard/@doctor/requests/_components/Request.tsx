"use client";
import { format, isTomorrow } from "date-fns";
import { CalendarCheck, Clock } from "lucide-react";
import Image from "next/image";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn, formatRemainingTime, formatTime } from "@/lib/utils";
import { AppointmentWithPriority } from "@/types/appointments";

import RemainingTimeCountDown from "../../_components/RemainingTimeCountDown";
import { useRequestsContext } from "../../_context/RequestsContext";
import RequestActions from "./RequestActions";

const Request = ({ request }: { request: AppointmentWithPriority }) => {
  const {
    id,
    type,
    date,
    time,
    remaining_time,
    priority,
    is_expired,
    patient: { gender, name, age },
  } = request;

  const { chosenAppointment, setChosenAppointment } = useRequestsContext();

  return (
    <div
      className={cn(
        "border-border grid cursor-pointer not-last:border-b",
        chosenAppointment ? "grid-cols-3" : "grid-cols-4",
      )}
    >
      <div className="flex items-center gap-2 p-3">
        <Avatar size="lg">
          <Image src={"/male-avatar.png"} alt="avatar" width={40} height={40} />
        </Avatar>
        <div className="">
          <h6 className="text-sm font-semibold">{name}</h6>
          <div className="flex flex-wrap items-center gap-1 text-xs">
            <span className="text-muted-foreground">{age} years</span>
            <span className="text-muted-foreground">-</span>
            <span className="text-muted-foreground">{gender}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="bg-background rounded-xl p-2">
          <CalendarCheck size={20} />
        </div>
        <div className="grid py-1">
          <span className="text-muted-foreground">Requested for</span>
          <span className="text-sm font-bold">
            {date
              ? isTomorrow(date)
                ? "Tomorrow"
                : format(date, "MMM d, yyyy")
              : "-"}{" "}
            {time ? formatTime(time, "HH:mm aa") : "-"}
          </span>
          <span className="text-muted-foreground">
            {type?.split("_").join(" ")}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div
          className={cn(
            "bg-background rounded-xl p-2",
            priority == "high" && "text-priority-high",
            priority == "low" && "text-priority-low",
            priority == "medium" && "text-priority-medium",
            priority == "expired" && "text-priority-expired",
          )}
        >
          <Clock size={20} />
        </div>
        <div className="grid py-1">
          <span className="text-muted-foreground">Waiting Time</span>

          {priority == "high" ? (
            <RemainingTimeCountDown
              remaining_time={remaining_time}
              priority={priority}
            />
          ) : (
            <span
              className={cn(
                "text-sm font-bold",
                priority == "low" && "text-priority-low",
                priority == "medium" && "text-priority-medium",
                priority == "expired" && "text-priority-expired",
              )}
            >
              {priority !== "expired"
                ? formatRemainingTime(remaining_time)
                : "expired"}
            </span>
          )}
        </div>
      </div>
      {!chosenAppointment && (
        <div className="flex items-center gap-3">
          <Button
            variant={"outline"}
            className="border-tertiary text-tertiary bg-second-background rounded-lg"
            onClick={() => {
              setChosenAppointment(request);
            }}
          >
            view details
          </Button>

          <RequestActions request_id={id} isExpired={is_expired} />
        </div>
      )}
    </div>
  );
};

export default Request;
