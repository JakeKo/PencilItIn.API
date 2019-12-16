using PencilItIn.Models;
using System.Collections.Generic;

namespace PencilItIn.Logic
{
    public static class OfficeHoursManager
    {
        public static OfficeHours AddBookingToOfficeHours(Booking booking, OfficeHours officeHours)
        {
            return new OfficeHours(
                officeHours.StartTime,
                officeHours.EndTime,
                officeHours.Location,
                officeHours.Host,
                new List<Booking>(officeHours.Bookings) { booking }
            );
        }

        public static bool BookingIsWithinOfficeHours(Booking booking, OfficeHours officeHours)
        {
            return officeHours.StartTime <= booking.StartTime && booking.EndTime <= officeHours.EndTime;
        }

        public static bool BookingOverlapsOtherBookings(Booking booking, IEnumerable<Booking> bookings)
        {
            foreach (var presentBooking in bookings)
            {
                if ((booking.StartTime <= presentBooking.StartTime && presentBooking.StartTime <= booking.EndTime) ||
                    (presentBooking.StartTime <= booking.StartTime && booking.StartTime <= presentBooking.EndTime))
                {
                    return true;
                }
            }

            return false;
        }
    }
}
