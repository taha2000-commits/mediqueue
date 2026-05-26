"use client";

import { format } from "date-fns";
import { Calendar, MailOpen, Phone, UserRound, X } from "lucide-react";
import Image from "next/image";

import StatusBadge from "@/app/components/StatusBadge";
import TooltipComponent from "@/app/components/TooltipComponent";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar } from "@/components/ui/avatar";
import useUser from "@/hooks/useUser";
import { cn, formatTime } from "@/lib/utils";
import { UserRole } from "@/types/user-role";

import { useSelectedPatientCtx } from "../../../_context/SelectedPatientCtx";
import ViewHistoryBtn from "./ViewHistoryBtn";

export default function SelectedPatient() {
  const { selectedPatient, setSelectedPatient } = useSelectedPatientCtx();

  const { data: user } = useUser();

  const userRole = user?.user_metadata?.userRole;

  if (!selectedPatient) {
    return (
      <div className="bg-secondary relative ms-0 h-fit w-0 scale-x-0 overflow-hidden rounded-xl p-0 opacity-0 shadow transition-all duration-500" />
    );
  }

  const formatDateTime = (date?: string | null, time?: string | null) => {
    if (!date || !time) return "-";

    return `${format(date, "MMM dd, yyyy")} ${formatTime(time, "HH:mm aa")}`;
  };

  return (
    <div className="bg-secondary relative ms-4 h-fit w-sm space-y-4 rounded-xl p-4 shadow transition-all duration-500">
      <button
        type="button"
        className="absolute top-4 right-4 z-10"
        onClick={() => setSelectedPatient(undefined)}
      >
        <X className="hover:text-muted-foreground cursor-pointer transition-colors" />
      </button>

      <div className="flex gap-4">
        <Avatar className="size-20">
          <Image
            src="/male-avatar.png"
            alt="patient avatar"
            width={80}
            height={80}
          />
        </Avatar>

        <div className="flex flex-col justify-evenly">
          <h4 className="text-xl font-bold">{selectedPatient.name}</h4>

          <div className="flex items-center gap-2">
            <p>ID: {selectedPatient.id}</p>

            <StatusBadge
              status={selectedPatient.active ? "accepted" : "cancelled"}
              text={selectedPatient.active ? "active" : "inactive"}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <InfoCard icon={<Phone size={16} />} value={selectedPatient.phone} />

        <TooltipComponent
          content={selectedPatient.email}
          element={
            <InfoCard
              icon={<MailOpen size={16} />}
              value={selectedPatient.email}
              truncate
            />
          }
        />

        <InfoCard
          icon={<Calendar size={16} />}
          value={`${selectedPatient.age} years`}
        />

        <InfoCard
          icon={<UserRound size={16} />}
          value={selectedPatient.gender}
        />
      </div>

      <Accordion type="single" collapsible className="max-w-lg">
        <AccordionItem value="doctors">
          <AccordionTrigger>Doctors Information</AccordionTrigger>

          <AccordionContent className="text-sm [&_div:not(:last-child)]:border-b">
            {selectedPatient.doctors?.map((doctor) => (
              <div key={doctor.doctor_id}>
                <KeyValue label="Doctor Name" value={doctor.doctor_name} />

                <KeyValue
                  label="Total Appointments"
                  value={`${doctor.total_appointments_count}`}
                />
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="appointments">
          <AccordionTrigger>Total Appointments</AccordionTrigger>

          <AccordionContent className="text-sm [&_div:not(:last-child)]:border-b">
            <KeyValue
              label="Total Appointments"
              value={`${selectedPatient.total_appointments_count}`}
              valueClassName="text-status-completed"
            />

            <KeyValue
              label="Completed Appointments"
              value={`${selectedPatient.total_appointments.completed_count}`}
              valueClassName="text-status-accepted"
            />

            <KeyValue
              label="Pending Appointments"
              value={`${selectedPatient.total_appointments.pending_count}`}
              valueClassName="text-status-pending"
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="personal">
          <AccordionTrigger>Personal Information</AccordionTrigger>

          <AccordionContent className="text-sm [&_div:not(:last-child)]:border-b">
            <KeyValue label="Blood Group" value={selectedPatient.blood_group} />

            <KeyValue
              label="Next Appointment"
              value={formatDateTime(
                selectedPatient.next_appointment?.date,
                selectedPatient.next_appointment?.time,
              )}
            />

            <KeyValue
              label="Last Visit"
              value={formatDateTime(
                selectedPatient.last_visit?.date,
                selectedPatient.last_visit?.time,
              )}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="summary">
          <AccordionTrigger>Medical Summary</AccordionTrigger>

          <AccordionContent className="text-sm [&_div:not(:last-child)]:border-b">
            {userRole === UserRole.Doctor && (
              <ViewHistoryBtn selectedPatient={selectedPatient} />
            )}

            <KeyValue
              label="Conditions"
              value={selectedPatient.conditions?.join(", ")}
            />

            <KeyValue
              label="Medications"
              value={selectedPatient.medications?.join(", ")}
            />

            <KeyValue
              label="Allergies"
              value={selectedPatient.allergies?.join(", ")}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

interface InfoCardProps {
  icon: React.ReactNode;
  value?: string | null;
  truncate?: boolean;
}

function InfoCard({ icon, value, truncate }: InfoCardProps) {
  return (
    <div className="border-border flex items-center gap-3 rounded-sm border p-2">
      {icon}

      <span
        className={cn(
          "flex-1",
          truncate && "truncate text-ellipsis whitespace-nowrap",
        )}
      >
        {value || "-"}
      </span>
    </div>
  );
}

interface KeyValueProps {
  label: string;
  value?: string | null;
  keyClassName?: string;
  valueClassName?: string;
}

function KeyValue({
  label,
  value,
  keyClassName,
  valueClassName,
}: KeyValueProps) {
  return (
    <div className="flex gap-3 px-3 py-2">
      <span className={cn("text-foreground/80 min-w-32", keyClassName)}>
        {label}
      </span>

      <span className={cn("flex-1", valueClassName)}>{value || "-"}</span>
    </div>
  );
}
