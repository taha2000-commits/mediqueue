"use client";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";

import { PatientsWithAppointments } from "@/types/patients";

interface State {
  selectedPatient?: PatientsWithAppointments;
  setSelectedPatient: Dispatch<
    SetStateAction<PatientsWithAppointments | undefined>
  >;
}
const SelectedPatientCtx = createContext<State>({
  selectedPatient: undefined,
  setSelectedPatient: () => {},
});
const SelectedPatientProvider = ({ children }: PropsWithChildren) => {
  const [selectedPatient, setSelectedPatient] =
    useState<PatientsWithAppointments>();
  return (
    <SelectedPatientCtx value={{ selectedPatient, setSelectedPatient }}>
      {children}
    </SelectedPatientCtx>
  );
};

export const useSelectedPatientCtx = () => useContext(SelectedPatientCtx);
export default SelectedPatientProvider;
