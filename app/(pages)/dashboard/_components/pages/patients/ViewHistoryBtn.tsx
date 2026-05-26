import Link from "next/link";

import { Button } from "@/components/ui/button";
import { PatientWithAppointments } from "@/types/patients";

const ViewHistoryBtn = ({
  selectedPatient,
}: {
  selectedPatient: PatientWithAppointments;
}) => {
  return (
    <div className="flex justify-end pb-2">
      <Button
        asChild
        variant="outline"
        size="xs"
        className="border-status-completed bg-secondary text-status-completed rounded-sm"
      >
        <Link href={`/dashboard/history/${selectedPatient.id}`}>
          View History
        </Link>
      </Button>
    </div>
  );
};

export default ViewHistoryBtn;
