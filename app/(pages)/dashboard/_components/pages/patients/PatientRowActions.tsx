"use client";
import { Eye, History } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { PatientWithAppointments } from "@/types/patients";

import { useSelectedPatientCtx } from "../../../_context/SelectedPatientCtx";
import SelectedPatient from "./SelectedPatient";

const PatientRowActions = ({
  patient,
  isCards,
}: {
  patient: PatientWithAppointments;
  isCards: boolean;
}) => {
  const { setSelectedPatient } = useSelectedPatientCtx();

  return (
    <div className="flex gap-2">
      {isCards ? (
        <>
          <Sheet>
            <SheetTrigger asChild>
              <Icon isCards={isCards} />
            </SheetTrigger>
            <SheetContent
              side="bottom"
              className="flex max-h-[90vh] items-center justify-center rounded-t-2xl p-5"
            >
              <SheetTitle></SheetTitle>
              <div className="h-full overflow-y-auto">
                <SelectedPatient patient={patient} className="ms-0" />
              </div>
            </SheetContent>
          </Sheet>
          <Link
            href={`/dashboard/history/${patient.id}`}
            className="border-border flex size-7 items-center justify-center rounded-md border"
          >
            <History size={16} />
          </Link>
        </>
      ) : (
        <>
          <Icon onClick={() => setSelectedPatient(patient)} />
          <Link
            href={`/dashboard/history/${patient.id}`}
            className="border-border flex size-9 items-center justify-center rounded-md border"
          >
            <History size={16} />
          </Link>
        </>
      )}
    </div>
  );
};

const Icon = ({
  onClick,
  isCards = false,
}: {
  onClick?: () => void;
  isCards?: boolean;
}) => (
  <Button
    variant={"outline"}
    size={"icon"}
    className={cn("size-9 rounded-lg", { "size-7 rounded-md": isCards })}
    onClick={onClick}
  >
    <Eye size={16} />
  </Button>
);
export default PatientRowActions;
