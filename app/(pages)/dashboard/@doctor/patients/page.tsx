import PatientsMenubar from "./_components/PatientsMenubar";
import PatientsPage from "./_components/PatientsPage";

const page = async ({ searchParams }: PageProps<"/dashboard/patients">) => {
  return (
    <div className="bg-secondary h-fit flex-1 rounded-xl p-4 shadow">
      <PatientsMenubar />

      <PatientsPage searchParams={searchParams} />
    </div>
  );
};

export default page;
