using PencilItIn.Models;
using System.Collections.Generic;

namespace PencilItIn.Logic
{
    public class EventLog
    {
        public Stack<IEvent<IEventPayload>> Log { get; set; }

        public EventLog()
        {
            this.Log = new Stack<IEvent<IEventPayload>>();
        }

        public void RecordEvent(EventCode code, IEventPayload payload)
        {
            switch (code)
            {
                case EventCode.CreateOfficeHours:
                    this.Log.Push((IEvent<IEventPayload>)new CreateOfficeHoursEvent()
                    {
                        Payload = (CreateOfficeHoursEventPayload)payload
                    });
                    break;
                case EventCode.AddBooking:
                    this.Log.Push((IEvent<IEventPayload>)new AddBookingEvent()
                    {
                        Payload = (AddBookingEventPayload)payload
                    });
                    break;
                case EventCode.CancelOfficeHours:
                    this.Log.Push((IEvent<IEventPayload>)new CancelOfficeHoursEvent()
                    {
                        Payload = (CancelOfficeHoursEventPayload)payload
                    });
                    break;
                case EventCode.ChangeEndTime:
                    this.Log.Push((IEvent<IEventPayload>)new ChangeEndTimeEvent()
                    {
                        Payload = (ChangeEndTimeEventPayload)payload
                    });
                    break;
                case EventCode.ChangeLocation:
                    this.Log.Push((IEvent<IEventPayload>)new ChangeLocationEvent()
                    {
                        Payload = (ChangeLocationEventPayload)payload
                    });
                    break;
                case EventCode.ChangeStartTime:
                    this.Log.Push((IEvent<IEventPayload>)new ChangeStartTimeEvent()
                    {
                        Payload = (ChangeStartTimeEventPayload)payload
                    });
                    break;
                case EventCode.ConfigureOfficeHours:
                    this.Log.Push((IEvent<IEventPayload>)new ConfigureOfficeHoursEvent()
                    {
                        Payload = (ConfigureOfficeHoursEventPayload)payload
                    });
                    break;
                case EventCode.RemoveBooking:
                    this.Log.Push((IEvent<IEventPayload>)new RemoveBookingEvent()
                    {
                        Payload = (RemoveBookingEventPayload)payload
                    });
                    break;
                default:
                    break;
            }
        }
    }
}
