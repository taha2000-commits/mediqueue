import { createClient } from "../supabase/client";

export const getUserData = async () => {
  const supabase = await createClient();
  return await supabase.auth.getUser();
};
