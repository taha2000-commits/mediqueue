import Image from "next/image";
import Link from "next/link";

import { ModeToggle } from "@/app/components/ModeToggle";
import { enFont, Matemasie_Font } from "@/i18n/fonts";
import { getUser } from "@/lib/auth/getUser";
import { cn } from "@/lib/utils";

import LangsSwitcher from "./LangsSwitcher";
import LogoutBtn from "./LogoutBtn";

const Navbar = async () => {
  const user = await getUser();
  const userRole = user?.user_metadata?.userRole;

  return (
    <nav
      dir="ltr"
      className={cn(
        "bg-secondary flex flex-wrap items-center justify-between gap-x-10 gap-y-4 px-10 py-3",
        enFont.className,
      )}
    >
      <Link href={"/"} className="flex items-center gap-2">
        <div className="size-10 sm:size-auto">
          <Image
            src={"/icon-192.png"}
            alt="Logo"
            width={50}
            height={50}
            className="aspect-square h-full w-full"
          />
        </div>
        <div className="leading-0.5">
          <h4 className={`text-lg sm:text-2xl ${Matemasie_Font.className}`}>
            MediQueue
          </h4>
          <span className="text-foreground/50 text-xs text-nowrap capitalize">
            Your health our priority
          </span>
        </div>
      </Link>

      <div className="flex flex-1 items-center justify-end gap-4">
        <ModeToggle />
        {!userRole && <LangsSwitcher />}
        {!!user && <LogoutBtn />}
      </div>
    </nav>
  );
};

export default Navbar;
