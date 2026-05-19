import { useQuery } from "@tanstack/react-query";

import { apiFetch } from "@/lib/api/apiFetch";
import { User } from "@/types/user";

const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const data = await apiFetch<User>({
        url: `/user`,
      });
      return data;
    },
  });
};

export default useUser;
