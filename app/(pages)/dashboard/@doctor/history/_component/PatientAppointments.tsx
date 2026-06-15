"use client";
import CardsList from "@/app/components/CardsList";
import { useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useIsTablet } from "@/hooks/use-tablet";
import { AppointmentWithPriority } from "@/types/appointments";

import Appointment from "../../_components/Appointment";
import EmptySection from "../../_components/EmptySection";
import { useRequestsContext } from "../../_context/RequestsContext";
import {
  appointmentsCards,
  ColumnKey,
} from "../../appointments/_components/cards";

interface PatientAppointmentsProps {
  appointments: AppointmentWithPriority[];
}

export default function PatientAppointments({
  appointments,
}: PatientAppointmentsProps) {
  const { chosenAppointment } = useRequestsContext();
  const isMobile = useIsMobile();
  const { open } = useSidebar();
  const isTablet = useIsTablet();
  return (
    <div className="bg-secondary h-fit flex-1 space-y-5 rounded-xl p-4 shadow">
      <div className="border-b-border border-b pb-5 text-xl font-black">
        appointments
      </div>
      {!appointments?.[0] ? (
        <EmptySection
          title="No Requests Found"
          description="There are currently no appointment requests available."
        />
      ) : isMobile || (isTablet && (chosenAppointment || open)) ? (
        <CardsList<ColumnKey, AppointmentWithPriority>
          data={appointments}
          cards={appointmentsCards}
        />
      ) : (
        <div className="border-border overflow-hidden rounded-xl border">
          {appointments.map((app) => (
            <Appointment appointment={app} key={app.id} />
          ))}
        </div>
      )}
    </div>
  );
}
