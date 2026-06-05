import { createClient } from "../supabase/server";

const verifyDoctor = async () => {
  const db = await createClient();
  const data = await db.auth.updateUser({
    data: {
      verified: true,
    },
  });
  return data;
};

export default verifyDoctor;
