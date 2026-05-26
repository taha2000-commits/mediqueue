"use client";

import { Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PatientWithAppointments } from "@/types/patients";

import { useSelectedPatientCtx } from "../../../_context/SelectedPatientCtx";

const PatientRowActions = ({
  patient,
}: {
  patient: PatientWithAppointments;
}) => {
  const { setSelectedPatient } = useSelectedPatientCtx();
  return (
    <div className="flex gap-2">
      <Button
        variant={"outline"}
        size={"icon"}
        className="rounded-lg"
        onClick={() => setSelectedPatient(patient)}
      >
        <Eye size={16} />
      </Button>

      {/* <Button variant={"outline"} size={"icon"} className="rounded-lg">
        <EllipsisVertical size={16} />
      </Button> */}
    </div>
  );
};

export default PatientRowActions;
