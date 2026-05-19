import { getUser } from "./getUser";

export const checkUserRole = async () => {
  const user = await getUser();

  const userRole = user?.user_metadata.userRole;
  return userRole;
};
