import { EllipsisVertical } from "lucide-react";
import Image from "next/image";

import CustomTable from "@/app/components/table/table";
import { ColsType } from "@/app/components/table/types";
import { Avatar } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { doctorsService } from "@/lib/services/doctors";
import { getCapacityColor } from "@/lib/utils";
import { DoctorWithStats } from "@/types/doctors";

type ColumnKey =
  | "name_en"
  | "specialization_en"
  | "today_appointments_count"
  | "is_active"
  | "capacity_percent"
  | "actions";

export default async function DoctorsOverview() {
  const { results: doctors } = await doctorsService.getDoctors({
    limit: "5",
    page: "1",
  });

  const cols: ColsType<ColumnKey, DoctorWithStats> = [
    {
      columnKey: "name_en",
      header: "Doctor",
      accessorKey: "name_en",
      colSpan: 2,
      cell: (item) => <DoctorInfo doctor={item} />,
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
      value: (val) => (val as { total: number }).total,
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
      columnKey: "actions",
      header: "actions",
      colSpan: 1,
      cell: () => <EllipsisVertical size={16} />,
      align: "center",
    },
  ];

  return (
    <div className="bg-secondary flex-1 rounded-xl p-4 shadow">
      <h3 className="text-xl font-semibold">Doctors Overview</h3>
      <Separator className="mt-2 mb-4" />
      <CustomTable<ColumnKey, DoctorWithStats> cols={cols} data={doctors} />
    </div>
  );
}

const DoctorInfo = ({ doctor }: { doctor: DoctorWithStats }) => {
  return (
    <div className="flex items-center gap-2">
      <Avatar size="sm">
        <Image
          src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${doctor.avatar}`}
          alt={doctor.name_en}
          width={24}
          height={24}
        />
      </Avatar>
      <h6 className="text-sm font-semibold">{doctor.name_en}</h6>
    </div>
  );
};
