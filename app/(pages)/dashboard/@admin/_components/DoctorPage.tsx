import { Mail, Phone } from "lucide-react";
import Image from "next/image";

import StatusBadge from "@/app/components/StatusBadge";
import { Avatar } from "@/components/ui/avatar";
import { DoctorWithStats } from "@/types/doctors";

import AppointmentsStatsPiChart from "./AppointmentsStatsPiChart";
import DoctorAppointmentsStatusStats from "./DoctorAppointmentsStatusStats";

const DoctorPage = ({
  doctor_id,
  doctor,
}: {
  doctor_id: string;
  doctor: DoctorWithStats | undefined;
}) => {
  return (
    <div className="space-y-3">
      <div className="bg-secondary flex gap-5 rounded-xl p-3 shadow">
        <Avatar className="h-40 w-40">
          <Image
            src={"/female-avatar.png"}
            alt="sss"
            width={160}
            height={160}
          />
        </Avatar>
        <div className="grid">
          <div className="flex items-center gap-5">
            <h2 className="text-2xl font-bold tracking-widest">
              {doctor?.name_en}
            </h2>
            <StatusBadge
              className="rounded-md p-2 py-3"
              status={doctor?.is_active ? "accepted" : "rejected"}
              text={doctor?.is_active ? "Active" : "Inactive"}
            />
          </div>
          <div className="h-fit w-fit rounded-lg bg-fuchsia-100 p-3 py-1 font-bold text-fuchsia-800">
            {doctor?.specialization_en}
          </div>
          <div className="flex items-center gap-2">
            <Mail size={16} />
            <span className="">{doctor?.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={16} />
            <span className="">{doctor?.phone}</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex-1 space-y-3">
          <div className="bg-secondary h-35 min-h-35 space-y-1 overflow-y-auto rounded-xl p-3 shadow">
            <h6 className="font-semibold">About</h6>
            <p className="">
              {doctor?.description_en !== "" ? doctor?.description_en : "-"}
            </p>
          </div>
          <div className="bg-secondary h-fit space-y-1 rounded-xl p-3 shadow">
            <div className="grid grid-cols-2 items-center gap-2">
              <h6 className="text-muted-foreground">clinic</h6>
              <p className="font-semibold">
                {doctor?.specialization_en
                  ? `${doctor?.specialization_en} ${doctor.specialization_ar && `(${doctor.specialization_ar})`}`
                  : "-"}
              </p>
            </div>
            <div className="grid grid-cols-2 items-center gap-2">
              <h6 className="text-muted-foreground">language</h6>
              <p className="font-semibold">{doctor?.language ?? "-"}</p>
            </div>
            <div className="grid grid-cols-2 items-center gap-2">
              <h6 className="text-muted-foreground">capacity</h6>
              <p className="font-semibold">
                {doctor?.capacity_percent
                  ? doctor?.capacity_percent.toFixed(0) + "%"
                  : "-"}
              </p>
            </div>
            <div className="grid grid-cols-2 items-center gap-2">
              <h6 className="text-muted-foreground">patients</h6>
              <p className="font-semibold">{doctor?.patients_count ?? "-"}</p>
            </div>
            <div className="grid grid-cols-2 items-center gap-2">
              <h6 className="text-muted-foreground">appointments</h6>
              <p className="font-semibold">
                {doctor?.appointments_count ?? "-"}
              </p>
            </div>
          </div>
        </div>
        <AppointmentsStatsPiChart doctor_id={doctor_id as string} />
      </div>
      <DoctorAppointmentsStatusStats doctor_id={doctor_id as string} />
    </div>
  );
};

export default DoctorPage;
