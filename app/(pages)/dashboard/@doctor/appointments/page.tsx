import { Metadata } from "next";

import AppointmentsPage from "./_components/AppointmentsPage";
import RequestsMenubar from "./_components/RequestsMenubar";

export const metadata: Metadata = {
  title: "Appointments",
};

const page = async ({ searchParams }: PageProps<"/dashboard/appointments">) => {
  return (
    <>
      <RequestsMenubar />
      <AppointmentsPage searchParams={searchParams} />
    </>
  );
};

export default page;
