import { format, isToday } from "date-fns";
import { CalendarClock, Clock } from "lucide-react";
import Image from "next/image";

import { Avatar } from "@/components/ui/avatar";
import { formatTime } from "@/lib/utils";
import { AppointmentWithPriority } from "@/types/appointments";

import RemainingTimeCountDown from "../../_components/RemainingTimeCountDown";
import RequestActions from "./RequestActions";

interface HighPriorityRequestProps {
  req: AppointmentWithPriority;
}

export default function HighPriorityRequest({ req }: HighPriorityRequestProps) {
  return (
    <div
      key={req.id}
      className="border-destructive bg-secondary col-span-1 min-w-fit flex-1 space-y-4 rounded-xl border p-3"
    >
      <div className="text-destructive mb-2 flex w-full items-center justify-between font-bold">
        <div className="bg-destructive/10 rounded-lg p-1 px-2 text-sm capitalize">
          high priority
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock size={20} className="animate-spin-slow" />

          <RemainingTimeCountDown
            remaining_time={req.remaining_time}
            priority={req.priority}
          />
        </div>
      </div>
      <div className="flex justify-between gap-2">
        <div className="flex gap-3">
          <Avatar className="size-15 xl:size-25">
            <Image
              src={
                req.patient.gender == "male"
                  ? "/male-avatar.png"
                  : "/female-avatar.png"
              }
              alt="sss"
              width={100}
              height={100}
            />
          </Avatar>
          <div className="text-muted-foreground text-sm capitalize xl:font-bold">
            <h5 className="text-foreground text-lg xl:text-xl">
              {req.patient.name}
            </h5>
            <p className="">
              {req.patient.age} years, {req.patient.gender}
            </p>
            <span className="">{req.type.split("_").join(" ")}</span>
            <div className="mt-2 flex items-center gap-1 text-sm xl:mt-4">
              <CalendarClock size={18} />
              <span>
                {isToday(req.date)
                  ? `today, ${formatTime(req.time, "HH:mm aa")}`
                  : format(req.date, "EEEE, hh:mm aa")}
              </span>
            </div>
          </div>
        </div>
        <RequestActions
          request_id={req.id}
          isExpired={req.is_expired}
          orientation="vertical"
        />
      </div>
    </div>
  );
}
