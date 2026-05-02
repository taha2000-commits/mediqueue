import { CalendarPlus } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { IoShieldCheckmarkSharp } from "react-icons/io5";

import Button from "./components/Button";

export default function Home() {
  const t = useTranslations("HomePage");
  return (
    <div className="">
      <div className="mih-h-screen grid h-screen grid-cols-2">
        <div className="flex flex-col justify-center gap-20 p-10">
          <div className="text-tertiary bg-tertiary/20 flex h-fit w-fit items-center gap-1 rounded-full px-4 py-1 text-sm capitalize">
            <IoShieldCheckmarkSharp size={16} />
            <span className="">{t("tagline")}</span>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col text-6xl font-black capitalize">
              <span className="">{t("skipWait")}</span>
              <span className="text-tertiary">{t("priorityHealth")}</span>
            </div>
            <p className="text-foreground/70 tex-sm">{t("description")}</p>
          </div>
          <div className="flex gap-5">
            <Button asLink href="/book">
              <CalendarPlus size={18} />
              <span className="">{t("bookAppointment")}</span>
            </Button>
            <Button asLink href={"/login"} variant="SECONDARY">
              {t("providerLogin")}
            </Button>
          </div>
        </div>
        <div className="relative col-span-1 row-span-1 h-full w-full overflow-hidden">
          <div className="bg-second-background absolute -inset-e-1/4 -top-1/2 aspect-square w-[120%] rounded-full shadow-2xl"></div>
          <div className="border-primary absolute -inset-e-1/3 -top-1/4 aspect-square w-[120%] overflow-hidden rounded-full border-22 shadow-2xl">
            <Image
              src={"/doctors-landing.jpg"}
              alt="doctor"
              width={5000}
              height={2000}
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
