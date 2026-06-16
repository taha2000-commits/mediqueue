import PaginationFooter from "@/app/components/PaginationFooter";
import { appointmentsService } from "@/lib/services/appointments";

import AppointmentsTable from "./AppointmentsTable";
type AppointmentsPageProps = {
  params?: Promise<{
    status: string;
  }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const AppointmentsPage = async ({
  params,
  searchParams,
}: AppointmentsPageProps) => {
  const sp = await searchParams;
  const appointmentsPageParams = await params;

  const patientsResponse = await appointmentsService.getAll({
    params: {
      ...sp,
      status: appointmentsPageParams?.status,
      limit: sp.limit ?? "10",
      sort: sp.sort ?? "newest",
    },
  });

  const { results: appointments } = patientsResponse;

  return (
    <div>
      <AppointmentsTable appointments={appointments} />
      <PaginationFooter {...patientsResponse} className="p-2" />
    </div>
  );
};

export default AppointmentsPage;
