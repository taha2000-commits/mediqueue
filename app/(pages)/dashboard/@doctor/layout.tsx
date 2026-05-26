import { RequestsContextProvider } from "./_context/RequestsContext";

const layout = ({ children }: LayoutProps<"/dashboard">) => {
  return <RequestsContextProvider>{children}</RequestsContextProvider>;
};

export default layout;
