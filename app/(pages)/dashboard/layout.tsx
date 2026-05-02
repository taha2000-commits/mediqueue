import { checkUserRole } from "@/lib/auth/checkUserRole";
import { UserRole } from "@/types/user-role";

const layout = async ({
  doctor,
  admin,
}: LayoutProps<"/dashboard">) => {
  const userRole = await checkUserRole();

  return (
      <div className="bg-red-600">
          
      {userRole == UserRole.Doctor ? doctor : admin}
    </div>
  );
};

export default layout;
