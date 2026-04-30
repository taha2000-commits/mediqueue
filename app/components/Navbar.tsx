import { Matemasie } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { TbCalendarCheck } from "react-icons/tb";

import { ModeToggle } from "@/app/components/ModeToggle";
import { enFont } from "@/i18n/fonts";
import { cn } from "@/lib/utils";

import Button from "./Button";
import LangsSwitcher from "./LangsSwitcher";

const Matemasie_Font = Matemasie({
  weight: "400",
});

const Navbar = () => {
  return (
    <nav
      dir="ltr"
      className={cn(
        "bg-second-background flex items-center justify-between px-10 py-3 shadow-2xl",
        enFont.className,
      )}
    >
      <Link href={"/"} className="flex items-center gap-2">
        <div className="">
          <Image
            src={"/icon-192.png"}
            alt="Logo"
            width={50}
            height={50}
            className="aspect-square h-full"
          />
        </div>
        <div className="leading-0.5">
          <h4 className={`text-2xl ${Matemasie_Font.className}`}>MediQueue</h4>
          <span className="text-foreground/50 text-xs capitalize">
            Your health our priority
          </span>
        </div>
      </Link>
      <Button>
        <TbCalendarCheck />
        <span className="">Book Appointment</span>
      </Button>
      <ModeToggle />
      <LangsSwitcher />
    </nav>
  );
};

export default Navbar;
