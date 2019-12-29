using Microsoft.VisualStudio.TestTools.UnitTesting;
using PencilItIn.Models;
using System;
using System.Collections.Generic;

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
            ListsAreEqual(o1.Bookings, o2.Bookings, BookingsAreEqual);
        }

        public static void StatesAreEqual(SystemState s1, SystemState s2)
        {
            Assert.AreEqual(s1.EventCount, s2.EventCount);
            ListsAreEqual(s1.OfficeHours, s2.OfficeHours, OfficeHoursAreEqual);
        }

        public static void ListsAreEqual<T>(IList<T> l1, IList<T> l2, Action<T, T> assertion)
        {
            if (l1 == null)
            {
                Assert.IsNull(l1);
                Assert.IsNull(l2);
            }
            else
            {
                Assert.IsNotNull(l1);
                Assert.IsNotNull(l2);
                Assert.AreEqual(l1.Count, l1.Count);
                for (int i = 0; i < l1.Count; i++)
                {
                    assertion(l1[i], l2[i]);
                }
            }
        }
    }
}
