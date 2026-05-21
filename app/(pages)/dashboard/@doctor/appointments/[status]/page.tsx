import AppointmentsPage from "../_components/AppointmentsPage";

const page = async (props: PageProps<"/dashboard/appointments/[status]">) => {
  return <AppointmentsPage {...props} />;
};

export default page;
