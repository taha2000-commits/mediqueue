import { format, isTomorrow } from "date-fns";
import { CalendarDays, Clock8, Mars, Venus } from "lucide-react";
import Image from "next/image";

import StatusBadge from "@/app/components/StatusBadge";
import { ColsType } from "@/app/components/table/types";
import { Avatar } from "@/components/ui/avatar";
import { formatTime } from "@/lib/utils";
import { AppointmentWithPriority } from "@/types/appointments";

import AppointmentCardActions from "./AppointmentCardActions";

export type ColumnKey =
  | "patient"
  | "age-gender"
  | "date"
  | "time"
  | "type"
  | "notes"
  | "status"
  | "actions";

export const appointmentsCards: ColsType<ColumnKey, AppointmentWithPriority> = [
  {
    columnKey: "patient",
    header: "patient",
    cell: ({ patient }) => (
      <div className="flex items-center gap-2">
        <Avatar className="size-8">
          <Image src={"/male-avatar.png"} alt="avatar" width={32} height={32} />
        </Avatar>
        <div className="flex flex-1 flex-wrap items-center justify-between gap-x-2 text-center">
          <h6 className="text-sm font-semibold">{patient.name}</h6>

          <p className="text-muted-foreground">
            ID: {patient.id} - (
            <span className="font-bold text-pink-600">
              {patient.blood_group}
            </span>
            )
          </p>
        </div>
      </div>
    ),
  },
  {
    columnKey: "age-gender",
    header: "Age / Gender",
    cell: ({ patient }) => (
      <div className="flex flex-wrap items-center justify-between gap-x-2 text-center">
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
    header: "Date",
    columnKey: "date",
    cell: ({ date }) => (
      <div className="flex gap-2">
        <CalendarDays size={16} />
        <span className="text-sm font-bold">
          {date
            ? isTomorrow(date)
              ? "Tomorrow"
              : format(date, "MMM d, yyyy")
            : "-"}{" "}
        </span>
      </div>
    ),
  },
  {
    header: "Time",
    columnKey: "time",
    cell: ({ time }) => (
      <div className="flex gap-2">
        <Clock8 size={16} />
        <span className="col-span-4">{formatTime(time, "HH:mm aa")}</span>
      </div>
    ),
  },
  {
    header: "Type",
    columnKey: "type",
    cell: ({ type }) => <>{type.split("_").join(" ")}</>,
  },
  {
    header: "Notes",
    columnKey: "notes",
    accessorKey: "notes",
    cell: ({ notes }) => (
      <div className="w-full truncate text-sm text-nowrap text-ellipsis">
        {notes == "" ? "-" : notes}
      </div>
    ),
  },
  {
    columnKey: "status",
    header: "Status",
    cell: ({ priority, status }) => (
      <>
        {priority == "expired" ? (
          <StatusBadge status={"cancelled"} text="expired" />
        ) : (
          <StatusBadge status={status} />
        )}
      </>
    ),
  },
  {
    columnKey: "actions",
    header: "Actions",
    cell: (item) => <AppointmentCardActions appointment={item} />,
  },
];
