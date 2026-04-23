import React from "react";
import { getAllBookings } from "@/lib/actions/booking.action";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import Pagination from "@/components/shared/search/Pagination";
import BookingRow from "@/components/ui/BookingRow";
import BookingStatusFilter from "@/components/shared/search/BookingStatusFilter";
import { SearchParamsProps } from "@/types";
import { CalendarCheck } from "lucide-react";

const page = async ({ searchParams }: SearchParamsProps) => {
  const resolvedParams = await searchParams;

  const result = await getAllBookings({
    searchQuery: resolvedParams.q,
    filter: resolvedParams.filter,
    page: resolvedParams.page ? +resolvedParams.page : 1,
  });

  return (
    <div className="w-full p-12 max-sm:p-6">
      <div className="flex items-center justify-between mb-2">
        <p className="h2-semibold text-primary-500">Meeting Bookings</p>
      </div>
      <p className="paragraph-regular text-dark-400 mb-8">
        Review and manage consultation requests from the booking funnel.
      </p>

      {/* Search + Filter */}
      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <LocalSearchbar
          route="/admin/bookings"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search by name, email, or company..."
          otherClasses="flex-1 min-w-[200px]"
        />
        <BookingStatusFilter route="/admin/bookings" />
      </div>

      <div className="flex gap-4 mb-6 text-sm text-slate-500">
        <span>
          {result.totalCount} booking{result.totalCount !== 1 ? "s" : ""}
        </span>
      </div>

      {result.bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <CalendarCheck size={48} className="mb-4 opacity-30" />
          <p className="text-lg font-medium">No bookings yet</p>
          <p className="text-sm mt-1">
            Submissions from the booking funnel will show up here.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {result.bookings.map((booking: any) => (
            <BookingRow key={booking._id} {...booking} />
          ))}
        </div>
      )}

      <div className="mt-10">
        <Pagination
          pageNumber={resolvedParams?.page ? +resolvedParams.page : 1}
          isNext={result.isNext}
        />
      </div>
    </div>
  );
};

export default page;
