using PencilItIn.Models;
using System.Collections.Generic;

namespace PencilItIn.Logic
{
    public class EventLog : IEventLog
    {
        public List<Event> Log { get; } = new List<Event>();
        public Event LatestEvent { get => this.Log.Count == 0 ? null : this.Log[^1]; }

        public void RecordEvent(EventCode code, IEventPayload payload)
        {
            this.Log.Add(new Event() { Code = code, Payload = payload });
        }
    }
}
