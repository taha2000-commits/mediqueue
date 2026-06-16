import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import StatusBadge from "@/app/components/StatusBadge";
import { ColsType } from "@/app/components/table/types";
import { Avatar } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { cn, getCapacityColor } from "@/lib/utils";
import { DoctorWithStats } from "@/types/doctors";

export type ColumnKey =
  | "name_en"
  | "specialization_en"
  | "today_appointments_count"
  | "is_active"
  | "capacity_percent"
  | "status"
  | "actions";

export const cols: (params?: {
  type?: "cards" | "cols";
}) => ColsType<ColumnKey, DoctorWithStats> = (params) => {
  const { type } = params ?? { type: "cols" };
  const isCards = type == "cards";
  return [
    {
      columnKey: "name_en",
      header: "Doctor",
      accessorKey: "name_en",
      colSpan: 2,
      cell: (item) => (
        <div className="flex items-center gap-2">
          <Avatar
            className={cn("bg-background size-10", { "size-8!": isCards })}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${item.avatar}`}
              alt={item.name_en}
              width={40}
              height={40}
            />
          </Avatar>
          <div className="">
            <h6 className="text-sm font-semibold">{item.name_en}</h6>
            <p className="text-muted-foreground truncate text-ellipsis first-letter:normal-case sm:max-w-45">
              {item.email}
            </p>
          </div>
        </div>
      ),
    },
    {
      columnKey: "specialization_en",
      header: "Specialty",
      accessorKey: "specialization_en",
      colSpan: 1,
    },
    {
      columnKey: "today_appointments_count",
      header: "Appointments today",
      colSpan: 2,
      accessorKey: "today_appointments_count",
      isSorted: true,
      cell: (props) => (
        <div
          className={cn("flex flex-col items-start justify-between space-y-2", {
            "flex-row items-center": isCards,
          })}
        >
          <p className="">{props.today_appointments_count.total}</p>
          <div className="flex gap-5">
            <div className="text-status-completed flex flex-col items-center text-xs">
              <span className="">
                {props.today_appointments_count.completed}
              </span>
              <span>comp.</span>
            </div>
            <div className="text-status-pending flex flex-col items-center text-xs">
              <span className="">{props.today_appointments_count.pending}</span>
              <span>pend.</span>
            </div>
            <div className="text-status-rejected flex flex-col items-center text-xs">
              <span className="">
                {props.today_appointments_count.rejected}
              </span>
              <span>rej.</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      columnKey: "capacity_percent",
      header: "capacity",
      accessorKey: "capacity_percent",
      colSpan: 1,
      cell: ({ capacity_percent }) => (
        <div className="grid w-full grid-cols-5 items-center gap-2">
          <Progress
            className="col-span-4 h-fit"
            value={capacity_percent}
            color={getCapacityColor(capacity_percent)}
          />
          <span className="col-span-1 text-xs">
            {capacity_percent?.toFixed(0) ?? 0}%
          </span>
        </div>
      ),
    },
    {
      columnKey: "status",
      header: "status",
      colSpan: 1,
      cell: ({ is_active }) => (
        <StatusBadge
          status={is_active ? "accepted" : "rejected"}
          text={is_active ? "Active" : "Inactive"}
        />
      ),
      align: "center",
    },
    {
      columnKey: "actions",
      header: "actions",
      colSpan: 1,
      cell: ({ id }) => (
        <div className="flex gap-2">
          <Link
            href={`/dashboard/doctor/${id}`}
            replace
            className={cn(
              "border-border bg-secondary hover:bg-muted hover:text-foreground dark:hover:bg-input/30 flex size-9 items-center justify-center rounded-lg border dark:bg-transparent",
              {
                "size-7 rounded-md": isCards,
              },
            )}
          >
            <Eye size={16} />
          </Link>
        </div>
      ),
      align: "center",
    },
  ];
};
