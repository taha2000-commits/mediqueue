import { HashLoader } from "react-spinners";

import { PRIMARY_COLOR } from "@/lib/constants";

const loading = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <HashLoader color={PRIMARY_COLOR} />
    </div>
  );
};

export default loading;
