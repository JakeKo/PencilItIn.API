using PencilItIn.Models;
using System.Collections.Generic;

namespace PencilItIn.Logic
{
    public class EventLog
    {
        public List<Event> Log { get; } = new List<Event>();

        public void RecordEvent(EventCode code, IEventPayload payload)
        {
            this.Log.Add(new Event() { Code = code, Payload = payload });
        }
    }
}
