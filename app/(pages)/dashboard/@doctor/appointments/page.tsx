import { Metadata } from "next";

import { RefreshButton } from "../requests/_components/RefreshButton";
import AppointmentsPage from "./_components/AppointmentsPage";
import RequestsMenubar from "./_components/RequestsMenubar";

export const metadata: Metadata = {
  title: "All Appointments",
};

const page = async ({ searchParams }: PageProps<"/dashboard/appointments">) => {
  return (
    <>
      <div className="">
        <h2 className="text-2xl font-bold capitalize">Appointments</h2>
        <p className="text-muted-foreground">
          view all appointments and their current statuses.
        </p>
      </div>
      <RequestsMenubar />
      <div className="flex justify-end">
        <RefreshButton variant="icon" className="rounded-lg" />
      </div>
      <AppointmentsPage searchParams={searchParams} />
    </>
  );
};

export default page;
