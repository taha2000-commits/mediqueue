"use client";
import { format } from "date-fns";
import { Calendar, MailOpen, Phone, UserRound, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import StatusBadge from "@/app/components/StatusBadge";
import TooltipComponent from "@/app/components/TooltipComponent";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn, formatTime } from "@/lib/utils";

import { useSelectedPatientCtx } from "../../_context/SelectedPatientCtx";

function SelectedPatient() {
  const { selectedPatient, setSelectedPatient } = useSelectedPatientCtx();

  return (
    <div
      className={cn(
        "bg-second-background relative ml-3 h-fit w-sm scale-x-100 space-y-4 rounded-xl p-4 opacity-100 shadow transition-all duration-1000",
        !selectedPatient && "ml-0 w-0 scale-x-0 p-0 opacity-0 **:scale-0",
      )}
    >
      {selectedPatient && (
        <>
          <div className="absolute top-4 right-4 z-1">
            <X
              className="hover:text-muted-foreground cursor-pointer"
              onClick={() => setSelectedPatient(undefined)}
            />
          </div>
          <div className="flex gap-4">
            <Avatar className="h-20 w-20">
              <Image
                src={"/male-avatar.png"}
                alt="avatar"
                width={80}
                height={80}
              />
            </Avatar>
            <div className="flex flex-col justify-evenly">
              <h4 className="text-xl font-bold">{selectedPatient?.name}</h4>
              <div className="flex items-center gap-2">
                <p className="">ID: {selectedPatient?.id}</p>
                {selectedPatient?.active ? (
                  <StatusBadge status="accepted" text="active" />
                ) : (
                  <StatusBadge status="cancelled" text="inactive" />
                )}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="border-border flex items-center gap-3 rounded-sm border p-2">
              <Phone size={16} />
              <span className="">{selectedPatient?.phone}</span>
            </div>
            <TooltipComponent
              element={
                <div className="border-border flex items-center gap-3 rounded-sm border p-2">
                  <MailOpen size={16} />
                  <span className="truncate text-ellipsis normal-case">
                    {selectedPatient?.email}
                  </span>
                </div>
              }
              content={selectedPatient?.email}
            />

            <div className="border-border flex items-center gap-3 rounded-sm border p-2">
              <Calendar size={16} />
              <span className="">{selectedPatient?.age} years</span>
            </div>
            <div className="border-border flex items-center gap-3 rounded-sm border p-2">
              <UserRound size={16} />
              <span className="">{selectedPatient?.gender}</span>
            </div>
          </div>
          <div className="space-y-3">
            <h6 className="text-md font-bold">personal information</h6>
            <div className="text-sm [&_div]:p-1 [&_div]:py-2 [&_div]:not-last:border-b">
              <KeyAndValue
                name="blood group"
                value={selectedPatient.blood_group ?? undefined}
              />
              <KeyAndValue
                name="next appointment"
                value={
                  selectedPatient?.next_appointment_date &&
                  selectedPatient?.next_appointment_time
                    ? format(
                        selectedPatient?.next_appointment_date,
                        "MMM dd, yyyy",
                      ) +
                      " " +
                      formatTime(
                        selectedPatient?.next_appointment_time,
                        "HH:mm aa",
                      )
                    : undefined
                }
              />

              <KeyAndValue
                name="last visit"
                value={
                  selectedPatient?.last_visit_date &&
                  selectedPatient?.last_visit_time
                    ? format(selectedPatient?.last_visit_date, "MMM dd, yyyy") +
                      " " +
                      formatTime(selectedPatient?.last_visit_time, "HH:mm aa")
                    : undefined
                }
              />
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h6 className="text-md font-bold">medical summary</h6>
              <Button
                asChild
                variant={"outline"}
                size={"xs"}
                className="border-status-completed bg-second-background text-status-completed rounded-sm"
              >
                <Link href={`/dashboard/history/${selectedPatient.id}`}>
                  view history
                </Link>
              </Button>
            </div>
            <div className="text-sm [&_div]:p-1 [&_div]:py-2 [&_div]:not-last:border-b">
              <KeyAndValue
                name="conditions"
                value={selectedPatient?.conditions?.join(", ")}
              />
              <KeyAndValue
                name="medications"
                value={selectedPatient?.medications?.join(", ")}
              />
              <KeyAndValue
                name="allergies"
                value={selectedPatient?.allergies?.join(", ")}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default SelectedPatient;

interface KeyAndValueProps {
  name: string;
  value?: string;
}

function KeyAndValue({ name, value = "-" }: KeyAndValueProps) {
  const val = value == "" ? "-" : value;
  return (
    <div className="grid grid-cols-5">
      <span className="text-muted-foreground col-span-2">{name}</span>
      <span className="col-span-3">{val}</span>
    </div>
  );
}
