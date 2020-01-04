using PencilItIn.Models;
using System;
using System.Collections.Generic;

namespace PencilItIn.Logic
{
    public class StateAssembler : IStateAssembler
    {
        public SystemState AssembleState(IEventLog eventLog)
        {
            return this.AssembleState(eventLog, new SystemState()
            {
                EventCount = 0,
                OfficeHours = new List<OfficeHours>()
            });
        }

        public SystemState AssembleState(IEventLog eventLog, SystemState snapshot)
        {
            // TODO: Deep copy system state
            var state = new SystemState()
            {
                EventCount = eventLog.Log.Count,
                OfficeHours = new List<OfficeHours>(snapshot.OfficeHours)
            };

            for (int i = snapshot.EventCount; i < eventLog.Log.Count; i++)
            {
                var e = eventLog.Log[i];
                switch (e.Code)
                {
                    case EventCode.CreateOfficeHours:
                        var createOfficeHoursEventPayload = (CreateOfficeHoursEventPayload)e.Payload;
                        state.OfficeHours.Add(new OfficeHours()
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
                    case EventCode.CreateBooking:
                        var addBookingEventPayload = (CreateBookingEventPayload)e.Payload;
                        state.OfficeHours.Find(o => o.Id.Equals(addBookingEventPayload.OfficeHoursId))
                            .Bookings.Add(new Booking()
                            {
                                Id = addBookingEventPayload.Id,
                                Name = addBookingEventPayload.Name,
                                StartTime = addBookingEventPayload.StartTime,
                                EndTime = addBookingEventPayload.EndTime,
                                Cancelled = false
                            });
                        break;
                    case EventCode.CancelOfficeHours:
                        var cancelOfficeHoursEventPayload = (CancelOfficeHoursEventPayload)e.Payload;
                        state.OfficeHours.Find(o => o.Id.Equals(cancelOfficeHoursEventPayload.OfficeHoursId))
                            .Cancelled = true;
                        break;
                    case EventCode.ChangeEndTime:
                        var changeEndTimeEventPayload = (ChangeEndTimeEventPayload)e.Payload;
                        state.OfficeHours.Find(o => o.Id.Equals(changeEndTimeEventPayload.OfficeHoursId))
                            .EndTime = changeEndTimeEventPayload.EndTime;
                        break;
                    case EventCode.ChangeLocation:
                        var changeLocationEventPayload = (ChangeLocationEventPayload)e.Payload;
                        state.OfficeHours.Find(o => o.Id.Equals(changeLocationEventPayload.OfficeHoursId))
                            .Location = changeLocationEventPayload.Location;
                        break;
                    case EventCode.ChangeStartTime:
                        var changeStartTimeEventPayload = (ChangeStartTimeEventPayload)e.Payload;
                        state.OfficeHours.Find(o => o.Id.Equals(changeStartTimeEventPayload.OfficeHoursId))
                            .StartTime = changeStartTimeEventPayload.StartTime;
                        break;
                    case EventCode.ConfigureOfficeHours:
                        throw new NotImplementedException("Office hours are not configurable at this time.");
                    case EventCode.CancelBooking:
                        var removeBookingEventPayload = (CancelBookingEventPayload)e.Payload;
                        state.OfficeHours.Find(o => o.Id.Equals(removeBookingEventPayload.OfficeHoursId))
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
