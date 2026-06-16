import { cn } from "@/lib/utils";

import Pagination from "./Pagination";
import { RowsPerPage } from "./RowsPerPage";

export interface PaginationFooterProps {
  count: number;
  from: number;
  next: number | null;
  numOfPage: number;
  page: number;
  prev: number | null;
  to: number;
  className?: string;
  showRowPerPage?: boolean;
}

function PaginationFooter({
  count,
  from,
  next,
  numOfPage,
  page,
  prev,
  to,
  className = "",
  showRowPerPage = true,
}: PaginationFooterProps) {
  if (!count) return;
  return (
    <div
      className={cn("grid grid-cols-4 gap-3", className, {
        "grid-cols-6": showRowPerPage,
      })}
    >
      <p
        className={cn(
          "text-muted-foreground col-span-4 flex w-full items-center text-sm text-nowrap normal-case sm:col-span-2",
          {
            "col-span-6": showRowPerPage,
            "col-span-2!": !showRowPerPage,
          },
        )}
      >
        Showing {from} to {to} from {count}
      </p>

      <div
        className={cn(
          "col-span-3 flex items-center sm:col-span-2 sm:justify-center",
          {
            "col-span-2! justify-end!": !showRowPerPage,
          },
        )}
      >
        <Pagination next={next} page={page} prev={prev} numOfPage={numOfPage} />
      </div>

      {showRowPerPage && (
        <div
          className={cn(
            "col-span-3 flex items-center justify-end sm:col-span-2",
            // {
            //   "col-span-6": showRowPerPage,
            // },
          )}
        >
          <RowsPerPage count={count} />
        </div>
      )}
    </div>
  );
}
export default PaginationFooter;
