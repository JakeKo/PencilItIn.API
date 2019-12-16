using PencilItIn.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace PencilItIn.Test
{
    public static class Utilities
    {
        public static void HostsAreEqual(Host h1, Host h2)
        {
            Assert.AreEqual(h1.Name, h2.Name, $"Expected host name ({h1.Name} does not equal actual host name {h2.Name})");
            Assert.AreEqual(h1.Title, h2.Title, $"Expected host title ({h1.Title} does not equal actual host title {h2.Title})");
            Assert.AreEqual(h1.OfficeLocation, h2.OfficeLocation, $"Expected host office location ({h1.OfficeLocation} does not equal actual host office location {h2.OfficeLocation})");
        }

        public static void BookingsAreEqual(Booking b1, Booking b2)
        {
            Assert.AreEqual(b1.StartTime, b2.StartTime, $"Expected booking start time ({b1.StartTime} does not equal actual booking start time {b2.StartTime})");
            Assert.AreEqual(b1.EndTime, b2.EndTime, $"Expected booking end time ({b1.EndTime} does not equal actual booking end time {b2.EndTime})");
            Assert.AreEqual(b1.Name, b2.Name, $"Expected booking name ({b1.Name} does not equal actual booking name {b2.Name})");
        }

        public static void OfficeHoursAreEqual(OfficeHours o1, OfficeHours o2)
        {
            Assert.AreEqual(o1.StartTime, o2.StartTime, $"Expected office hours start time ({o1.StartTime} does not equal actual office hours start time {o2.StartTime})");
            Assert.AreEqual(o1.EndTime, o2.EndTime, $"Expected office hours end time ({o1.EndTime} does not equal actual office hours end time {o2.EndTime})");
            Assert.AreEqual(o1.Location, o2.Location, $"Expected office hours location ({o1.Location} does not equal actual office hours location {o2.Location})");
            HostsAreEqual(o1.Host, o2.Host);

            for (int i = 0; i < o1.Bookings.Count; i++)
            {
                BookingsAreEqual(o1.Bookings[i], o2.Bookings[i]);
            }
        }
    }
}
