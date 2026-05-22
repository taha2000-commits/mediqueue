import { RequestsContextProvider } from "./_context/RequestsContext";

const layout = ({ children, modal }: LayoutProps<"/dashboard">) => {
  return (
    <RequestsContextProvider>
      {children}
      {modal}
    </RequestsContextProvider>
  );
};

export default layout;
