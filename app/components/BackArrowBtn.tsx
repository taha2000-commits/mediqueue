"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useDirection } from "@/components/ui/direction";

export default function BackArrowBtn() {
  const dir = useDirection();

  const router = useRouter();

  return (
    <Button
      variant="outline"
      size={"icon-lg"}
      onClick={() => {
        router.back();
      }}
    >
      {dir == "ltr" ? <ArrowLeft /> : <ArrowRight />}
    </Button>
  );
}
