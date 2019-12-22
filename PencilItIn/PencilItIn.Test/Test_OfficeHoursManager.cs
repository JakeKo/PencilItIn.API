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
        public void BookingIsWithinOfficeHours_IdentifiesBookingWithinOfficeHours()
        {
            // Arrange
            var booking = new Booking()
            {
                StartTime = new DateTime(2019, 1, 1, 10, 0, 0),
                EndTime = new DateTime(2019, 1, 1, 11, 0, 0),
                Name = "Hermoine Granger"
            };
            var officeHours = new OfficeHours()
            {
                StartTime = new DateTime(2019, 1, 1, 10, 0, 0),
                EndTime = new DateTime(2019, 1, 1, 12, 0, 0),
                Location = "Hogwart's",
                HostName = "Severus Snape",
                Bookings = new List<Booking>()
            };

            // Act
            var bookingIsWithinOfficeHours = OfficeHoursManager.BookingIsWithinOfficeHours(booking, officeHours);

            // Assert
            Assert.IsTrue(bookingIsWithinOfficeHours);
        }


        [TestMethod]
        public void BookingIsWithinOfficeHours_IdentifiesBookingStartingEarlyEndingInTime()
        {
            // Arrange
            var booking = new Booking()
            {
                StartTime = new DateTime(2019, 1, 1, 9, 30, 0),
                EndTime = new DateTime(2019, 1, 1, 10, 30, 0),
                Name = "Hermoine Granger"
            };
            var officeHours = new OfficeHours()
            {
                StartTime = new DateTime(2019, 1, 1, 10, 0, 0),
                EndTime = new DateTime(2019, 1, 1, 12, 0, 0),
                Location = "Hogwart's",
                HostName = "Severus Snape",
                Bookings = new List<Booking>()
            };

            // Act
            var bookingIsWithinOfficeHours = OfficeHoursManager.BookingIsWithinOfficeHours(booking, officeHours);

            // Assert
            Assert.IsFalse(bookingIsWithinOfficeHours);
        }


        [TestMethod]
        public void BookingIsWithinOfficeHours_IdentifiesBookingStartingEarlyEndingEarly()
        {
            // Arrange
            var booking = new Booking()
            {
                StartTime = new DateTime(2019, 1, 1, 8, 30, 0),
                EndTime = new DateTime(2019, 1, 1, 9, 30, 0),
                Name = "Hermoine Granger"
            };
            var officeHours = new OfficeHours()
            {
                StartTime = new DateTime(2019, 1, 1, 10, 0, 0),
                EndTime = new DateTime(2019, 1, 1, 12, 0, 0),
                Location = "Hogwart's",
                HostName = "Severus Snape",
                Bookings = new List<Booking>()
            };

            // Act
            var bookingIsWithinOfficeHours = OfficeHoursManager.BookingIsWithinOfficeHours(booking, officeHours);

            // Assert
            Assert.IsFalse(bookingIsWithinOfficeHours);
        }


        [TestMethod]
        public void BookingIsWithinOfficeHours_IdentifiesBookingStartingInTimeEndingLate()
        {
            // Arrange
            var booking = new Booking()
            {
                StartTime = new DateTime(2019, 1, 1, 11, 30, 0),
                EndTime = new DateTime(2019, 1, 1, 12, 30, 0),
                Name = "Hermoine Granger"
            };
            var officeHours = new OfficeHours()
            {
                StartTime = new DateTime(2019, 1, 1, 10, 0, 0),
                EndTime = new DateTime(2019, 1, 1, 12, 0, 0),
                Location = "Hogwart's",
                HostName = "Severus Snape",
                Bookings = new List<Booking>()
            };

            // Act
            var bookingIsWithinOfficeHours = OfficeHoursManager.BookingIsWithinOfficeHours(booking, officeHours);

            // Assert
            Assert.IsFalse(bookingIsWithinOfficeHours);
        }


        [TestMethod]
        public void BookingIsWithinOfficeHours_IdentifiesBookingStartingLateEndingLate()
        {
            // Arrange
            var booking = new Booking()
            {
                StartTime = new DateTime(2019, 1, 1, 12, 30, 0),
                EndTime = new DateTime(2019, 1, 1, 13, 30, 0),
                Name = "Hermoine Granger"
            };
            var officeHours = new OfficeHours()
            {
                StartTime = new DateTime(2019, 1, 1, 10, 0, 0),
                EndTime = new DateTime(2019, 1, 1, 12, 0, 0),
                Location = "Hogwart's",
                HostName = "Severus Snape",
                Bookings = new List<Booking>()
            };

            // Act
            var bookingIsWithinOfficeHours = OfficeHoursManager.BookingIsWithinOfficeHours(booking, officeHours);

            // Assert
            Assert.IsFalse(bookingIsWithinOfficeHours);
        }

        [TestMethod]
        public void BookingOverlapsOtherBookings_IdentifiesNonOverlapBooking()
        {
            // Arrange
            var booking = new Booking()
            {
                StartTime = new DateTime(2019, 1, 1, 10, 0, 0),
                EndTime = new DateTime(2019, 1, 1, 11, 0, 0),
                Name = "Hermoine Granger"
            };
            var bookings = new List<Booking>
            {
                new Booking()
                {
                    StartTime = new DateTime(2019, 1, 1, 8, 0, 0),
                    EndTime = new DateTime(2019, 1, 1, 9, 0, 0),
                    Name = "Ron Weasley"
                },
                new Booking()
                {
                    StartTime = new DateTime(2019, 1, 1, 12, 0, 0),
                    EndTime = new DateTime(2019, 1, 1, 13, 0, 0),
                    Name = "Harry Potter"
                }
            };

            // Act
            var bookingOverlapsOtherBookings = OfficeHoursManager.BookingOverlapsOtherBookings(booking, bookings);

            // Assert
            Assert.IsFalse(bookingOverlapsOtherBookings);
        }

        [TestMethod]
        public void BookingOverlapsOtherBookings_IdentifiesAdjacentStartBooking()
        {
            // Arrange
            var booking = new Booking()
            {
                StartTime = new DateTime(2019, 1, 1, 9, 0, 0),
                EndTime = new DateTime(2019, 1, 1, 10, 0, 0),
                Name = "Hermoine Granger"
            };
            var bookings = new List<Booking>
            {
                new Booking()
                {
                    StartTime = new DateTime(2019, 1, 1, 8, 0, 0),
                    EndTime = new DateTime(2019, 1, 1, 9, 0, 0),
                    Name = "Ron Weasley"
                },
                new Booking()
                {
                    StartTime = new DateTime(2019, 1, 1, 12, 0, 0),
                    EndTime = new DateTime(2019, 1, 1, 13, 0, 0),
                    Name = "Harry Potter"
                }
            };

            // Act
            var bookingOverlapsOtherBookings = OfficeHoursManager.BookingOverlapsOtherBookings(booking, bookings);

            // Assert
            Assert.IsFalse(bookingOverlapsOtherBookings);
        }

        [TestMethod]
        public void BookingOverlapsOtherBookings_IdentifiesAdjacentEndBooking()
        {
            // Arrange
            var booking = new Booking()
            {
                StartTime = new DateTime(2019, 1, 1, 11, 0, 0),
                EndTime = new DateTime(2019, 1, 1, 12, 0, 0),
                Name = "Hermoine Granger"
            };
            var bookings = new List<Booking>
            {
                new Booking()
                {
                    StartTime = new DateTime(2019, 1, 1, 8, 0, 0),
                    EndTime = new DateTime(2019, 1, 1, 9, 0, 0),
                    Name = "Ron Weasley"
                },
                new Booking()
                {
                    StartTime = new DateTime(2019, 1, 1, 12, 0, 0),
                    EndTime = new DateTime(2019, 1, 1, 13, 0, 0),
                    Name = "Harry Potter"
                }
            };

            // Act
            var bookingOverlapsOtherBookings = OfficeHoursManager.BookingOverlapsOtherBookings(booking, bookings);

            // Assert
            Assert.IsFalse(bookingOverlapsOtherBookings);
        }

        [TestMethod]
        public void BookingOverlapsOtherBookings_IdentifiesOverlappingStartBooking()
        {
            // Arrange
            var booking = new Booking()
            {
                StartTime = new DateTime(2019, 1, 1, 8, 30, 0),
                EndTime = new DateTime(2019, 1, 1, 9, 30, 0),
                Name = "Hermoine Granger"
            };
            var bookings = new List<Booking>
            {
                new Booking()
                {
                    StartTime = new DateTime(2019, 1, 1, 8, 0, 0),
                    EndTime = new DateTime(2019, 1, 1, 9, 0, 0),
                    Name = "Ron Weasley"
                },
                new Booking()
                {
                    StartTime = new DateTime(2019, 1, 1, 12, 0, 0),
                    EndTime = new DateTime(2019, 1, 1, 13, 0, 0),
                    Name = "Harry Potter"
                }
            };

            // Act
            var bookingOverlapsOtherBookings = OfficeHoursManager.BookingOverlapsOtherBookings(booking, bookings);

            // Assert
            Assert.IsTrue(bookingOverlapsOtherBookings);
        }

        [TestMethod]
        public void BookingOverlapsOtherBookings_IdentifiesOverlappingEndBooking()
        {
            // Arrange
            var booking = new Booking()
            {
                StartTime = new DateTime(2019, 1, 1, 11, 30, 0),
                EndTime = new DateTime(2019, 1, 1, 12, 30, 0),
                Name = "Hermoine Granger"
            };
            var bookings = new List<Booking>
            {
                new Booking()
                {
                    StartTime = new DateTime(2019, 1, 1, 8, 0, 0),
                    EndTime = new DateTime(2019, 1, 1, 9, 0, 0),
                    Name = "Ron Weasley"
                },
                new Booking()
                {
                    StartTime = new DateTime(2019, 1, 1, 12, 0, 0),
                    EndTime = new DateTime(2019, 1, 1, 13, 0, 0),
                    Name = "Harry Potter"
                }
            };

            // Act
            var bookingOverlapsOtherBookings = OfficeHoursManager.BookingOverlapsOtherBookings(booking, bookings);

            // Assert
            Assert.IsTrue(bookingOverlapsOtherBookings);
        }

        [TestMethod]
        public void BookingOverlapsOtherBookings_IdentifiesOverlappingBooking()
        {
            // Arrange
            var booking = new Booking()
            {
                StartTime = new DateTime(2019, 1, 1, 8, 15, 0),
                EndTime = new DateTime(2019, 1, 1, 8, 45, 0),
                Name = "Hermoine Granger"
            };
            var bookings = new List<Booking>
            {
                new Booking()
                {
                    StartTime = new DateTime(2019, 1, 1, 8, 0, 0),
                    EndTime = new DateTime(2019, 1, 1, 9, 0, 0),
                    Name = "Ron Weasley"
                },
                new Booking()
                {
                    StartTime = new DateTime(2019, 1, 1, 12, 0, 0),
                    EndTime = new DateTime(2019, 1, 1, 13, 0, 0),
                    Name = "Harry Potter"
                }
            };

            // Act
            var bookingOverlapsOtherBookings = OfficeHoursManager.BookingOverlapsOtherBookings(booking, bookings);

            // Assert
            Assert.IsTrue(bookingOverlapsOtherBookings);
        }

        [TestMethod]
        public void CreateBookingValidator_RejectsTooShortBooking()
        {
            // Arrange
            var validator = OfficeHoursManager.CreateBookingValidator(15, 60, true);
            var booking = new Booking()
            {
                StartTime = new DateTime(2019, 1, 1, 10, 0, 0),
                EndTime = new DateTime(2019, 1, 1, 10, 10, 0),
                Name = "Hermoine Granger"
            };
            var officeHours = new OfficeHours()
            {
                StartTime = new DateTime(2019, 1, 1, 10, 0, 0),
                EndTime = new DateTime(2019, 1, 1, 12, 0, 0),
                Location = "Hogwart's",
                HostName = "Severus Snape",
                Bookings = new List<Booking>()
            };

            // Act
            var bookingIsValid = validator(booking, officeHours);

            // Assert
            Assert.IsFalse(bookingIsValid);
        }

        [TestMethod]
        public void CreateBookingValidator_RejectsTooLongBooking()
        {
            // Arrange
            var validator = OfficeHoursManager.CreateBookingValidator(15, 60, true);
            var booking = new Booking()
            {
                StartTime = new DateTime(2019, 1, 1, 10, 0, 0),
                EndTime = new DateTime(2019, 1, 1, 11, 10, 0),
                Name = "Hermoine Granger"
            };
            var officeHours = new OfficeHours()
            {
                StartTime = new DateTime(2019, 1, 1, 10, 0, 0),
                EndTime = new DateTime(2019, 1, 1, 12, 0, 0),
                Location = "Hogwart's",
                HostName = "Severus Snape",
                Bookings = new List<Booking>()
            };

            // Act
            var bookingIsValid = validator(booking, officeHours);

            // Assert
            Assert.IsFalse(bookingIsValid);
        }

        [TestMethod]
        public void CreateBookingValidator_AcceptsJustLongEnoughBooking()
        {
            // Arrange
            var validator = OfficeHoursManager.CreateBookingValidator(15, 60, true);
            var booking = new Booking()
            {
                StartTime = new DateTime(2019, 1, 1, 10, 0, 0),
                EndTime = new DateTime(2019, 1, 1, 10, 15, 0),
                Name = "Hermoine Granger"
            };
            var officeHours = new OfficeHours()
            {
                StartTime = new DateTime(2019, 1, 1, 10, 0, 0),
                EndTime = new DateTime(2019, 1, 1, 12, 0, 0),
                Location = "Hogwart's",
                HostName = "Severus Snape",
                Bookings = new List<Booking>()
            };

            // Act
            var bookingIsValid = validator(booking, officeHours);

            // Assert
            Assert.IsTrue(bookingIsValid);
        }

        [TestMethod]
        public void CreateBookingValidator_AcceptsJustShortEnoughBooking()
        {
            // Arrange
            var validator = OfficeHoursManager.CreateBookingValidator(15, 60, true);
            var booking = new Booking()
            {
                StartTime = new DateTime(2019, 1, 1, 10, 0, 0),
                EndTime = new DateTime(2019, 1, 1, 11, 0, 0),
                Name = "Hermoine Granger"
            };
            var officeHours = new OfficeHours()
            {
                StartTime = new DateTime(2019, 1, 1, 10, 0, 0),
                EndTime = new DateTime(2019, 1, 1, 12, 0, 0),
                Location = "Hogwart's",
                HostName = "Severus Snape",
                Bookings = new List<Booking>()
            };

            // Act
            var bookingIsValid = validator(booking, officeHours);

            // Assert
            Assert.IsTrue(bookingIsValid);
        }

        [TestMethod]
        public void CreateBookingValidator_AcceptsProperLengthBooking()
        {
            // Arrange
            var validator = OfficeHoursManager.CreateBookingValidator(15, 60, true);
            var booking = new Booking()
            {
                StartTime = new DateTime(2019, 1, 1, 10, 0, 0),
                EndTime = new DateTime(2019, 1, 1, 10, 30, 0),
                Name = "Hermoine Granger"
            };
            var officeHours = new OfficeHours()
            {
                StartTime = new DateTime(2019, 1, 1, 10, 0, 0),
                EndTime = new DateTime(2019, 1, 1, 12, 0, 0),
                Location = "Hogwart's",
                HostName = "Severus Snape",
                Bookings = new List<Booking>()
            };

            // Act
            var bookingIsValid = validator(booking, officeHours);

            // Assert
            Assert.IsTrue(bookingIsValid);
        }

        [TestMethod]
        public void CreateBookingValidator_RejectsDoubleBooking()
        {
            // Arrange
            var validator = OfficeHoursManager.CreateBookingValidator(15, 60, false);
            var booking = new Booking()
            {
                StartTime = new DateTime(2019, 1, 1, 10, 0, 0),
                EndTime = new DateTime(2019, 1, 1, 10, 30, 0),
                Name = "Hermoine Granger"
            };
            var officeHours = new OfficeHours()
            {
                StartTime = new DateTime(2019, 1, 1, 10, 0, 0),
                EndTime = new DateTime(2019, 1, 1, 12, 0, 0),
                Location = "Hogwart's",
                HostName = "Severus Snape",
                Bookings = new List<Booking>() {
                    new Booking()
                    {
                        StartTime = new DateTime(2019, 1, 1, 11, 0, 0),
                        EndTime = new DateTime(2019, 1, 1, 12, 0, 0),
                        Name = "Hermoine Granger"
                    }
                }
            };

            // Act
            var bookingIsValid = validator(booking, officeHours);

            // Assert
            Assert.IsFalse(bookingIsValid);
        }
    }
}
