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
        public void AddBookingToOfficeHours_AddsSingleBooking()
        {
            // Arrange
            var booking = new Booking(new DateTime(2019, 1, 1, 0, 0, 0), new DateTime(2019, 1, 1, 1, 0, 0), "Hermoine Granger");
            var officeHours = new OfficeHours(
                new DateTime(2019, 1, 1, 0, 0, 0),
                new DateTime(2019, 1, 1, 23, 59, 0),
                "Hogwart's",
                Utilities.SeverusSnape,
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
        public void AddBookingToOfficeHours_AddsMultipleBookings()
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
                Utilities.SeverusSnape,
                new List<Booking>()
            );
            var expectedOfficeHours = new OfficeHours(
                new DateTime(2019, 1, 1, 0, 0, 0),
                new DateTime(2019, 1, 1, 23, 59, 0),
                "Hogwart's",
                Utilities.SeverusSnape,
                bookings
            );

            // Act
            bookings.ForEach(booking => actualOfficeHours = OfficeHoursManager.AddBookingToOfficeHours(booking, actualOfficeHours));

            // Assert
            Utilities.OfficeHoursAreEqual(expectedOfficeHours, actualOfficeHours);
        }

        [TestMethod]
        public void BookingIsWithinOfficeHours_IdentifiesBookingWithinOfficeHours()
        {
            // Arrange
            var booking = new Booking(new DateTime(2019, 1, 1, 10, 0, 0), new DateTime(2019, 1, 1, 11, 0, 0), "Hermoine Granger");
            var officeHours = new OfficeHours(
                new DateTime(2019, 1, 1, 10, 0, 0),
                new DateTime(2019, 1, 1, 12, 0, 0),
                "Hogwart's",
                Utilities.SeverusSnape,
                new List<Booking>()
            );

            // Act
            var bookingIsWithinOfficeHours = OfficeHoursManager.BookingIsWithinOfficeHours(booking, officeHours);

            // Assert
            Assert.IsTrue(bookingIsWithinOfficeHours);
        }


        [TestMethod]
        public void BookingIsWithinOfficeHours_IdentifiesBookingStartingEarlyEndingInTime()
        {
            // Arrange
            var booking = new Booking(new DateTime(2019, 1, 1, 9, 30, 0), new DateTime(2019, 1, 1, 10, 30, 0), "Hermoine Granger");
            var officeHours = new OfficeHours(
                new DateTime(2019, 1, 1, 10, 0, 0),
                new DateTime(2019, 1, 1, 12, 0, 0),
                "Hogwart's",
                Utilities.SeverusSnape,
                new List<Booking>()
            );

            // Act
            var bookingIsWithinOfficeHours = OfficeHoursManager.BookingIsWithinOfficeHours(booking, officeHours);

            // Assert
            Assert.IsFalse(bookingIsWithinOfficeHours);
        }


        [TestMethod]
        public void BookingIsWithinOfficeHours_IdentifiesBookingStartingEarlyEndingEarly()
        {
            // Arrange
            var booking = new Booking(new DateTime(2019, 1, 1, 8, 30, 0), new DateTime(2019, 1, 1, 9, 30, 0), "Hermoine Granger");
            var officeHours = new OfficeHours(
                new DateTime(2019, 1, 1, 10, 0, 0),
                new DateTime(2019, 1, 1, 12, 0, 0),
                "Hogwart's",
                Utilities.SeverusSnape,
                new List<Booking>()
            );

            // Act
            var bookingIsWithinOfficeHours = OfficeHoursManager.BookingIsWithinOfficeHours(booking, officeHours);

            // Assert
            Assert.IsFalse(bookingIsWithinOfficeHours);
        }


        [TestMethod]
        public void BookingIsWithinOfficeHours_IdentifiesBookingStartingInTimeEndingLate()
        {
            // Arrange
            var booking = new Booking(new DateTime(2019, 1, 1, 11, 30, 0), new DateTime(2019, 1, 1, 12, 30, 0), "Hermoine Granger");
            var officeHours = new OfficeHours(
                new DateTime(2019, 1, 1, 10, 0, 0),
                new DateTime(2019, 1, 1, 12, 0, 0),
                "Hogwart's",
                Utilities.SeverusSnape,
                new List<Booking>()
            );

            // Act
            var bookingIsWithinOfficeHours = OfficeHoursManager.BookingIsWithinOfficeHours(booking, officeHours);

            // Assert
            Assert.IsFalse(bookingIsWithinOfficeHours);
        }


        [TestMethod]
        public void BookingIsWithinOfficeHours_IdentifiesBookingStartingLateEndingLate()
        {
            // Arrange
            var booking = new Booking(new DateTime(2019, 1, 1, 12, 30, 0), new DateTime(2019, 1, 1, 13, 30, 0), "Hermoine Granger");
            var officeHours = new OfficeHours(
                new DateTime(2019, 1, 1, 10, 0, 0),
                new DateTime(2019, 1, 1, 12, 0, 0),
                "Hogwart's",
                Utilities.SeverusSnape,
                new List<Booking>()
            );

            // Act
            var bookingIsWithinOfficeHours = OfficeHoursManager.BookingIsWithinOfficeHours(booking, officeHours);

            // Assert
            Assert.IsFalse(bookingIsWithinOfficeHours);
        }
    }
}
