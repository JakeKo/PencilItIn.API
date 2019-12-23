using PencilItIn.Models;
using System.Collections.Generic;

namespace PencilItIn.Logic
{
    public class EventLog
    {
        public Stack<Event> Log { get; set; }

        public EventLog()
        {
            this.Log = new Stack<Event>();
        }

        public void RecordEvent(EventCode code, IEventPayload payload)
        {
            this.Log.Push(new Event() { Code = code, Payload = payload });
        }
    }
}
