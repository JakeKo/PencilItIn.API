using PencilItIn.Models;
using System.Collections.Generic;
using System.Linq;

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
            return bookings.Any(b => (booking.StartTime < b.StartTime && b.StartTime < booking.EndTime) ||
                (b.StartTime < booking.StartTime && booking.StartTime < b.EndTime));
        }

        public static OfficeHours RemoveBookingFromOfficeHours(Booking booking, OfficeHours officeHours)
        {
            return new OfficeHours(
                officeHours.StartTime,
                officeHours.EndTime,
                officeHours.Location,
                officeHours.Host,
                officeHours.Bookings
                    .Where(b => b.Name != booking.Name || b.StartTime != booking.StartTime || b.EndTime != booking.EndTime)
                    .ToList()
            );
        }
    }
}
