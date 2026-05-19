"use server";
import { createClient } from "../supabase/server";

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const db = await createClient();
  return await db.auth.signInWithPassword({
    email,
    password,
  });
};
