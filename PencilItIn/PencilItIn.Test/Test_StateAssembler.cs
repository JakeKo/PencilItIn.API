using Microsoft.VisualStudio.TestTools.UnitTesting;
using PencilItIn.Logic;
using PencilItIn.Models;
using System;
using System.Collections.Generic;

namespace PencilItIn.Test
{
    [TestClass]
    public class Test_StateAssembler
    {
        [TestMethod]
        public void StateAssembler_CreatesOfficeHours()
        {
            // Arrange
            var eventLog = new EventLog();
            eventLog.RecordEvent(EventCode.CreateOfficeHours, new CreateOfficeHoursEventPayload() {
                HostName = "Severus Snape",
                Title = "DADA Office Hours",
                StartTime = new DateTime(2019, 1, 1, 10, 0, 0),
                EndTime = new DateTime(2019, 1, 1, 12, 0, 0),
                Location = "HWT 204",
                Id = "0"
            });
            var expectedState = new List<OfficeHours> {
                new OfficeHours()
                {
                    HostName = "Severus Snape",
                    Title = "DADA Office Hours",
                    StartTime = new DateTime(2019, 1, 1, 10, 0, 0),
                    EndTime = new DateTime(2019, 1, 1, 12, 0, 0),
                    Location = "HWT 204",
                    Id = "0",
                    Bookings = new List<Booking>()
                }
            };

            // Act
            var actualState = StateAssembler.AssembleState(eventLog);

            // Assert
            Utilities.StatesAreEqual(expectedState, actualState);
        }
    }
}
