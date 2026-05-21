import { format } from "date-fns";
import { Metadata } from "next";

import { appointmentsService } from "@/lib/services/appointments";

import ActionsSection from "../_components/ActionsSection";
import DoctorQueue from "../_components/DoctorQueue";

export const metadata: Metadata = {
  title: "Queue",
};

const page = async () => {
  const { results: appointments } = await appointmentsService.getAll({
    params: { date: format(new Date(), "yyyy-MM-dd") },
  });

  return (
    <div className="flex justify-center gap-6">
      <DoctorQueue appointments={appointments} />
      <ActionsSection appointments={appointments} orientation="vertical" />
    </div>
  );
};

export default page;
