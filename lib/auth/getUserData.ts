import { createClient } from "../supabase/client";

export const getUserData = async () => {
  const db = await createClient();
  return await db.auth.getUser();
};
