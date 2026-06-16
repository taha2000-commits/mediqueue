"use server";
import { createClient } from "../supabase/server";

const logout = async () => {
  const db = await createClient();
  return await db.auth.signOut();
};

export default logout;
