using System;

namespace PencilItIn.Models
{
    public class RemoveBookingEventPayload : IEventPayload
    {
        public string Name { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
    }
}
