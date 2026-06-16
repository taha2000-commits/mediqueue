import PaginationFooter from "@/app/components/PaginationFooter";
import { Separator } from "@/components/ui/separator";
import { getUser } from "@/lib/auth/getUser";
import { patientsService } from "@/lib/services/patients";

import PatientsTable from "./PatientsTable";

async function TodayAppointmentsSec({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const user = await getUser();
  const {
    results: patients,
    count,
    from,
    next,
    numOfPage,
    page,
    prev,
    to,
  } = await patientsService.getAll({
    doctor_id: `${user?.id}`,
    params: { today: true, limit: "5", ...searchParams },
  });
  return (
    <div className="bg-secondary border-border h-fit flex-1 rounded-2xl border p-6">
      <h3 className="text-xl font-semibold">Todays Patients</h3>
      <Separator className="mt-2 mb-4" />
      <PatientsTable patients={patients} />
      <PaginationFooter
        count={count}
        from={from}
        next={next}
        numOfPage={numOfPage}
        page={page}
        prev={prev}
        to={to}
        showRowPerPage={false}
        className="mt-2"
      />
    </div>
  );
}
export default TodayAppointmentsSec;
