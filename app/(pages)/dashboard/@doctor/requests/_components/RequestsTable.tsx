"use client";

import CardsList from "@/app/components/CardsList";
import { useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useIsTablet } from "@/hooks/use-tablet";
import { AppointmentWithPriority } from "@/types/appointments";

import EmptySection from "../../_components/EmptySection";
import { ColumnKey, requestsCards } from "./cards";
import Request from "./Request";

const RequestsTable = ({
  appointments,
}: {
  appointments: AppointmentWithPriority[];
}) => {
  const isMobile = useIsMobile();
  const { open } = useSidebar();
  const isTablet = useIsTablet();

  if (!appointments?.[0])
    return (
      <EmptySection
        title="No Pending Requests"
        description="No patients are waiting for confirmation right now."
      />
    );
  if (isMobile || (isTablet && open))
    return (
      <CardsList<ColumnKey, AppointmentWithPriority>
        cards={requestsCards}
        data={appointments}
      />
    );
  return (
    <div className="border-border overflow-hidden rounded-xl border">
      {appointments.map((app) => (
        <Request key={app.id} request={app} />
      ))}
    </div>
  );
};

export default RequestsTable;
