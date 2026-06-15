"use client";
import CardsList from "@/app/components/CardsList";
import { useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useIsTablet } from "@/hooks/use-tablet";
import { AppointmentWithPriority } from "@/types/appointments";

import Appointment from "../../_components/Appointment";
import EmptySection from "../../_components/EmptySection";
import { useRequestsContext } from "../../_context/RequestsContext";
import { appointmentsCards, ColumnKey } from "./cards";

const AppointmentsTable = ({
  appointments,
}: {
  appointments: AppointmentWithPriority[];
}) => {
  const { chosenAppointment } = useRequestsContext();

  const isMobile = useIsMobile();
  const { open } = useSidebar();
  const isTablet = useIsTablet();
  if (!appointments?.[0])
    return (
      <EmptySection
        title="No Requests Found"
        description="There are currently no appointment requests available."
      />
    );
  if (isMobile || (isTablet && (chosenAppointment || open)))
    return (
      <CardsList<ColumnKey, AppointmentWithPriority>
        cards={appointmentsCards}
        data={appointments}
      />
    );
  return (
    <div className="border-border overflow-hidden rounded-xl border">
      {appointments.map((app) => (
        <Appointment key={app.id} appointment={app} />
      ))}
    </div>
  );
};

export default AppointmentsTable;
