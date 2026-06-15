"use client";
import CardsList from "@/app/components/CardsList";
import CustomTable from "@/app/components/table/table";
import { useSidebar } from "@/components/ui/sidebar";
import { useIsTablet } from "@/hooks/use-tablet";
import { DoctorWithStats } from "@/types/doctors";

import { cols, ColumnKey } from "../cols";

const DoctorsTable = ({ doctors }: { doctors: DoctorWithStats[] }) => {
  const { isMobile, open } = useSidebar();
  const isTablet = useIsTablet();
  console.log("doctors", doctors);

  if (isMobile || (isTablet && open))
    return (
      <CardsList<ColumnKey, DoctorWithStats>
        cards={cols({ type: "cards" })}
        data={doctors}
      />
    );
  return (
    <div>
      <CustomTable<ColumnKey, DoctorWithStats>
        cols={cols()}
        data={doctors}
        excludedColumns={isTablet ? ["capacity_percent"] : []}
      />
    </div>
  );
};

export default DoctorsTable;
