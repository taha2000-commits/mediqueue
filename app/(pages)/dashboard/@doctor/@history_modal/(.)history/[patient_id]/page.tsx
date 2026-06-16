"use client";
import {
  Calendar,
  CalendarHeart,
  CircleCheckBig,
  CircleX,
  Clock3,
  Phone,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { HashLoader } from "react-spinners";

import { Avatar } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import usePatient from "@/hooks/usePatient";
import usePatientAppointments from "@/hooks/usePatientAppointment";
import { PRIMARY_COLOR } from "@/lib/constants";
import { Appointment_Status } from "@/types/enums";

import PatientAppointmentsList from "../../../history/_component/PatientAppointmentsList";
import SmallStatusStat from "../../../history/_component/SmallStatusStat";

const Modal = () => {
  const { patient_id } = useParams();
  const router = useRouter();

  const [status, setStatus] = useState<Appointment_Status>();

  const { data: patient, isLoading: isLoadingPatient } = usePatient(
    `${patient_id}`,
  );

  const { data: patientAppointments } = usePatientAppointments(`${patient_id}`);

  const apps = status
    ? patientAppointments?.filter((req) => req.status == status)
    : patientAppointments;

  function numOfRequests(status?: Appointment_Status) {
    if (!status) return patientAppointments?.length ?? 0;
    return (
      patientAppointments?.filter((req) => req.status == status).length ?? 0
    );
  }
  console.log("apps", apps);

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) router.back();
      }}
    >
      <DialogContent
        className="max-h-5/6 max-w-11/12 min-w-11/12 overflow-auto rounded-2xl p-3 sm:rounded-4xl sm:p-6 lg:max-w-9/12 lg:min-w-9/12 xl:max-w-8/12 xl:min-w-8/12"
        aria-describedby={undefined}
      >
        <DialogTitle className="text-2xl font-bold">
          Patient History
        </DialogTitle>
        {isLoadingPatient && (
          <div className="flex h-100 w-full items-center justify-center">
            <HashLoader color={PRIMARY_COLOR} />
          </div>
        )}
        {patient ? (
          <div className="flex flex-col gap-2 lg:flex-row">
            <div className="xs:flex-row flex h-fit flex-col gap-2 lg:flex-col">
              <div className="bg-secondary flex flex-1 flex-col gap-2 rounded-xl p-3">
                <div className="xs:flex-col flex items-center gap-2">
                  <Avatar className="h-17 w-17">
                    <Image
                      src={"/female-avatar.png"}
                      alt="sss"
                      width={68}
                      height={68}
                    />
                  </Avatar>
                  <div className="xs:items-center flex flex-col">
                    <h2 className="text-xl font-bold">{patient.name}</h2>
                    <p className="">ID: {patient.id}</p>
                  </div>
                </div>
                <div className="xs:items-center flex flex-col gap-2">
                  <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <CalendarHeart size={16} />
                    <span className="normal-case">{patient.age} years</span>
                    <span>-</span>
                    <span>{patient?.gender}</span>
                  </div>
                  <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <Phone size={16} />
                    <span className="">{patient.phone}</span>
                  </div>
                </div>
              </div>
              <div className="bg-secondary flex flex-1 flex-col items-center gap-1 rounded-xl p-2 lg:flex-auto">
                <SmallStatusStat
                  title="Total appointments"
                  statusText=""
                  count={patientAppointments?.length ?? 0}
                  setStatus={setStatus}
                  status={status}
                  icon_bgClass={"bg-tertiary/20"}
                  icon_textClass={"text-tertiary"}
                  icon={Calendar}
                />
                <SmallStatusStat
                  title="completed"
                  statusText="completed"
                  count={numOfRequests("completed")}
                  setStatus={setStatus}
                  status={status}
                  icon_bgClass="bg-status-completed/20"
                  icon_textClass="text-status-completed"
                  icon={CircleCheckBig}
                />
                <SmallStatusStat
                  title="rejected"
                  statusText="rejected"
                  count={numOfRequests("rejected")}
                  setStatus={setStatus}
                  status={status}
                  icon_bgClass="bg-status-rejected/20"
                  icon_textClass="text-status-rejected"
                  icon={CircleX}
                />
                <SmallStatusStat
                  title="pending"
                  statusText="pending"
                  count={numOfRequests("pending")}
                  setStatus={setStatus}
                  status={status}
                  icon_bgClass="bg-status-pending/20"
                  icon_textClass="text-status-pending"
                  icon={Clock3}
                />
              </div>
            </div>
            <div className="bg-secondary h-fit flex-1 rounded-xl p-2 shadow sm:p-4">
              <div className="border-b-border mb-3 border-b p-2 pb-3! text-xl font-black sm:p-0">
                patient appointments
              </div>
              <PatientAppointmentsList
                isLoading={isLoadingPatient}
                appointments={apps}
              />
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
