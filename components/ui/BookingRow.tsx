"use client";

import React, { useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Mail,
  Phone,
  Building2,
  Calendar,
  Clock,
  MessageSquare,
  Trash2,
  Package as PackageIcon,
} from "lucide-react";
import {
  updateBookingStatus,
  deleteBooking,
} from "@/lib/actions/booking.action";
import { useToast } from "@/hooks/use-toast";

interface BookingRowProps {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  shippingNeed: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
  status: "new" | "contacted" | "scheduled" | "completed" | "cancelled";
  createdAt: string;
}

const STATUS_STYLES: Record<string, string> = {
  new: "bg-blue-100 text-blue-700 border-blue-200",
  contacted: "bg-yellow-100 text-yellow-700 border-yellow-200",
  scheduled: "bg-purple-100 text-purple-700 border-purple-200",
  completed: "bg-green-100 text-green-700 border-green-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
};

const BookingRow = (booking: BookingRowProps) => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const date = new Date(booking.preferredDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const createdAt = new Date(booking.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleStatusChange = (
    value: "new" | "contacted" | "scheduled" | "completed" | "cancelled"
  ) => {
    startTransition(async () => {
      const result = await updateBookingStatus({ id: booking._id, status: value });
      if (result.success) {
        toast({ title: "Status updated" });
      } else {
        toast({
          title: "Failed to update status",
          variant: "destructive",
        });
      }
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteBooking(booking._id);
      if (result.success) {
        toast({ title: "Booking deleted" });
      } else {
        toast({
          title: "Failed to delete booking",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
        <div className="flex-1 min-w-[200px]">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-lg font-bold text-dark-500">
              {booking.firstName} {booking.lastName}
            </h3>
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                STATUS_STYLES[booking.status]
              }`}
            >
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Submitted {createdAt}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Select
            defaultValue={booking.status}
            onValueChange={handleStatusChange}
            disabled={isPending}
          >
            <SelectTrigger className="h-9 min-w-[140px] text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                disabled={isPending}
                className="h-9 w-9 flex items-center justify-center rounded-md border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
                aria-label="Delete booking"
              >
                <Trash2 size={15} />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this booking?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-red-500 text-white hover:bg-red-600"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
        <a
          href={`mailto:${booking.email}`}
          className="flex items-center gap-2 text-dark-400 hover:text-primary-500 transition-colors"
        >
          <Mail size={14} className="shrink-0" />
          <span className="truncate">{booking.email}</span>
        </a>
        <a
          href={`tel:${booking.phone}`}
          className="flex items-center gap-2 text-dark-400 hover:text-primary-500 transition-colors"
        >
          <Phone size={14} className="shrink-0" />
          <span>{booking.phone}</span>
        </a>
        {booking.company && (
          <div className="flex items-center gap-2 text-dark-400">
            <Building2 size={14} className="shrink-0" />
            <span>{booking.company}</span>
          </div>
        )}
        {booking.shippingNeed && (
          <div className="flex items-center gap-2 text-dark-400">
            <PackageIcon size={14} className="shrink-0" />
            <span>{booking.shippingNeed}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-dark-400">
          <Calendar size={14} className="shrink-0 text-primary-500" />
          <span className="font-medium">{date}</span>
        </div>
        <div className="flex items-center gap-2 text-dark-400">
          <Clock size={14} className="shrink-0 text-primary-500" />
          <span className="font-medium">{booking.preferredTime}</span>
        </div>
      </div>

      {booking.message && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-start gap-2 text-sm text-dark-400">
            <MessageSquare
              size={14}
              className="shrink-0 text-slate-400 mt-0.5"
            />
            <p className="leading-relaxed whitespace-pre-wrap">
              {booking.message}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingRow;
