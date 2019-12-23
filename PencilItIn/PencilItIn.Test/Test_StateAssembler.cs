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
            var expectedState = new SystemState()
            {
                EventCount = 1,
                OfficeHours = new List<OfficeHours>
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
            var expectedState = new SystemState()
            {
                EventCount = 2,
                OfficeHours = new List<OfficeHours>
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
        public void StateAssembler_CreatesSingleBooking()
        {
            // Arrange
            var expectedState = new SystemState()
            {
                EventCount = 2,
                OfficeHours = new List<OfficeHours>
                {
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
            eventLog.RecordEvent(EventCode.CreateBooking, new CreateBookingEventPayload()
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

        [TestMethod]
        public void StateAssembler_CancelsOfficeHours()
        {
            // Arrange
            var expectedState = new SystemState()
            {
                EventCount = 2,
                OfficeHours = new List<OfficeHours>
                {
                    new OfficeHours()
                    {
                        HostName = "Severus Snape",
                        Title = "DADA Office Hours",
                        StartTime = new DateTime(2019, 1, 1, 10, 0, 0),
                        EndTime = new DateTime(2019, 1, 1, 12, 0, 0),
                        Location = "HWT 204",
                        Id = "0",
                        Cancelled = true,
                        Bookings = new List<Booking>()
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
            eventLog.RecordEvent(EventCode.CancelOfficeHours, new CancelOfficeHoursEventPayload()
            {
                OfficeHoursId = "0"
            });
            var actualState = StateAssembler.AssembleState(eventLog);

            // Assert
            Utilities.StatesAreEqual(expectedState, actualState);
        }

        [TestMethod]
        public void StateAssembler_CancelsSingleBooking()
        {
            // Arrange
            var expectedState = new SystemState()
            {
                EventCount = 3,
                OfficeHours = new List<OfficeHours>
                {
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
                                Cancelled = true
                            }
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
            eventLog.RecordEvent(EventCode.CreateBooking, new CreateBookingEventPayload()
            {
                OfficeHoursId = "0",
                Id = "B0",
                Name = "Hermoine Granger",
                StartTime = new DateTime(2019, 1, 1, 10, 0, 0),
                EndTime = new DateTime(2019, 1, 1, 11, 0, 0)
            });
            eventLog.RecordEvent(EventCode.CancelBooking, new CancelBookingEventPayload()
            {
                OfficeHoursId = "0",
                BookingId = "B0"
            });
            var actualState = StateAssembler.AssembleState(eventLog);

            // Assert
            Utilities.StatesAreEqual(expectedState, actualState);
        }

        [TestMethod]
        public void StateAssembler_ChangesStartTime()
        {
            // Arrange
            var expectedState = new SystemState()
            {
                EventCount = 2,
                OfficeHours = new List<OfficeHours>
                {
                    new OfficeHours()
                    {
                        HostName = "Severus Snape",
                        Title = "DADA Office Hours",
                        StartTime = new DateTime(2019, 1, 1, 9, 0, 0),
                        EndTime = new DateTime(2019, 1, 1, 12, 0, 0),
                        Location = "HWT 204",
                        Id = "0",
                        Bookings = new List<Booking>(),
                        Cancelled = false
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
            eventLog.RecordEvent(EventCode.ChangeStartTime, new ChangeStartTimeEventPayload()
            {
                OfficeHoursId = "0",
                StartTime = new DateTime(2019, 1, 1, 9, 0, 0)
            });
            var actualState = StateAssembler.AssembleState(eventLog);

            // Assert
            Utilities.StatesAreEqual(expectedState, actualState);
        }

        [TestMethod]
        public void StateAssembler_ChangesEndTime()
        {
            // Arrange
            var expectedState = new SystemState()
            {
                EventCount = 2,
                OfficeHours = new List<OfficeHours>
                {
                    new OfficeHours()
                    {
                        HostName = "Severus Snape",
                        Title = "DADA Office Hours",
                        StartTime = new DateTime(2019, 1, 1, 10, 0, 0),
                        EndTime = new DateTime(2019, 1, 1, 13, 0, 0),
                        Location = "HWT 204",
                        Id = "0",
                        Bookings = new List<Booking>(),
                        Cancelled = false
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
            eventLog.RecordEvent(EventCode.ChangeEndTime, new ChangeEndTimeEventPayload()
            {
                OfficeHoursId = "0",
                EndTime = new DateTime(2019, 1, 1, 13, 0, 0)
            });
            var actualState = StateAssembler.AssembleState(eventLog);

            // Assert
            Utilities.StatesAreEqual(expectedState, actualState);
        }

        [TestMethod]
        public void StateAssembler_ChangesLocation()
        {
            // Arrange
            var expectedState = new SystemState()
            {
                EventCount = 2,
                OfficeHours = new List<OfficeHours>
                {
                    new OfficeHours()
                    {
                        HostName = "Severus Snape",
                        Title = "DADA Office Hours",
                        StartTime = new DateTime(2019, 1, 1, 10, 0, 0),
                        EndTime = new DateTime(2019, 1, 1, 12, 0, 0),
                        Location = "Great Hall",
                        Id = "0",
                        Bookings = new List<Booking>(),
                        Cancelled = false
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
            eventLog.RecordEvent(EventCode.ChangeLocation, new ChangeLocationEventPayload()
            {
                OfficeHoursId = "0",
                Location = "Great Hall"
            });
            var actualState = StateAssembler.AssembleState(eventLog);

            // Assert
            Utilities.StatesAreEqual(expectedState, actualState);
        }
    }
}
