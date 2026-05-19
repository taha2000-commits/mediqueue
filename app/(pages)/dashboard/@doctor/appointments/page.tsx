import PaginationFooter from "@/app/components/PaginationFooter";
import { appointmentsService } from "@/lib/services/appointments";

import Appointment from "../_components/Appointment";
import EmptySection from "../_components/EmptySection";
import RequestDetails from "./_components/RequestDetails";
import RequestsMenubar from "./_components/RequestsMenubar";
const page = async ({ searchParams }: PageProps<"/dashboard/appointments">) => {
  const sp = await searchParams;

  const {
    next,
    page,
    prev,
    numOfPage,
    count,
    from,
    to,
    results: appointments,
  } = await appointmentsService.getAll({
    params: {
      ...sp,
      limit: sp.limit ?? "10",
      sort: sp.sort ?? "newest",
    },
  });

  return (
    <div className="flex">
      <div className="bg-second-background h-fit w-full space-y-5 rounded-xl p-4 shadow">
        <div className="">
          <h2 className="text-2xl font-bold capitalize">Appointments</h2>
          <p className="text-muted-foreground">
            View all patient appointments and their current statuses.
          </p>
        </div>

        <RequestsMenubar />

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
          <PaginationFooter
            count={count}
            from={from}
            next={next}
            numOfPage={numOfPage}
            page={page}
            prev={prev}
            to={to}
            className="p-2"
          />
        </div>
      </div>

      <RequestDetails />
    </div>
  );
};

export default page;
