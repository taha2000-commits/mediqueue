import { doctorsService } from "@/lib/services/doctors";
import { statsServices } from "@/lib/services/stats";

import DoctorPage from "../../_components/DoctorPage";

const page = async ({ params }: PageProps<"/dashboard/doctor/[doctor_id]">) => {
  const { doctor_id } = await params;
  const doctor = await doctorsService.getDoctor(doctor_id);
  const stats = await statsServices.doctor.getStats(doctor_id);
  const patients_stats = await statsServices.doctor.getPatientsStats(doctor_id);

  return (
    <DoctorPage
      doctor={doctor}
      doctor_id={doctor_id as string}
      stats={stats!}
      patients_stats={patients_stats ?? undefined}
    />
  );
};

export default page;
