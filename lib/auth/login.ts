"use server";
import { createClient } from "../supabase/client";

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const supabase = await createClient();
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
};
