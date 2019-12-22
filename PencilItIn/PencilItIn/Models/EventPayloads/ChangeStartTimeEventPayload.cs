using System;

namespace PencilItIn.Models
{
    public class ChangeStartTimeEventPayload : IEventPayload
    {
        public DateTime StartTime { get; set; }
    }
}
