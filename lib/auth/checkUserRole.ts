import { getUserData } from "./getUserData";

export const checkUserRole = async () => {
  const {
    data: { user },
  } = await getUserData();
  const userRole = user?.user_metadata.userRole;
  return userRole;
};
