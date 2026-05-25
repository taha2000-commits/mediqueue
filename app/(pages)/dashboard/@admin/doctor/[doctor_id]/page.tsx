import { doctorsService } from "@/lib/services/doctors";

import DoctorPage from "../../_components/DoctorPage";

const page = async ({ params }: PageProps<"/dashboard/doctor/[doctor_id]">) => {
  const { doctor_id } = await params;
  const doctor = await doctorsService.getDoctor(doctor_id);

  return <DoctorPage doctor={doctor} doctor_id={doctor_id as string} />;
};

export default page;
