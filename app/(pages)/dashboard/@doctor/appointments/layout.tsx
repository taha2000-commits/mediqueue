import RequestDetails from "./_components/RequestDetails";

const layout = ({ children }: LayoutProps<"/dashboard/appointments">) => {
  return (
    <div className="flex">
      <div className="bg-secondary h-fit w-full space-y-5 rounded-xl p-4 shadow">
        {children}
      </div>

      <RequestDetails />
    </div>
  );
};

export default layout;
