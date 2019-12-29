using Microsoft.VisualStudio.TestTools.UnitTesting;
using PencilItIn.Controllers;
using PencilItIn.Logic;
using PencilItIn.Models;
using System;
using System.Collections.Generic;

namespace PencilItIn.Test
{
    [TestClass]
    public class Test_OfficeHoursController
    {
        [TestMethod]
        public void GetAllOfficeHours_ReturnsEmptySet()
        {
            // Arrange
            var controller = new OfficeHoursController(new EventLog(), new StateAssembler());
            var expected = new List<OfficeHours>();

            // Act
            var actual = controller.GetAllOfficeHours();

            // Assert
            Utilities.ListsAreEqual(expected, actual, Utilities.OfficeHoursAreEqual);
        }

        [TestMethod]
        public void GetAllOfficeHours_ReturnsAllOfficeHours()
        {
            // Arrange
            var eventLog = new EventLog();
            eventLog.RecordEvent(EventCode.CreateOfficeHours, new CreateOfficeHoursEventPayload()
            {
                HostName = "Severus Snape",
                Title = "DADA Office Hours",
                StartTime = new DateTime(2019, 1, 1, 10, 0, 0),
                EndTime = new DateTime(2019, 1, 1, 12, 0, 0),
                Location = "HWT 204",
                Id = "0"
            });
            var controller = new OfficeHoursController(eventLog, new StateAssembler());
            var expected = new List<OfficeHours>()
            {
                    new OfficeHours()
                    {
                        HostName = "Severus Snape",
                        Title = "DADA Office Hours",
                        StartTime = new DateTime(2019, 1, 1, 10, 0, 0),
                        EndTime = new DateTime(2019, 1, 1, 12, 0, 0),
                        Location = "HWT 204",
                        Id = "0",
                        Bookings = new List<Booking>(),
                        Cancelled = false
                    }
            };

            // Act
            var actual = controller.GetAllOfficeHours();

            // Assert
            Utilities.ListsAreEqual(expected, actual, Utilities.OfficeHoursAreEqual);
        }

        [TestMethod]
        public void GetOfficeHours_ReturnsSingleOfficeHours()
        {
            // Arrange
            var eventLog = new EventLog();
            eventLog.RecordEvent(EventCode.CreateOfficeHours, new CreateOfficeHoursEventPayload()
            {
                HostName = "Severus Snape",
                Title = "DADA Office Hours",
                StartTime = new DateTime(2019, 1, 1, 10, 0, 0),
                EndTime = new DateTime(2019, 1, 1, 12, 0, 0),
                Location = "HWT 204",
                Id = "0"
            });
            var controller = new OfficeHoursController(eventLog, new StateAssembler());
            var expected = new OfficeHours()
            {
                HostName = "Severus Snape",
                Title = "DADA Office Hours",
                StartTime = new DateTime(2019, 1, 1, 10, 0, 0),
                EndTime = new DateTime(2019, 1, 1, 12, 0, 0),
                Location = "HWT 204",
                Id = "0",
                Bookings = new List<Booking>(),
                Cancelled = false
            };

            // Act
            var actual = controller.GetOfficeHours("0");

            // Assert
            Utilities.OfficeHoursAreEqual(expected, actual);
        }

        [TestMethod]
        public void GetOfficeHours_ReturnsNoOfficeHours()
        {
            // Arrange
            var eventLog = new EventLog();
            eventLog.RecordEvent(EventCode.CreateOfficeHours, new CreateOfficeHoursEventPayload()
            {
                HostName = "Severus Snape",
                Title = "DADA Office Hours",
                StartTime = new DateTime(2019, 1, 1, 10, 0, 0),
                EndTime = new DateTime(2019, 1, 1, 12, 0, 0),
                Location = "HWT 204",
                Id = "0"
            });
            var controller = new OfficeHoursController(eventLog, new StateAssembler());

            // Act
            var actual = controller.GetOfficeHours("1");

            // Assert
            Assert.IsNull(actual);
        }

        [TestMethod]
        public void GetAllBookings_ReturnsAllBookings()
        {
            // Arrange
            var eventLog = new EventLog();
            eventLog.RecordEvent(EventCode.CreateOfficeHours, new CreateOfficeHoursEventPayload()
            {
                HostName = "Severus Snape",
                Title = "DADA Office Hours",
                StartTime = new DateTime(2019, 1, 1, 10, 0, 0),
                EndTime = new DateTime(2019, 1, 1, 12, 0, 0),
                Location = "HWT 204",
                Id = "0"
            });
            eventLog.RecordEvent(EventCode.CreateBooking, new CreateBookingEventPayload()
            {
                OfficeHoursId = "0",
                Id = "1",
                Name = "Hermoine Granger",
                StartTime = new DateTime(2019, 1, 1, 10, 0, 0),
                EndTime = new DateTime(2019, 1, 1, 10, 30, 0)
            });
            var controller = new OfficeHoursController(eventLog, new StateAssembler());
            var expected = new List<Booking>()
            {
                new Booking()
                {
                    Id = "1",
                    Cancelled = false,
                    Name = "Hermoine Granger",
                    StartTime = new DateTime(2019, 1, 1, 10, 0, 0),
                    EndTime = new DateTime(2019, 1, 1, 10, 30, 0),
                }
            };

            // Act
            var actual = controller.GetAllBookings("0");

            // Assert
            Utilities.ListsAreEqual(expected, actual, Utilities.BookingsAreEqual);
        }

        [TestMethod]
        public void GetAllBookings_ReturnsEmptySet()
        {
            // Arrange
            var eventLog = new EventLog();
            eventLog.RecordEvent(EventCode.CreateOfficeHours, new CreateOfficeHoursEventPayload()
            {
                HostName = "Severus Snape",
                Title = "DADA Office Hours",
                StartTime = new DateTime(2019, 1, 1, 10, 0, 0),
                EndTime = new DateTime(2019, 1, 1, 12, 0, 0),
                Location = "HWT 204",
                Id = "0"
            });
            var controller = new OfficeHoursController(eventLog, new StateAssembler());
            var expected = new List<Booking>();

            // Act
            var actual = controller.GetAllBookings("0");

            // Assert
            Utilities.ListsAreEqual(expected, actual, Utilities.BookingsAreEqual);
        }

        [TestMethod]
        public void GetBooking_ReturnsBooking()
        {
            // Arrange
            var eventLog = new EventLog();
            eventLog.RecordEvent(EventCode.CreateOfficeHours, new CreateOfficeHoursEventPayload()
            {
                HostName = "Severus Snape",
                Title = "DADA Office Hours",
                StartTime = new DateTime(2019, 1, 1, 10, 0, 0),
                EndTime = new DateTime(2019, 1, 1, 12, 0, 0),
                Location = "HWT 204",
                Id = "0"
            });
            eventLog.RecordEvent(EventCode.CreateBooking, new CreateBookingEventPayload()
            {
                OfficeHoursId = "0",
                Id = "1",
                Name = "Hermoine Granger",
                StartTime = new DateTime(2019, 1, 1, 10, 0, 0),
                EndTime = new DateTime(2019, 1, 1, 10, 30, 0)
            });
            var controller = new OfficeHoursController(eventLog, new StateAssembler());
            var expected = new Booking()
            {
                Id = "1",
                Cancelled = false,
                Name = "Hermoine Granger",
                StartTime = new DateTime(2019, 1, 1, 10, 0, 0),
                EndTime = new DateTime(2019, 1, 1, 10, 30, 0),
            };

            // Act
            var actual = controller.GetBooking("0", "1");

            // Assert
            Utilities.BookingsAreEqual(expected, actual);
        }

        [TestMethod]
        public void GetBooking_ReturnsNoBooking()
        {
            // Arrange
            var eventLog = new EventLog();
            eventLog.RecordEvent(EventCode.CreateOfficeHours, new CreateOfficeHoursEventPayload()
            {
                HostName = "Severus Snape",
                Title = "DADA Office Hours",
                StartTime = new DateTime(2019, 1, 1, 10, 0, 0),
                EndTime = new DateTime(2019, 1, 1, 12, 0, 0),
                Location = "HWT 204",
                Id = "0"
            });
            var controller = new OfficeHoursController(eventLog, new StateAssembler());

            // Act
            var actual = controller.GetBooking("0", "1");

            // Assert
            Assert.IsNull(actual);
        }

        [TestMethod]
        public void GetBooking_HandlesNoOfficeHours()
        {
            // Arrange
            var eventLog = new EventLog();
            eventLog.RecordEvent(EventCode.CreateOfficeHours, new CreateOfficeHoursEventPayload()
            {
                HostName = "Severus Snape",
                Title = "DADA Office Hours",
                StartTime = new DateTime(2019, 1, 1, 10, 0, 0),
                EndTime = new DateTime(2019, 1, 1, 12, 0, 0),
                Location = "HWT 204",
                Id = "0"
            });
            eventLog.RecordEvent(EventCode.CreateBooking, new CreateBookingEventPayload()
            {
                OfficeHoursId = "0",
                Id = "1",
                Name = "Hermoine Granger",
                StartTime = new DateTime(2019, 1, 1, 10, 0, 0),
                EndTime = new DateTime(2019, 1, 1, 10, 30, 0)
            });
            var controller = new OfficeHoursController(eventLog, new StateAssembler());

            // Act

            // Assert
            Assert.ThrowsException<NullReferenceException>(() => controller.GetBooking("1", "1"));
        }
    }
}
