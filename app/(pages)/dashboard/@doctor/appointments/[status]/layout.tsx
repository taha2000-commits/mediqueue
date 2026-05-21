import { Metadata } from "next";
import { notFound } from "next/navigation";

import { Database } from "@/lib/supabase/types";

import RequestsMenubar from "../_components/RequestsMenubar";
export async function generateMetadata({
  params,
}: LayoutProps<"/dashboard/appointments/[status]">): Promise<Metadata> {
  const { status } = await params;

  return {
    title: { absolute: status.capitalize() + " Appointments" },
  };
}

type ValidTabType = Database["public"]["Enums"]["status"] | "expired";
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
      <RequestsMenubar selectedTab={status} />
      {children}
    </>
  );
};

export default layout;
