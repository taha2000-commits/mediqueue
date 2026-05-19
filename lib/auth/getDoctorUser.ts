import { Doctor } from "@/types/doctors";

import { fetchData } from "../api/fetch";
import { getUser } from "./getUser";

export async function getDoctorUser() {
  const user = await getUser();

  const data = await fetchData<Doctor>({
    url: `/doctors/${user?.id}`,
    init: {
      next: { tags: ["doctor", `${user?.id}`] },
    },
  });

  return data;
}
