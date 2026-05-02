import { getTranslations } from "next-intl/server";

import ClearSearchParamsBtn from "@/app/components/ClearSearchParamsBtn";
import DoctorCard from "@/app/components/DoctorCard";
import SearchInput from "@/app/components/SearcInput";
import SpecializationSelect from "@/app/components/SpecializationSelect";
import { headerFont } from "@/i18n/fonts";
import { fetchData } from "@/lib/api/fetch";
import { cn } from "@/lib/utils";
import { Doctor } from "@/types/doctors";

const page = async ({ searchParams }: PageProps<"/book">) => {
  const { sp: specialization, search } = await searchParams;
  const t = await getTranslations("BookPage");

  let doctors = await fetchData<Doctor[]>({
    url: `/doctors`,
    params: {
      specialization: specialization,
    },
  });

  doctors = doctors?.filter((d) =>
    d.name
      .toLocaleLowerCase()
      .includes(search?.toString().toLocaleLowerCase() || ""),
  );

  return (
    <div className="relative flex flex-col items-center">
      <div className="sticky top-0 flex h-[40vh] w-full items-center justify-center p-20">
        <h1
          className={cn(
            "font-matemasie text-5xl font-black",
            headerFont.className,
          )}
        >
          {t("chooseDoctor")}
        </h1>
      </div>
      <div className="to-background z-1 w-full bg-linear-to-b from-transparent from-0% to-15% p-20">
        <div className="mb-5 flex items-center justify-end" dir="ltr">
          <ClearSearchParamsBtn />
        </div>
        <div className="mb-10 flex items-center justify-between" dir="ltr">
          <SearchInput count={doctors?.length} />
          <SpecializationSelect />
        </div>
        <div className="grid grid-cols-3 gap-5">
          {doctors?.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
