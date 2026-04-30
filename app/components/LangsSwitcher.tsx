"use client";
import { useDirection } from "@/components/ui/direction";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { changeLanguage } from "../actions";

const LangsSwitcher = () => {
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
          changeLanguage("en");
        }}
      >
        en
      </ToggleGroupItem>
      <ToggleGroupItem
        value="ar"
        aria-label="Toggle ar"
        className="uppercase"
        onClick={() => {
          changeLanguage("ar");
        }}
      >
        ar
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default LangsSwitcher;
