import { Metadata } from "next";

import PaginationFooter from "@/app/components/PaginationFooter";
import CustomTable from "@/app/components/table/table";
import { doctorsService } from "@/lib/services/doctors";
import { DoctorWithStats } from "@/types/doctors";

import ControlBar from "./_components/ControlBar";
import DoctorsPageStats from "./_components/DoctorsPageStats";
import FiltersBar from "./_components/FiltersBar";
import { cols, ColumnKey } from "./cols";

export const metadata: Metadata = {
  title: "Doctors",
};

const page = async ({ searchParams }: PageProps<"/dashboard/doctors">) => {
  const sp = await searchParams;

  const doctorsResponse = await doctorsService.getDoctors({
    ...sp,
    limit: sp.limit ?? "10",
  });

  return (
    <div className="space-y-4">
      <DoctorsPageStats />

      <ControlBar count={doctorsResponse.count} />
      <div className="bg-secondary space-y-4 rounded-xl p-4">
        <FiltersBar />
        <CustomTable<ColumnKey, DoctorWithStats>
          cols={cols}
          data={doctorsResponse.results}
        />
        <PaginationFooter {...doctorsResponse} showRowPerPage={true} />
      </div>
    </div>
  );
};

export default page;
