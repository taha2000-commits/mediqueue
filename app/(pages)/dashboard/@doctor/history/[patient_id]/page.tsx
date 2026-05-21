import { format } from "date-fns";
import { FileText, Phone } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";

import { Avatar } from "@/components/ui/avatar";
import { appointmentsService } from "@/lib/services/appointments";
import { patientsService } from "@/lib/services/patients";
import { Database } from "@/lib/supabase/types";
import { formatTime } from "@/lib/utils";

import Stat from "../../_components/Stat";
import RequestDetails from "../../appointments/_components/RequestDetails";
import PatientAppointments from "../_component/PatientAppointments";

type HistoryPageProps = PageProps<"/dashboard/history/[patient_id]">;

export async function generateMetadata({
  params,
}: HistoryPageProps): Promise<Metadata> {
  const { patient_id } = await params;

  const { name } = await patientsService.getPatient(patient_id);

  return {
    title: { absolute: name + " | " + "History" },
    description: `View ${name}'s medical history, appointments, reports, and patient records securely on MediQueue.`,

    keywords: [
      name ?? "",
      "Patient History",
      "Medical History",
      "Patient Records",
      "Clinic Management",
      "MediQueue",
      "Doctor Dashboard",
      "Appointment History",
      "السجل الطبي",
      "تاريخ المريض",
      "ملف المريض",
      "إدارة العيادات",
    ],
  };
}

const page = async ({ params }: HistoryPageProps) => {
  const { patient_id } = await params;

  const {
    name,
    id,
    age,
    gender,
    phone,
    blood_group,
    conditions,
    medications,
    next_appointment_date,
    next_appointment_time,
  } = await patientsService.getPatient(patient_id);

  const appointments =
    await appointmentsService.getPatientAppointments(patient_id);

  function numOfRequests(status?: Database["public"]["Enums"]["status"]) {
    if (!status) return appointments.length;
    return appointments.filter((req) => req.status == status).length;
  }
  return (
    <div className="space-y-3">
      <div className="bg-second-background flex h-fit items-center justify-between rounded-xl p-4 px-10 shadow">
        <div className="flex items-center gap-4">
          <Avatar className="h-25 w-25">
            <Image
              // src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${avatar}`}
              src={"/male-avatar.png"}
              alt="sss"
              width={100}
              height={100}
            />
          </Avatar>
          <div className="grid gap-1">
            <h2 className="text-xl font-bold">{name}</h2>
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <span className="text-status-completed">ID: {id}</span>
              <span>-</span>
              <span>{age} years</span>
              <span>-</span>
              <span>{gender}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone size={16} />
              <span className="">{phone}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-10">
          <div className="grid">
            <h6 className="text-muted-foreground">Blood group</h6>
            <span className="">{blood_group}</span>
          </div>
          <div className="grid">
            <h6 className="text-muted-foreground">conditions</h6>
            <p className="text-wrap">{conditions?.join(", ") || "_"}</p>
          </div>
          <div className="grid">
            <h6 className="text-muted-foreground">medications</h6>
            <p className="text-wrap">{medications?.join(", ") || "_"}</p>
          </div>
          {next_appointment_date && next_appointment_time && (
            <div className="grid">
              <h6 className="text-muted-foreground">next appointment</h6>
              <p className="text-sm">
                {format(next_appointment_date, "MMM dd, yyyy")}{" "}
                {formatTime(next_appointment_time, "HH:mm aa")}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <Stat
          title="total appointments"
          value={appointments.length}
          icon={FileText}
          iconClassName="text-tertiary bg-status-tertiary/20"
        />
        <Stat
          title="completed appointments"
          value={numOfRequests("completed")}
          icon={FileText}
          iconClassName="text-status-completed bg-status-completed/20"
        />
        <Stat
          title="rejected appointments"
          value={numOfRequests("rejected")}
          icon={FileText}
          iconClassName="text-status-rejected bg-status-rejected/20"
        />
        <Stat
          title="pending appointments"
          value={numOfRequests("pending")}
          icon={FileText}
          iconClassName="text-status-pending bg-status-pending/20"
        />
      </div>

      <div className="flex">
        <PatientAppointments appointments={appointments} />

        <RequestDetails />
      </div>
    </div>
  );
};

export default page;
