using PencilItIn.Models;
using System;
using System.Collections.Generic;

namespace PencilItIn.Logic
{
    public static class StateAssembler
    {
        public static List<OfficeHours> AssembleState(EventLog eventLog)
        {
            var state = new List<OfficeHours>();

            foreach (var e in eventLog.Log)
            {
                switch (e.Code)
                {
                    case EventCode.CreateOfficeHours:
                        var createOfficeHoursEventPayload = (CreateOfficeHoursEventPayload)e.Payload;
                        state.Add(new OfficeHours()
                        {
                            Id = createOfficeHoursEventPayload.Id,
                            Title = createOfficeHoursEventPayload.Title,
                            HostName = createOfficeHoursEventPayload.HostName,
                            StartTime = createOfficeHoursEventPayload.StartTime,
                            EndTime = createOfficeHoursEventPayload.EndTime,
                            Location = createOfficeHoursEventPayload.Location,
                            Bookings = new List<Booking>(),
                            Cancelled = false
                        });
                        break;
                    case EventCode.AddBooking:
                        var addBookingEventPayload = (AddBookingEventPayload)e.Payload;
                        state.Find(o => o.Id.Equals(addBookingEventPayload.OfficeHoursId))
                            .Bookings.Add(new Booking() {
                                Id = addBookingEventPayload.Id,
                                Name = addBookingEventPayload.Name,
                                StartTime = addBookingEventPayload.StartTime,
                                EndTime = addBookingEventPayload.EndTime,
                                Cancelled = false
                            });
                        break;
                    case EventCode.CancelOfficeHours:
                        var cancelOfficeHoursEventPayload = (CancelOfficeHoursEventPayload)e.Payload;
                        state.Find(o => o.Id.Equals(cancelOfficeHoursEventPayload.OfficeHoursId))
                            .Cancelled = true;
                        break;
                    case EventCode.ChangeEndTime:
                        var changeEndTimeEventPayload = (ChangeEndTimeEventPayload)e.Payload;
                        state.Find(o => o.Id.Equals(changeEndTimeEventPayload.OfficeHoursId))
                            .EndTime = changeEndTimeEventPayload.EndTime;
                        break;
                    case EventCode.ChangeLocation:
                        var changeLocationEventPayload = (ChangeLocationEventPayload)e.Payload;
                        state.Find(o => o.Id.Equals(changeLocationEventPayload.OfficeHoursId))
                            .Location = changeLocationEventPayload.Location;
                        break;
                    case EventCode.ChangeStartTime:
                        var changeStartTimeEventPayload = (ChangeStartTimeEventPayload)e.Payload;
                        state.Find(o => o.Id.Equals(changeStartTimeEventPayload.OfficeHoursId))
                            .StartTime = changeStartTimeEventPayload.StartTime;
                        break;
                    case EventCode.ConfigureOfficeHours:
                        throw new NotImplementedException("Office hours are not configurable at this time.");
                    case EventCode.RemoveBooking:
                        var removeBookingEventPayload = (RemoveBookingEventPayload)e.Payload;
                        state.Find(o => o.Id.Equals(removeBookingEventPayload.OfficeHoursId))
                            .Bookings.Find(b => b.Id.Equals(removeBookingEventPayload.BookingId))
                            .Cancelled = true;
                        break;
                    default:
                        break;
                }
            }

            return state;
        }
    }
}
