import { Metadata } from "next";
import { notFound } from "next/navigation";

import { Appointment_Status } from "@/types/enums";

import { RefreshButton } from "../../requests/_components/RefreshButton";
import RequestsMenubar from "../_components/RequestsMenubar";
export async function generateMetadata({
  params,
}: LayoutProps<"/dashboard/appointments/[status]">): Promise<Metadata> {
  const { status } = await params;

  return {
    title: status.capitalize() + " Appointments",
  };
}

type ValidTabType = Appointment_Status | "expired";
const validTabs: ValidTabType[] = [
  "accepted",
  "cancelled",
  "completed",
  "pending",
  "rejected",
  "expired",
];
const layout = async ({
  children,
  params,
}: LayoutProps<"/dashboard/appointments/[status]">) => {
  const { status } = await params;
  if (!status || !validTabs.includes(status as ValidTabType)) return notFound();

  return (
    <>
      <div className="">
        <h2 className="text-2xl font-bold capitalize">
          {status.capitalize()} Appointments
        </h2>
        <p className="text-muted-foreground">
          view all {status} appointments and their current statuses.
        </p>
      </div>
      <RequestsMenubar selectedTab={status} />
      <div className="flex justify-end">
        <RefreshButton variant="icon" className="rounded-lg" />
      </div>
      {children}
    </>
  );
};

export default layout;
