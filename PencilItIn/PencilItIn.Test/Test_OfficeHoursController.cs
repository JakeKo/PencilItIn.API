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
            var expectedOfficeHours = new List<OfficeHours>();

            // Act
            var actualOfficeHours = controller.GetAllOfficeHours();

            // Assert
            for (int i = 0; i < expectedOfficeHours.Count; i++)
            {
                Utilities.OfficeHoursAreEqual(expectedOfficeHours[i], actualOfficeHours[i]);
            }
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
            var expectedOfficeHours = new List<OfficeHours>()
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
            var actualOfficeHours = controller.GetAllOfficeHours();

            // Assert
            for (int i = 0; i < expectedOfficeHours.Count; i++)
            {
                Utilities.OfficeHoursAreEqual(expectedOfficeHours[i], actualOfficeHours[i]);
            }
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
            var expectedOfficeHours = new OfficeHours()
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
            var actualOfficeHours = controller.GetOfficeHours("0");

            // Assert
            Utilities.OfficeHoursAreEqual(expectedOfficeHours, actualOfficeHours);
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
            var actualOfficeHours = controller.GetOfficeHours("1");

            // Assert
            Assert.IsNull(actualOfficeHours);
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
            var expectedBookings = new List<Booking>()
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
            var actualBookings = controller.GetAllBookings("0");

            // Assert
            for (int i = 0; i < expectedBookings.Count; i++)
            {
                Utilities.BookingsAreEqual(expectedBookings[i], actualBookings[i]);
            }
        }
    }
}
