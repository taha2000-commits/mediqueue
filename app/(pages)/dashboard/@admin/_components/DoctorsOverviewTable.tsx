"use client";
import Image from "next/image";

import CardsList from "@/app/components/CardsList";
import CustomTable from "@/app/components/table/table";
import { ColsType } from "@/app/components/table/types";
import { Avatar } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useSidebar } from "@/components/ui/sidebar";
import { useIsTablet } from "@/hooks/use-tablet";
import { getCapacityColor } from "@/lib/utils";
import { DoctorWithStats } from "@/types/doctors";

type ColumnKey =
  | "name_en"
  | "specialization_en"
  | "today_appointments_count"
  | "is_active"
  | "capacity_percent";
export const cols: (params?: {
  type?: "cards" | "cols";
}) => ColsType<ColumnKey, DoctorWithStats> = () => {
  return [
    {
      columnKey: "name_en",
      header: "Doctor",
      accessorKey: "name_en",
      colSpan: 2,
      cell: ({ avatar, name_en }) => (
        <div className="flex items-center gap-2">
          <Avatar size="sm">
            <Image
              src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${avatar}`}
              alt={name_en}
              width={24}
              height={24}
            />
          </Avatar>
          <h6 className="text-sm font-semibold">{name_en}</h6>
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
      accessorKey: "today_appointments_count",
      colSpan: 2,
      align: "center",
      value: (val) => (val as { total: number }).total,
    },
    {
      columnKey: "capacity_percent",
      header: "capacity",
      accessorKey: "capacity_percent",
      colSpan: 1,
      cell: ({ capacity_percent }) => (
        <div className="flex w-full flex-wrap items-center gap-2">
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
  ];
};
const DoctorsOverviewTable = ({ doctors }: { doctors: DoctorWithStats[] }) => {
  const { isMobile, open } = useSidebar();
  const isTablet = useIsTablet();

  if (isMobile || (isTablet && open))
    return (
      <CardsList<ColumnKey, DoctorWithStats>
        cards={cols({ type: "cards" })}
        data={doctors}
      />
    );
  return (
    <CustomTable<ColumnKey, DoctorWithStats> cols={cols()} data={doctors} />
  );
};

export default DoctorsOverviewTable;
