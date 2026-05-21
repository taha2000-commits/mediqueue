"use client";
import { format } from "date-fns";
import { CalendarDays, ChevronRight, Clock8 } from "lucide-react";
import Image from "next/image";

import StatusBadge from "@/app/components/StatusBadge";
import { Avatar } from "@/components/ui/avatar";
import { cn, formatTime } from "@/lib/utils";
import { AppointmentWithPriority } from "@/types/appointments";

import { useRequestsContext } from "../_context/RequestsContext";
import AgeAndTypeBar from "./AgeAndTypeBar";

interface RequestProps {
  appointment: AppointmentWithPriority;
}

function Appointment({ appointment }: RequestProps) {
  const { chosenAppointment, setChosenAppointment } = useRequestsContext();

  const { id, type, date, status, time, is_expired, patient, notes } =
    appointment;

  return (
    <div
      key={id}
      className={cn(
        "border-border hover:bg-primary/40 grid cursor-pointer grid-cols-11 not-last:border-b",
        chosenAppointment?.id == id && "bg-primary/40",
      )}
      onClick={() => {
        setChosenAppointment(appointment);
      }}
    >
      <div className="col-span-4 flex gap-2 p-3">
        <Avatar size="lg">
          <Image src={"/male-avatar.png"} alt="avatar" width={40} height={40} />
        </Avatar>
        <div className="">
          <h6 className="text-sm font-semibold">{patient?.name}</h6>
          <AgeAndTypeBar age={patient?.age} type={type} className="text-xs" />
        </div>
      </div>
      <div className="col-span-3 grid items-center justify-start gap-1 p-3 text-sm">
        <div className="flex gap-2">
          <CalendarDays size={20} />
          <span className="col-span-4">{format(date, "EEE, dd MMM yyyy")}</span>
        </div>
        <div className="flex gap-2">
          <Clock8 size={20} />
          <span className="col-span-4">{formatTime(time, "HH:mm aa")}</span>
        </div>
      </div>
      <div className="col-span-2 grid items-center justify-start gap-1 p-3 text-sm">
        {notes == "" ? "-" : notes}
      </div>
      <div className="col-span-1 flex items-center justify-center p-3 capitalize">
        {is_expired ? (
          <StatusBadge status={"cancelled"} text="expired" />
        ) : (
          <StatusBadge status={status} />
        )}
      </div>
      <div className="col-span-1 flex items-center justify-end p-3">
        <ChevronRight size={20} />
      </div>
    </div>
  );
}
export default Appointment;
