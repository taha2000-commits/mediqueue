"use client";

import { format } from "date-fns";
import { Mars, Venus, X } from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";

import StatusBadge from "@/app/components/StatusBadge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar } from "@/components/ui/avatar";
import useUser from "@/hooks/useUser";
import { cn, formatTime } from "@/lib/utils";
import { PatientWithAppointments } from "@/types/patients";
import { UserRole } from "@/types/user-role";

import { useSelectedPatientCtx } from "../../../_context/SelectedPatientCtx";
import ViewHistoryBtn from "./ViewHistoryBtn";

export default function SelectedPatient({
  patient,
  className,
}: {
  patient?: PatientWithAppointments;
  className?: string;
}) {
  const { selectedPatient, setSelectedPatient } = useSelectedPatientCtx();

  const { data: user } = useUser();

  const userRole = user?.user_metadata?.userRole;

  const data = patient ?? selectedPatient;
  if (!data) {
    return (
      <div className="bg-secondary relative ms-0 h-fit w-0 scale-x-0 overflow-hidden rounded-xl p-0 opacity-0 shadow transition-all duration-500" />
    );
  }

  const formatDateTime = (date?: string | null, time?: string | null) => {
    if (!date || !time) return "-";

    return `${format(date, "MMM dd, yyyy")} ${formatTime(time, "HH:mm aa")}`;
  };
  return (
    <div
      className={cn(
        "bg-secondary relative ms-4 h-fit w-sm space-y-4 rounded-xl p-4 shadow transition-all duration-500",
        className,
      )}
    >
      {!patient && (
        <button
          type="button"
          className="absolute top-4 right-4 z-10"
          onClick={() => {
            setSelectedPatient(undefined);
          }}
        >
          <X className="hover:text-muted-foreground cursor-pointer transition-colors" />
        </button>
      )}

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
          <h4 className="text-xl font-bold">{data.name}</h4>

          <div className="flex items-center gap-2">
            <p>ID: {data.id}</p>

            <StatusBadge
              status={data.active ? "accepted" : "cancelled"}
              text={data.active ? "active" : "inactive"}
            />
          </div>
        </div>
      </div>

      <div className="border-border rounded-2xl border text-sm [&_div:not(:last-child)]:border-b">
        <KeyValue label="Phone" value={data.phone} />
        <KeyValue
          label="Email"
          value={data.email}
          valueClassName="first-letter:normal-case"
        />
        <KeyValue label="Age" value={data.age ? `${data.age} years` : "-"} />
        <KeyValue
          label="Gender"
          value={
            <p className="flex items-center gap-1 capitalize">
              <span>{data.gender}</span>
              <span
                className={
                  data.gender == "male" ? "text-blue-500" : "text-pink-500"
                }
              >
                {data.gender == "male" ? (
                  <Mars size={16} />
                ) : (
                  <Venus size={16} />
                )}
              </span>
            </p>
          }
        />
      </div>

      <Accordion type="single" collapsible className="max-w-lg">
        <AccordionItem value="doctors">
          <AccordionTrigger>Doctors Information</AccordionTrigger>

          <AccordionContent className="text-sm [&_div:not(:last-child)]:border-b">
            {data.doctors?.map((doctor) => (
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
              value={`${data.total_appointments_count}`}
              valueClassName="text-status-completed"
            />

            <KeyValue
              label="Completed Appointments"
              value={`${data.total_appointments.completed_count}`}
              valueClassName="text-status-accepted"
            />

            <KeyValue
              label="Pending Appointments"
              value={`${data.total_appointments.pending_count}`}
              valueClassName="text-status-pending"
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="personal">
          <AccordionTrigger>Personal Information</AccordionTrigger>

          <AccordionContent className="text-sm [&_div:not(:last-child)]:border-b">
            <KeyValue label="Blood Group" value={data.blood_group} />

            <KeyValue
              label="Next Appointment"
              value={formatDateTime(
                data.next_appointment?.date,
                data.next_appointment?.time,
              )}
            />

            <KeyValue
              label="Last Visit"
              value={formatDateTime(
                data.last_visit?.date,
                data.last_visit?.time,
              )}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="summary">
          <AccordionTrigger>Medical Summary</AccordionTrigger>

          <AccordionContent className="text-sm [&_div:not(:last-child)]:border-b">
            {userRole === UserRole.Doctor && (
              <ViewHistoryBtn selectedPatient={data} />
            )}

            <KeyValue label="Conditions" value={data.conditions?.join(", ")} />

            <KeyValue
              label="Medications"
              value={data.medications?.join(", ")}
            />

            <KeyValue label="Allergies" value={data.allergies?.join(", ")} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

interface KeyValueProps {
  label: string;
  value?: string | ReactNode | null;
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

      <div className={cn("flex-1", valueClassName)}>{value || "-"}</div>
    </div>
  );
}
