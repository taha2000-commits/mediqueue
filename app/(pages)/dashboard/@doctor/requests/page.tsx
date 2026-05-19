import { Siren } from "lucide-react";

import PaginationFooter from "@/app/components/PaginationFooter";
import { appointmentsService } from "@/lib/services/appointments";
import { cn } from "@/lib/utils";

import EmptySection from "../_components/EmptySection";
import RequestDetails from "../appointments/_components/RequestDetails";
import HighPriorityRequest from "./_components/HighPriorityRequest";
import { RefreshButton } from "./_components/RefreshButton";
import Request from "./_components/Request";

const page = async ({ searchParams }: PageProps<"/dashboard/requests">) => {
  const sp = await searchParams;

  const {
    results: appointments,
    count,
    from,
    next,
    numOfPage,
    page,
    prev,
    to,
  } = await appointmentsService.getAll({
    params: {
      ...sp,
      limit: sp.limit ?? "10",
      status: "pending",
    },
  });

  const { results: first_three_appointments } =
    await appointmentsService.getAll({
      params: {
        limit: "3",
        status: "pending",
        priority: "high",
      },
    });
  const first_three_high_priority = first_three_appointments.filter(
    (app) => app.priority == "high",
  );
  return (
    <div className="flex">
      <div className="bg-second-background h-fit w-full space-y-5 rounded-xl p-4 shadow">
        <div className="">
          <h2 className="text-2xl font-bold capitalize" id="el">
            Appointment Requests
          </h2>
          <p className="text-muted-foreground">
            Review and respond to the appointment requests from the patient
          </p>
        </div>
        <div className="flex justify-end">
          <RefreshButton />
        </div>
        {first_three_high_priority?.[0] && (
          <div className="bg-destructive/10 border-destructive w-fit space-y-6 rounded-2xl border p-6">
            <div className="text-destructive flex items-center gap-3">
              <div className="bg-destructive/20 rounded-2xl p-3">
                <Siren size={24} />
              </div>
              <div className="">
                <h3 className="flex gap-x-2 text-2xl font-bold capitalize">
                  high priority requests
                  <span className="bg-destructive/20 flex h-8 w-8 items-center justify-center rounded-full text-xl">
                    3
                  </span>
                </h3>
                <p className="text-muted-foreground font-bold">
                  Requests that need immediate attention
                </p>
              </div>
            </div>
            <div
              className={cn("grid gap-6", {
                "grid-cols-2": first_three_high_priority.length === 2,

                "grid-cols-3": first_three_high_priority.length >= 3,
              })}
            >
              {first_three_high_priority.map((req) => (
                <HighPriorityRequest key={req.id} req={req} />
              ))}
            </div>
          </div>
        )}
        <div className="border-border overflow-hidden rounded-xl border">
          {appointments?.[0] ? (
            appointments.map((app) => <Request key={app.id} request={app} />)
          ) : (
            <EmptySection
              title="No Pending Requests"
              description="No patients are waiting for confirmation right now."
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
