import { AppointmentWithPriority } from "@/types/appointments";

import Appointment from "../../_components/Appointment";
import EmptySection from "../../_components/EmptySection";

interface PatientAppointmentsProps {
  appointments: AppointmentWithPriority[];
}

export default function PatientAppointments({
  appointments,
}: PatientAppointmentsProps) {
  return (
    <div className="bg-secondary h-fit flex-1 space-y-5 rounded-xl p-4 shadow">
      <div className="border-b-border border-b pb-5 text-xl font-black">
        appointments
      </div>
      <div className="border-border overflow-hidden rounded-xl border">
        {appointments?.[0] ? (
          appointments.map((app) => (
            <Appointment appointment={app} key={app.id} />
          ))
        ) : (
          <EmptySection
            title="No Pending Requests"
            description="No patients are waiting for confirmation right now."
          />
        )}
      </div>
    </div>
  );
}
