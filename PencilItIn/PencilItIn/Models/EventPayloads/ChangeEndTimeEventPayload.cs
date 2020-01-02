using System;

namespace PencilItIn.Models
{
    public class ChangeEndTimeEventPayload : IEventPayload
    {
        public string OfficeHoursId { get; set; }
        public DateTime EndTime { get; set; }
    }
}
