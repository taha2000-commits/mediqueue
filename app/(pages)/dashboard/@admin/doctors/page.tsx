import { Metadata } from "next";

import PaginationFooter from "@/app/components/PaginationFooter";
import { doctorsService } from "@/lib/services/doctors";
import { statsServices } from "@/lib/services/stats";

import ControlBar from "./_components/ControlBar";
import DoctorsPageStats from "./_components/DoctorsPageStats";
import DoctorsTable from "./_components/DoctorsTable";

export const metadata: Metadata = {
  title: "Doctors",
};

const page = async ({ searchParams }: PageProps<"/dashboard/doctors">) => {
  const sp = await searchParams;

  const doctorsResponse = await doctorsService.getDoctors({
    ...sp,
    limit: sp.limit ?? "10",
  });

  const { doctors_per_specialization } = await statsServices.getDoctorsStats();
  return (
    <div className="space-y-4">
      <DoctorsPageStats />

      <div className="bg-secondary space-y-4 rounded-xl p-4">
        <ControlBar
          count={doctorsResponse.count}
          specializationOptions={doctors_per_specialization.map((sp) => ({
            text: sp.specialization,
            value: sp.specialization,
            count: sp.count ?? 0,
          }))}
        />
        <DoctorsTable doctors={doctorsResponse.results} />
        <PaginationFooter {...doctorsResponse} showRowPerPage={true} />
      </div>
    </div>
  );
};

export default page;
