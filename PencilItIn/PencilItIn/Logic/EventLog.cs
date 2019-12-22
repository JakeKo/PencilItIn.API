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
                default:
                    break;
            }
        }
    }
}
