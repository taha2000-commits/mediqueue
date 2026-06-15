import { format } from "date-fns";
import { Mail, Mars, Phone, Venus } from "lucide-react";
import Image from "next/image";

import StatusBadge from "@/app/components/StatusBadge";
import { ColsType } from "@/app/components/table/types";
import { Avatar } from "@/components/ui/avatar";
import { cn, formatTime } from "@/lib/utils";
import { PatientWithAppointments } from "@/types/patients";

import PatientRowActions from "./PatientRowActions";

export type ColumnKey =
  | "patient"
  | "contact"
  | "last_visited"
  | "total_appointments"
  | "age-gender"
  | "status"
  | "actions";

export const cols: (params?: {
  type?: "cards" | "cols";
}) => ColsType<ColumnKey, PatientWithAppointments> = (params) => {
  const { type } = params ?? { type: "cols" };
  const isCards = type == "cards";
  return [
    {
      columnKey: "patient",
      header: "patient",
      colSpan: 2,
      cell: (patient) => <PatientInfo patient={patient} isCards={isCards} />,
    },
    {
      columnKey: "contact",
      header: "contact",
      colSpan: 2,
      cell: (patient) => <ContactInfo patient={patient} isCards={isCards} />,
    },
    {
      columnKey: "age-gender",
      header: "Age / Gender",
      colSpan: 1,
      isSorted: true,
      accessorKey: "age",
      cell: (patient) => (
        <div
          className={cn(
            "flex flex-col flex-wrap justify-between gap-x-2 text-center md:items-start",
            { "flex-row items-center": isCards },
          )}
        >
          <p className="font-medium">{patient.age}</p>
          <p className={"flex items-center gap-1"}>
            <span
              className={
                patient.gender == "male" ? "text-blue-500" : "text-pink-500"
              }
            >
              {patient.gender == "male" ? (
                <Mars size={16} />
              ) : (
                <Venus size={16} />
              )}
            </span>
            <span className="text-muted-foreground">{patient.gender}</span>
          </p>
        </div>
      ),
    },
    {
      columnKey: "total_appointments",
      header: "total appointments",
      accessorKey: "total_appointments_count",
      colSpan: 2,
      align: "center",
      isSorted: true,
      cell: (patient) => (
        <div
          className={cn(
            "flex flex-col flex-wrap items-center justify-between gap-x-2 text-center",
            { "flex-row": isCards },
          )}
        >
          <p className="font-medium">{patient.total_appointments_count}</p>
          <p className="bg-status-accepted/10 text-status-accepted w-fit rounded-md px-2 py-1 text-xs">
            completed:{" "}
            <span className="font-bold">
              {patient.total_appointments.completed_count}
            </span>
          </p>
        </div>
      ),
    },
    {
      columnKey: "last_visited",
      header: "last appointment",
      colSpan: 1,
      cell: (patient) => (
        <DateTimeCell last_visit={patient.last_visit} isCards={isCards} />
      ),
    },
    {
      columnKey: "status",
      header: "status",
      colSpan: 1,
      align: "center",
      cell: (patient) => (
        <StatusBadge
          status={patient.active ? "accepted" : "cancelled"}
          text={patient.active ? "active" : "inactive"}
          className="rounded-md p-2 md:py-3"
        />
      ),
    },
    {
      columnKey: "actions",
      header: "actions",
      colSpan: 1,
      align: "center",
      cell: (patient) => (
        <PatientRowActions patient={patient} isCards={isCards} />
      ),
    },
  ];
};

const PatientInfo = ({
  patient,
  isCards,
}: {
  patient: PatientWithAppointments;
  isCards: boolean;
}) => {
  return (
    <div className="flex items-center gap-2">
      <Avatar className={cn("size-10", { "size-8!": isCards })}>
        <Image
          src={
            patient.gender == "male" ? "/male-avatar.png" : "/female-avatar.png"
          }
          alt="avatar"
          width={40}
          height={40}
        />
      </Avatar>

      <div
        className={cn(
          "flex flex-1 flex-col flex-wrap items-start justify-between gap-x-2 text-center",
          { "flex-row! items-center!": isCards },
        )}
      >
        <h6 className="text-sm font-semibold">{patient.name}</h6>

        <p className="text-muted-foreground">
          ID: {patient.id} - (
          <span className="font-bold text-pink-600">{patient.blood_group}</span>
          )
        </p>
      </div>
    </div>
  );
};

const ContactInfo = ({
  patient,
  isCards,
}: {
  patient: PatientWithAppointments;
  isCards: boolean;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col flex-wrap items-start gap-x-2 text-center [&_svg]:text-blue-400",
        { "flex-row items-center justify-between": isCards },
      )}
    >
      <div className="flex items-center gap-1">
        <Phone size={16} />
        <p>{patient.phone}</p>
      </div>
      <div className="flex items-center gap-1">
        <Mail size={16} />
        <p className="truncate text-nowrap text-ellipsis first-letter:normal-case">
          {patient.email}
        </p>
      </div>
    </div>
  );
};

type DateTimeCellProps = {
  last_visit: {
    date: string;
    time: string;
    doctor_name: string;
  };
  isCards: boolean;
};

const DateTimeCell = ({ last_visit, isCards }: DateTimeCellProps) => {
  if (!last_visit) {
    return (
      <div className="flex items-center">
        <p>_</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col flex-wrap items-start justify-between gap-x-2",
        { "flex-row items-center": isCards },
      )}
    >
      <p className="font-medium">
        {format(new Date(last_visit.date), "MMM dd,")}
        {formatTime(last_visit.time, "HH:mm aa")}
      </p>
      <p className="text-muted-foreground">{last_visit.doctor_name}</p>
    </div>
  );
};
