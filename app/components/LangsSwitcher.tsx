"use client";
import { usePathname } from "next/navigation";

import { changeLanguage } from "@/app/actions";
import { useDirection } from "@/components/ui/direction";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const LangsSwitcher = () => {
  const pathname = usePathname();
  const dir = useDirection();
  return (
    <ToggleGroup
      variant="outline"
      type="single"
      defaultValue={dir == "ltr" ? "en" : "ar"}
      dir={"ltr"}
    >
      <ToggleGroupItem
        value="en"
        aria-label="Toggle en"
        className="uppercase"
        onClick={() => {
          changeLanguage("en", pathname);
        }}
      >
        en
      </ToggleGroupItem>
      <ToggleGroupItem
        value="ar"
        aria-label="Toggle ar"
        className="uppercase"
        onClick={() => {
          changeLanguage("ar", pathname);
        }}
      >
        ar
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default LangsSwitcher;
