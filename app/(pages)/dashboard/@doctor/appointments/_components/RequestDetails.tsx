"use client";
import { format } from "date-fns";
import {
  CalendarDays,
  Clock8,
  LucideIcon,
  Phone,
  Stethoscope,
  X,
} from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

import StatusBadge from "@/app/components/StatusBadge";
import { Avatar } from "@/components/ui/avatar";
import { cn, formatTime } from "@/lib/utils";

import AgeAndTypeBar from "../../_components/AgeAndTypeBar";
import { useRequestsContext } from "../../_context/RequestsContext";
import RequestActions from "./RequestActions";

export default function RequestDetails() {
  const { chosenAppointment, setChosenAppointment } = useRequestsContext();
  console.log("chosen", chosenAppointment);

  useEffect(() => {
    const set = () => setChosenAppointment(undefined);
    return () => {
      set();
    };
  }, [setChosenAppointment]);

  return (
    <div
      className={cn(
        "bg-second-background relative ml-3 h-fit w-sm scale-x-100 space-y-4 rounded-xl p-4 opacity-100 shadow transition-all duration-1000",
        !chosenAppointment &&
          "ml-0 w-0 scale-x-0 space-y-0 p-0 opacity-0 **:scale-0",
      )}
    >
      {chosenAppointment && (
        <>
          <div className="absolute top-4 right-4 z-1">
            <X
              className="hover:text-muted-foreground cursor-pointer"
              onClick={() => setChosenAppointment(undefined)}
            />
          </div>

          <StatusBadge
            status={
              chosenAppointment.is_expired
                ? "rejected"
                : chosenAppointment.status
            }
            text={chosenAppointment.is_expired ? "expired" : undefined}
          />

          <h3 className="font-bold capitalize">Appointment Details</h3>
          <div className="border-border rounded-xl border p-3">
            <div className="border-border border-b pb-3">
              <div className="flex gap-2 p-3">
                <Avatar size="lg">
                  <Image
                    src={"/male-avatar.png"}
                    alt="avatar"
                    width={40}
                    height={40}
                  />
                </Avatar>
                <div className="">
                  <h6 className="text-sm font-semibold">
                    {chosenAppointment.patient.name}
                  </h6>{" "}
                  <AgeAndTypeBar
                    age={chosenAppointment.patient.age}
                    type={chosenAppointment.type}
                    className="text-xs"
                  />
                </div>
              </div>
              <div className="grid gap-2 p-3 text-sm">
                <div className="flex gap-2">
                  <Phone size={20} />
                  <span className="">{chosenAppointment.patient.phone}</span>
                </div>
                <div className="flex gap-2">
                  <Clock8 size={20} />
                  <span className="normal-case">
                    {chosenAppointment.patient.email}
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-3 py-4">
              <h5 className="font-bold">Request Information</h5>

              <KeyValue
                name="requested date"
                value={
                  chosenAppointment.date
                    ? format(chosenAppointment.date, "EEE, dd MMM yyyy")
                    : "-"
                }
                icon={CalendarDays}
              />
              <KeyValue
                name="requested time"
                value={
                  chosenAppointment.time
                    ? formatTime(chosenAppointment.time, "HH:mm aa")
                    : "-"
                }
                icon={Clock8}
              />
              <KeyValue
                name="notes"
                value={chosenAppointment.notes}
                icon={Stethoscope}
              />

              <KeyValue
                name="requested on"
                value={
                  chosenAppointment.created_at
                    ? format(
                        chosenAppointment.created_at,
                        "EEE, dd MMM yyyy . HH:mm aa",
                      )
                    : "-"
                }
                icon={Clock8}
              />
            </div>

            <RequestActions request={chosenAppointment} />
          </div>
        </>
      )}
    </div>
  );
}

const KeyValue = ({
  name,
  value,
  icon,
}: {
  name: string;
  value: string;
  icon: LucideIcon;
}) => {
  const Icon = icon;
  return (
    <div className="grid grid-cols-6">
      <Icon size={20} className="mt-2" />
      <div className="col-span-5 grid gap-1">
        <span className="text-muted-foreground text-sm">{name}</span>
        <span className="text-xs font-bold">{value == "" ? "-" : value}</span>
      </div>
    </div>
  );
};
