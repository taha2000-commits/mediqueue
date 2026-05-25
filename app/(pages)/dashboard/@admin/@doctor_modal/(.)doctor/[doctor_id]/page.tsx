"use client";

import { useParams, useRouter } from "next/navigation";
import { HashLoader } from "react-spinners";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import useDoctor from "@/hooks/useDoctor";
import useDoctorPatientsStats from "@/hooks/useDoctorPatientsStats";
import useDoctorStats from "@/hooks/useDoctorStats";
import { PRIMARY_COLOR } from "@/lib/constants";

import DoctorPage from "../../../_components/DoctorPage";

const Modal = () => {
  const { doctor_id } = useParams();
  const router = useRouter();

  const { data: doctor, isLoading } = useDoctor(`${doctor_id}`);
  const { data: stats, isLoading: isLoadingStats } = useDoctorStats({
    doctor_id: `${doctor_id}`,
  });

  const { data: patientsStats, isLoading: isLoadingPatientsStats } =
    useDoctorPatientsStats({
      doctor_id: `${doctor_id}`,
    });

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) {
          router.back();
        }
      }}
    >
      <DialogContent
        className="max-h-5/6 min-w-8/12 overflow-y-auto"
        aria-describedby={undefined}
      >
        <DialogTitle></DialogTitle>
        {(isLoading || isLoadingStats || isLoadingPatientsStats) && !doctor ? (
          <div className="flex h-100 w-full items-center justify-center">
            <HashLoader color={PRIMARY_COLOR} />
          </div>
        ) : (
          <div className="mt-3">
            <DoctorPage
              doctor={doctor}
              doctor_id={doctor_id as string}
              stats={stats}
              patients_stats={patientsStats}
              stats_variant="sm"
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
