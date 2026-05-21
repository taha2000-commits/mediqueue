import RequestDetails from "./_components/RequestDetails";

const layout = ({ children }: LayoutProps<"/dashboard/appointments">) => {
  return (
    <div className="flex">
      <div className="bg-second-background h-fit w-full space-y-5 rounded-xl p-4 shadow">
        <div className="">
          <h2 className="text-2xl font-bold capitalize">Appointments</h2>
          <p className="text-muted-foreground">
            View all patient appointments and their current statuses.
          </p>
        </div>

        {children}
      </div>

      <RequestDetails />
    </div>
  );
};

export default layout;
