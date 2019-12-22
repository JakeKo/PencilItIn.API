using PencilItIn.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace PencilItIn.Test
{
    public static class Utilities
    {
        public static void BookingsAreEqual(Booking b1, Booking b2)
        {
            Assert.AreEqual(b1.Id, b2.Id, $"Expected booking id ({b1.Id} does not equal actual booking id {b2.Id})");
            Assert.AreEqual(b1.StartTime, b2.StartTime, $"Expected booking start time ({b1.StartTime} does not equal actual booking start time {b2.StartTime})");
            Assert.AreEqual(b1.EndTime, b2.EndTime, $"Expected booking end time ({b1.EndTime} does not equal actual booking end time {b2.EndTime})");
            Assert.AreEqual(b1.Name, b2.Name, $"Expected booking name ({b1.Name} does not equal actual booking name {b2.Name})");
        }

        public static void OfficeHoursAreEqual(OfficeHours o1, OfficeHours o2)
        {
            Assert.AreEqual(o1.Id, o2.Id, $"Expected office hours id ({o1.StartTime} does not equal actual office hours id {o2.StartTime})");
            Assert.AreEqual(o1.StartTime, o2.StartTime, $"Expected office hours start time ({o1.StartTime} does not equal actual office hours start time {o2.StartTime})");
            Assert.AreEqual(o1.EndTime, o2.EndTime, $"Expected office hours end time ({o1.EndTime} does not equal actual office hours end time {o2.EndTime})");
            Assert.AreEqual(o1.Location, o2.Location, $"Expected office hours location ({o1.Location} does not equal actual office hours location {o2.Location})");

            for (int i = 0; i < o1.Bookings.Count; i++)
            {
                BookingsAreEqual(o1.Bookings[i], o2.Bookings[i]);
            }
        }
    }
}
