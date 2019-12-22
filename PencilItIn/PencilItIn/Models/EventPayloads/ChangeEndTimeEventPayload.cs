using System;

namespace PencilItIn.Models
{
    public class ChangeEndTimeEventPayload : IEventPayload
    {
        public DateTime EndTime { get; set; }
    }
}
