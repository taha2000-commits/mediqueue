import { RequestsContextProvider } from "./_context/RequestsContext";

const layout = ({ children, history_modal }: LayoutProps<"/dashboard">) => {
  return (
    <RequestsContextProvider>
      {children}
      {history_modal}
    </RequestsContextProvider>
  );
};

export default layout;
