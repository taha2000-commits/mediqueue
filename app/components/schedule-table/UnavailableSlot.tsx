import { useTranslations } from "next-intl";

interface ComponentProps {
  colSpan: number;
}

export default function UnavailableSlot({ colSpan }: ComponentProps) {
  const t = useTranslations("BookPage");
  return (
    <div
      className="bg-muted text-muted-foreground col-span-ful flex items-center justify-center"
      style={{
        gridColumn: `span ${colSpan} / span ${colSpan}`,
      }}
    >
      {t("unavailable")}
    </div>
  );
}
