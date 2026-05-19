import { Fragment } from "react/jsx-runtime";

import { checkUserRole } from "@/lib/auth/checkUserRole";
import { UserRole } from "@/types/user-role";

const layout = async ({ doctor, admin }: LayoutProps<"/dashboard">) => {
  const userRole = await checkUserRole();

  return <Fragment>{userRole == UserRole.Doctor ? doctor : admin}</Fragment>;
};

export default layout;
