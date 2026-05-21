import { FileX } from "lucide-react";
import { HashLoader } from "react-spinners";

import { PRIMARY_COLOR } from "@/lib/constants";
import { AppointmentWithPriority } from "@/types/appointments";

import EmptySection from "../../_components/EmptySection";
import PatientAppointment from "./PatientAppointment";

const PatientAppointmentsList = ({
  isLoading,
  appointments,
}: {
  isLoading: boolean;
  appointments: AppointmentWithPriority[] | undefined;
}) => {
  return (
    <>
      {isLoading ? (
        <div className="flex h-25 w-full items-center justify-center">
          <HashLoader color={PRIMARY_COLOR} />
        </div>
      ) : (
        <div className="border-border max-h-100 overflow-auto rounded-xl border">
          {appointments?.[0] ? (
            appointments.map((app) => (
              <PatientAppointment key={app.id} appointment={app} />
            ))
          ) : (
            <EmptySection
              title="No Appointment History"
              description="Cancelled appointments will appear here."
              icon={FileX}
            />
          )}
        </div>
      )}
    </>
  );
};

export default PatientAppointmentsList;
