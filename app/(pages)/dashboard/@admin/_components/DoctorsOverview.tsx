import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { doctorsService } from "@/lib/services/doctors";

import DoctorsOverviewTable from "./DoctorsOverviewTable";

export default async function DoctorsOverview() {
  const { results: doctors } = await doctorsService.getDoctors({
    limit: "5",
    page: "1",
  });

  return (
    <div className="bg-secondary xs:min-w-xl min-w-xs rounded-xl p-4 shadow">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Doctors Overview</h3>
        <Link
          href={"dashboard/doctors"}
          className="text-tertiary hover:text-muted-foreground text-sm underline"
        >
          show more
        </Link>
      </div>
      <Separator className="mt-2 mb-4" />
      <DoctorsOverviewTable doctors={doctors} />
    </div>
  );
}
