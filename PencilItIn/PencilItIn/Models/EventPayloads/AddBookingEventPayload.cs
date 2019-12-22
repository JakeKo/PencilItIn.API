using System;

namespace PencilItIn.Models
{
    public class AddBookingEventPayload : IEventPayload
    {
        public string Name { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
    }
}
