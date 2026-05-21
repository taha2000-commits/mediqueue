import PaginationFooter from "@/app/components/PaginationFooter";
import { appointmentsService } from "@/lib/services/appointments";

import Appointment from "../../_components/Appointment";
import EmptySection from "../../_components/EmptySection";
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
    <div className="border-border overflow-hidden rounded-xl border">
      {appointments?.[0] ? (
        appointments.map((app) => (
          <Appointment appointment={app} key={app.id} />
        ))
      ) : (
        <EmptySection
          title="No Requests Found"
          description="There are currently no appointment requests available."
        />
      )}
      <PaginationFooter {...patientsResponse} className="p-2" />
    </div>
  );
};

export default AppointmentsPage;
