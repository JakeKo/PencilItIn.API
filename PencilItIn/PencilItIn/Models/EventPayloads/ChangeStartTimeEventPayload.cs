using System;

namespace PencilItIn.Models
{
    public class ChangeStartTimeEventPayload : IEventPayload
    {
        public string OfficeHoursId { get; set; }
        public DateTime StartTime { get; set; }
    }
}
