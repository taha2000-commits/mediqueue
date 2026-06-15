import { Siren } from "lucide-react";
import { Metadata } from "next";

import PaginationFooter from "@/app/components/PaginationFooter";
import { appointmentsService } from "@/lib/services/appointments";
import { cn } from "@/lib/utils";

import RequestDetails from "../appointments/_components/RequestDetails";
import HighPriorityRequest from "./_components/HighPriorityRequest";
import { RefreshButton } from "./_components/RefreshButton";
import RequestsTable from "./_components/RequestsTable";

export const metadata: Metadata = {
  title: "Requests",
};

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
      <div className="bg-secondary h-fit w-full space-y-4 rounded-xl p-4 shadow">
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
          <div className="bg-destructive/10 border-destructive w-full space-y-3 rounded-2xl border p-3 md:space-y-6 md:p-6">
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
              className={cn("flex flex-wrap gap-3 xl:gap-6", {
                "sm:grid-cols-2": first_three_high_priority.length === 2,
                "sm:grid-cols-3": first_three_high_priority.length >= 3,
              })}
            >
              {first_three_high_priority.map((req) => (
                <HighPriorityRequest key={req.id} req={req} />
              ))}
            </div>
          </div>
        )}
        <RequestsTable appointments={appointments} />
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

      <RequestDetails />
    </div>
  );
};

export default page;
