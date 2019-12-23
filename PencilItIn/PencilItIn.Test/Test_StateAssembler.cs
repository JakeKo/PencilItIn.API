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
        public void StateAssembler_CreatesSingleOfficeHours()
        {
            // Arrange
            var expectedState = new List<OfficeHours> {
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
            var actualState = StateAssembler.AssembleState(eventLog);

            // Assert
            Utilities.StatesAreEqual(expectedState, actualState);
        }

        [TestMethod]
        public void StateAssembler_CreatesMultipleOfficeHours()
        {
            // Arrange
            var expectedState = new List<OfficeHours> {
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
                },
                new OfficeHours()
                {
                    HostName = "Albus Dumbledore",
                    Title = "Headmaster Fireside Hours",
                    StartTime = new DateTime(2019, 1, 1, 16, 0, 0),
                    EndTime = new DateTime(2019, 1, 1, 21, 0, 0),
                    Location = "Great Hall",
                    Id = "1",
                    Bookings = new List<Booking>(),
                    Cancelled = false
                }
            };

            // Act
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
            eventLog.RecordEvent(EventCode.CreateOfficeHours, new CreateOfficeHoursEventPayload()
            {
                HostName = "Albus Dumbledore",
                Title = "Headmaster Fireside Hours",
                StartTime = new DateTime(2019, 1, 1, 16, 0, 0),
                EndTime = new DateTime(2019, 1, 1, 21, 0, 0),
                Location = "Great Hall",
                Id = "1"
            });
            var actualState = StateAssembler.AssembleState(eventLog);

            // Assert
            Utilities.StatesAreEqual(expectedState, actualState);
        }

        [TestMethod]
        public void StateAssembler_AddSingularBooking()
        {
            // Arrange
            var expectedState = new List<OfficeHours> {
                new OfficeHours()
                {
                    HostName = "Severus Snape",
                    Title = "DADA Office Hours",
                    StartTime = new DateTime(2019, 1, 1, 10, 0, 0),
                    EndTime = new DateTime(2019, 1, 1, 12, 0, 0),
                    Location = "HWT 204",
                    Id = "0",
                    Cancelled = false,
                    Bookings = new List<Booking>()
                    {
                        new Booking()
                        {
                            Id = "B0",
                            Name = "Hermoine Granger",
                            StartTime = new DateTime(2019, 1, 1, 10, 0, 0),
                            EndTime = new DateTime(2019, 1, 1, 11, 0, 0),
                            Cancelled = false
                        }
                    }
                }
            };

            // Act
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
            eventLog.RecordEvent(EventCode.AddBooking, new AddBookingEventPayload()
            {
                OfficeHoursId = "0",
                Id = "B0",
                Name = "Hermoine Granger",
                StartTime = new DateTime(2019, 1, 1, 10, 0, 0),
                EndTime = new DateTime(2019, 1, 1, 11, 0, 0)
            });
            var actualState = StateAssembler.AssembleState(eventLog);

            // Assert
            Utilities.StatesAreEqual(expectedState, actualState);
        }
    }
}
