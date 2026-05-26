"use client";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";

import { PatientWithAppointments } from "@/types/patients";

interface State {
  selectedPatient?: PatientWithAppointments;
  setSelectedPatient: Dispatch<
    SetStateAction<PatientWithAppointments | undefined>
  >;
}
const SelectedPatientCtx = createContext<State>({
  selectedPatient: undefined,
  setSelectedPatient: () => {},
});
const SelectedPatientProvider = ({ children }: PropsWithChildren) => {
  const [selectedPatient, setSelectedPatient] =
    useState<PatientWithAppointments>();
  return (
    <SelectedPatientCtx value={{ selectedPatient, setSelectedPatient }}>
      {children}
    </SelectedPatientCtx>
  );
};

export const useSelectedPatientCtx = () => useContext(SelectedPatientCtx);
export default SelectedPatientProvider;
