import SelectedPatientProvider from "../_context/SelectedPatientCtx";

const layout = ({ children }: LayoutProps<"/dashboard/patients">) => {
  return <SelectedPatientProvider>{children}</SelectedPatientProvider>;
};

export default layout;
