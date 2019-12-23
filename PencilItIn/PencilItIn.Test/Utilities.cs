using PencilItIn.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace PencilItIn.Test
{
    public static class Utilities
    {
        public static void BookingsAreEqual(Booking b1, Booking b2)
        {
            Assert.AreEqual(b1.Id, b2.Id);
            Assert.AreEqual(b1.StartTime, b2.StartTime);
            Assert.AreEqual(b1.EndTime, b2.EndTime);
            Assert.AreEqual(b1.Name, b2.Name);
            Assert.AreEqual(b1.Cancelled, b2.Cancelled);
        }

        public static void OfficeHoursAreEqual(OfficeHours o1, OfficeHours o2)
        {
            Assert.AreEqual(o1.Id, o2.Id);
            Assert.AreEqual(o1.StartTime, o2.StartTime);
            Assert.AreEqual(o1.EndTime, o2.EndTime);
            Assert.AreEqual(o1.Location, o2.Location);
            Assert.AreEqual(o1.Cancelled, o2.Cancelled);

            for (int i = 0; i < o1.Bookings.Count; i++)
            {
                BookingsAreEqual(o1.Bookings[i], o2.Bookings[i]);
            }
        }

        public static void StatesAreEqual(SystemState s1, SystemState s2)
        {
            Assert.AreEqual(s1.EventCount, s2.EventCount);

            for (int i = 0; i < s1.OfficeHours.Count; i++)
            {
                OfficeHoursAreEqual(s1.OfficeHours[i], s2.OfficeHours[i]);
            }
        }
    }
}
