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
        public void Get_ReturnsEmptySet()
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
        public void Get_ReturnsAllOfficeHours()
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
        public void Get_ReturnsSingleOfficeHours()
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
        public void Get_ReturnsNoOfficeHours()
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
    }
}
