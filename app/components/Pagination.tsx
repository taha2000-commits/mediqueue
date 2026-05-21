"use client";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Pagination as PG,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { useHandleSearchParams } from "@/hooks/useHandleSearchParams";
import { cn } from "@/lib/utils";

interface IProps {
  prev: number | null;
  next: number | null;
  page: number;
  numOfPage: number;
}
const Pagination = ({ next, page, prev, numOfPage }: IProps) => {
  const { urlSearchParams } = useHandleSearchParams();

  if (!numOfPage) return;
  return (
    <PG className="mx-0 w-fit">
      <PaginationContent>
        <Button
          variant={"outline"}
          size={"sm"}
          disabled={!prev}
          className="rounded-lg"
          onClick={() => {
            if (prev) urlSearchParams.set("page", prev.toString());
          }}
        >
          <ChevronsLeft />
        </Button>

        {prev && (
          <PaginationItem>
            <Button
              variant={"outline"}
              size={"sm"}
              className={cn("rounded-lg")}
              onClick={() => {
                urlSearchParams.set("page", `${page - 1}`);
              }}
            >
              {page - 1}
            </Button>
          </PaginationItem>
        )}

        <PaginationItem>
          <Button
            variant={"outline"}
            size={"sm"}
            className={cn("bg-tertiary dark:bg-tertiary rounded-lg")}
          >
            {page}
          </Button>
        </PaginationItem>

        {next && (
          <PaginationItem>
            <Button
              variant={"outline"}
              size={"sm"}
              className={cn("rounded-lg")}
              onClick={() => {
                urlSearchParams.set("page", `${page + 1}`);
              }}
            >
              {page + 1}
            </Button>
          </PaginationItem>
        )}

        {numOfPage > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <Button
            variant={"outline"}
            size={"sm"}
            className="rounded-lg"
            disabled={!next}
            onClick={() => {
              if (next) urlSearchParams.set("page", next.toString());
            }}
          >
            <ChevronsRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </PG>
  );
};

export default Pagination;
