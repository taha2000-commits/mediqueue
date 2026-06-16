import { format } from "date-fns";
import { Phone } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";

import { Avatar } from "@/components/ui/avatar";
import { appointmentsService } from "@/lib/services/appointments";
import { patientsService } from "@/lib/services/patients";
import { formatTime } from "@/lib/utils";

import RequestDetails from "../../appointments/_components/RequestDetails";
import PatientAppointments from "../_component/PatientAppointments";
import PatientHistoryStats from "../_component/PatientHistoryStats";

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
    next_appointment,
  } = await patientsService.getPatient(patient_id);

  const appointments =
    await appointmentsService.getPatientAppointments(patient_id);

  return (
    <div className="space-y-3">
      <div className="bg-secondary flex h-fit flex-wrap items-center justify-between gap-5 rounded-xl p-5 shadow md:px-10">
        <div className="flex flex-wrap items-center gap-4">
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
        <div className="flex flex-wrap items-center gap-10 gap-y-5">
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
          {next_appointment?.date && next_appointment?.time && (
            <div className="grid">
              <h6 className="text-muted-foreground">next appointment</h6>
              <p className="text-sm">
                {format(next_appointment.date, "MMM dd, yyyy")}{" "}
                {formatTime(next_appointment?.time, "HH:mm aa")}
              </p>
            </div>
          )}
        </div>
      </div>

      <PatientHistoryStats appointments={appointments} />

      <div className="flex">
        <PatientAppointments appointments={appointments} />

        <RequestDetails />
      </div>
    </div>
  );
};

export default page;
