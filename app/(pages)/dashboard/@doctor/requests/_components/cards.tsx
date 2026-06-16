import { format, isTomorrow } from "date-fns";
import { Mars, Venus } from "lucide-react";
import Image from "next/image";

import { ColsType } from "@/app/components/table/types";
import { Avatar } from "@/components/ui/avatar";
import { cn, formatRemainingTime, formatTime } from "@/lib/utils";
import { AppointmentWithPriority } from "@/types/appointments";

import RemainingTimeCountDown from "../../_components/RemainingTimeCountDown";
import RequestCardActions from "./RequestCardActions";

export type ColumnKey =
  | "patient"
  | "age-gender"
  | "requested-for"
  | "type"
  | "waiting-time"
  | "actions";

export const requestsCards: ColsType<ColumnKey, AppointmentWithPriority> = [
  {
    columnKey: "patient",
    header: "patient",
    cell: ({ patient }) => (
      <div className="flex items-center gap-2">
        <Avatar className="size-8">
          <Image src={"/male-avatar.png"} alt="avatar" width={32} height={32} />
        </Avatar>
        <div className="flex flex-1 flex-wrap items-center justify-between gap-x-2 text-center md:flex-col md:items-start">
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
      <div className="flex flex-wrap items-center justify-between gap-x-2 text-center md:flex-col md:items-start">
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
    header: "Requested for",
    columnKey: "requested-for",
    cell: ({ date, time }) => (
      <span className="text-sm font-bold">
        {date
          ? isTomorrow(date)
            ? "Tomorrow"
            : format(date, "MMM d, yyyy")
          : "-"}{" "}
        {time ? formatTime(time, "HH:mm aa") : "-"}
      </span>
    ),
  },
  {
    header: "Type",
    columnKey: "type",
    cell: ({ type }) => <>{type.split("_").join(" ")}</>,
  },
  {
    columnKey: "waiting-time",
    header: "Waiting Time",
    cell: ({ priority, remaining_time }) => (
      <>
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
      </>
    ),
  },
  {
    columnKey: "actions",
    header: "Actions",
    cell: (item) => <RequestCardActions appointment={item} />,
  },
];
