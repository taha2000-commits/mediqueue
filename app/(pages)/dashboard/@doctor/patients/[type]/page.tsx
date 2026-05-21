import PatientsPage from "../_components/PatientsPage";

const page = async (props: PageProps<"/dashboard/patients/[type]">) => {
  return <PatientsPage {...props} />;
};

export default page;
