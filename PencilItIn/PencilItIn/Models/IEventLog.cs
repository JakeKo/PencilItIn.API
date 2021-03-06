﻿using System.Collections.Generic;

namespace PencilItIn.Models
{
    public interface IEventLog
    {
        public List<Event> Log { get; }
        public Event LatestEvent { get; }
        public void RecordEvent(EventCode code, IEventPayload payload);
    }
}
