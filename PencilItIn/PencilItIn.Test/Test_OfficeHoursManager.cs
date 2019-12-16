using Microsoft.VisualStudio.TestTools.UnitTesting;
using PencilItIn.Logic;
using PencilItIn.Models;
using System;
using System.Collections.Generic;

namespace PencilItIn.Test
{
    [TestClass]
    public class Test_OfficeHoursManager
    {
        [TestMethod]
        public void Test_AddBookingToOfficeHours_AddsSingleBooking()
        {
            // Arrange
            var booking = new Booking(new DateTime(2019, 1, 1, 0, 0, 0), new DateTime(2019, 1, 1, 1, 0, 0), "Hermoine Granger");
            var officeHours = new OfficeHours(
                new DateTime(2019, 1, 1, 0, 0, 0),
                new DateTime(2019, 1, 1, 23, 59, 0),
                "Hogwart's",
                new Host("Severus Snape", "Professor - Defense Against the Dark Arts", "Hogwart's"),
                new List<Booking>()
            );
            var expectedOfficeHours = new OfficeHours(
                new DateTime(2019, 1, 1, 0, 0, 0),
                new DateTime(2019, 1, 1, 23, 59, 0),
                "Hogwart's",
                new Host("Severus Snape", "Professor - Defense Against the Dark Arts", "Hogwart's"),
                new List<Booking>() { booking }
            );

            // Act
            var actualOfficeHours = OfficeHoursManager.AddBookingToOfficeHours(booking, officeHours);

            // Assert
            Utilities.OfficeHoursAreEqual(expectedOfficeHours, actualOfficeHours);
        }

        [TestMethod]
        public void Test_AddBookingToOfficeHours_AddsMultipleBookings()
        {
            // Arrange
            var bookings = new List<Booking> {
                new Booking(new DateTime(2019, 1, 1, 0, 0, 0), new DateTime(2019, 1, 1, 1, 0, 0), "Hermoine Granger"),
                new Booking(new DateTime(2019, 1, 1, 1, 0, 0), new DateTime(2019, 1, 1, 2, 0, 0), "Ronald Weasley"),
                new Booking(new DateTime(2019, 1, 1, 2, 0, 0), new DateTime(2019, 1, 1, 3, 0, 0), "Harry Potter"),
            };
            var actualOfficeHours = new OfficeHours(
                new DateTime(2019, 1, 1, 0, 0, 0),
                new DateTime(2019, 1, 1, 23, 59, 0),
                "Hogwart's",
                new Host("Severus Snape", "Professor - Defense Against the Dark Arts", "Hogwart's"),
                new List<Booking>()
            );
            var expectedOfficeHours = new OfficeHours(
                new DateTime(2019, 1, 1, 0, 0, 0),
                new DateTime(2019, 1, 1, 23, 59, 0),
                "Hogwart's",
                new Host("Severus Snape", "Professor - Defense Against the Dark Arts", "Hogwart's"),
                bookings
            );

            // Act
            bookings.ForEach(booking => actualOfficeHours = OfficeHoursManager.AddBookingToOfficeHours(booking, actualOfficeHours));

            // Assert
            Utilities.OfficeHoursAreEqual(expectedOfficeHours, actualOfficeHours);
        }
    }
}
